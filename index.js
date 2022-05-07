const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())


app.get('/user', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log('listening to port', port)
})