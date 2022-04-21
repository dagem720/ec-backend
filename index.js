const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./DB/mongoose')
const userRoutes = require('./routes/user-route')
app.use(bodyParser.json())
app.use(cors())

app.use(userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})