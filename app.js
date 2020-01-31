const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.APP_PORT || 8000
const app = express()
const cors = require('cors')
const routes = require('./server/routes/index.routes')

app.use(cors())
app.use(express.json())
app.use('/api/v2.0/', routes)

app.listen(port, () => console.log(`Server is running on port ${port}`))
