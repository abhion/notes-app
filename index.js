const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express() 
const port = 3035

app.use(express.json())
app.use('/', router)
// db configuration 
setupDB() 

app.use(function(req, res, next){
    res.status(404).json({
        "notice": "url not found"
    })
})

app.listen(port, () => {
    console.log('listening on port', port)
})