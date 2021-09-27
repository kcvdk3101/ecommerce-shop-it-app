const mongoose = require('mongoose');
require('dotenv').config({ path: 'backend/config/config.env' })


const connectDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
  })
}

module.exports = connectDatabase