const { User } = require('../model/user-model')
const jwt = require('jsonwebtoken')
exports.Register = (async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    })
    const userexist = await User.findOne({ userName: newUser.userName })
    if (userexist) {
        return res.status(401).send(`User with username ${newUser.userName} already exist`)
    }
    const user = await newUser.save()
    const token = await jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    res.status(200).send({ token, user })

})

exports.Login = (async (req, res) => {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })
    
        if (!user) {
            return res.status(401).send('User Not Found')
        }
        if (user && await user.matchPassword(password)) {
            const token = await jwt.sign(
                { user_id: user._id },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            res.status(200).send({ token, user })
        }
        else {
            // throw new Error("username or password incorrect")
            res.status(400).send('username or password incorrect')
        }
    
    
})
exports.Users = (async (req, res) => {
    const users = await User.find({})
    if (!users) {
        return res.status(401).send('bad request')
    }
    res.status(200).send(users)
})

exports.LoginbyToken = (async (req, res) => {
    const token = req.headers["access-token"]

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY,);
        const user = await User.findById(decoded.user_id)
        if(!user)
        {
            return res.status(401).send("user Not Found")
        }       
        res.status(200).send(user)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
})