const express = require('express')
const app = express()
let bodyParser = require("body-parser")

let urlencoderParser = bodyParser.urlencoded({extended: false})

app.use(express.static('public'))

app.get('/examples.html', (req, res) => {
    res.sendFile( __dirname + " " + "examples.html")
})

app.post('/process_post', urlencoderParser, (req, res) => {
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
})
let server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})
