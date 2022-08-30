const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/api", (req, res) => {

    res.json({
        estado: true,
        mensaje: 'Ya funciona!!'
    })
})

app.post("/api/auth", (req, res) => {

    const usuario = {
        user: "demo",
        password: "omed"
    }

    jwt.sign({usuario: usuario}, 'secretKey',(err, token)=>{
        res.json({
            token: token
        })
    })
})

app.post("/api/post", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if(error){
            res.sendStatus(403)
        }else{
            res.json({
                mensaje: "Post fue creado",
                authData: authData
            })
        }
    })
})

//Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader.split(" ")[1]
       req.token = bearerToken
       next()
    }else{
        res.sendStatus(403)
    }
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})