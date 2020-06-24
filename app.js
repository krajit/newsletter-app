var express = require('express')
var bodyParser = require('body-parser')
const request = require("request")
const https = require("https")

const port = 3000
var app = express()

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})


app.post('/', function (req, res) {
    const fName = req.body.fName
    const lName = req.body.lName
    const email = req.body.email
    const password = req.body.passwd


    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/20d5a5f63c"

    const options = {
        method: "POST",
        auth: "krajit:d7c4e8eaa7fe4974a6c48a525566070c-us10"

    }

    // const request = https.request(url, options, function (response) {
    //     response.on("data", function (data) {
    //         console.log(JSON.parse(data));
    //     })

    // })

    request.write(jsonData)
    request.end();

})

app.listen(port, () => {
    console.log("Newsletter-Signup app is listening at http://localhost:" + port)
})

// Mailchimp api key
// d7c4e8eaa7fe4974a6c48a525566070c-us10

// Mailchimp list id
// 20d5a5f63c