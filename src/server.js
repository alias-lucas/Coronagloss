require("dotenv-safe").config()
var jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const app = express()

require('./database')

const routes = require('./routes')

app.use(cors())

app.use(express.json())
app.use('/admin', express.static('admin'))
app.use(express.static('public'))
app.use(routes)
app.listen(process.env.PORT || 3333)