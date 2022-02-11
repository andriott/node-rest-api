const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

/**
 * Configs
 */

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).send({})
        }
        next()
})

/**
 * Rotas
 */

const usersRoutes = require('./routes/users')

app.use('/users', usersRoutes)

/**
 * Tratamento de erros
 */

app.use((req, res, next) => {
    const myError = new Error("Not found.")
    myError.status = 404
    next(myError)
})

app.use((myError, req, res, next) => {
    res.status(myError.status || 500)
    return res.send({
        error : true,
        message : myError.message
    })
})

module.exports = app