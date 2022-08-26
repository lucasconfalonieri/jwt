const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Ya funciona!!'
    })
})
app.post('/api/auth', (req, res) => {
    console.log(req.body)
    res.json({
        estado: true,
        mensaje: 'Ya funciona!!',
    })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
