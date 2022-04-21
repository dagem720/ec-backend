const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // token: { type: String },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject();
    return _.pick(userObject, ['firstName', 'lastName', 'email', 'userName', '_id'])

}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
});
userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = { User }