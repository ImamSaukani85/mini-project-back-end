const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()

let whitelist = ['http://localhost:8080']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

const db = require('./models')
const seed = require('./models/seeds')
db.sequelize
  // .sync({force: true})
  .sync()
  .then(() => {
    // seed.userSeed()
      console.log(`database connected successfully`)
  })
  .catch((err) => {
    console.error(`database connection failed`, err.message)
  })


app.get('/', (req, res) => {
  res.json({
    message: 'server is running on'
  })
})

require('./routes/authroutes')(app)
require('./routes/profileroute')(app)
require('./routes/productroute')(app)

const PORT = process.env.APP_PORT || 4700
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})