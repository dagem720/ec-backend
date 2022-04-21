const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.mongodb, {
  
}).then(() => {
    console.log("Db connected")
})
