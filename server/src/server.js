const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.get('/', (req, res) => {
  return res.json('up')
})

app.listen(3333, () => console.log('Server is running'))
