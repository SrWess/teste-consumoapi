const cors = require('cors')
const express = require('express')
const app = express()
const axios = require('axios')

app.use(cors())

app.get('/', async (req, res) => {
  const { data } = await axios("https://www.honda.com.br/automoveis/sites/hab/files/pps_estados.json")

  return res.json(data)
})

app.listen(3000, () => {
  console.log('Server ON');
})