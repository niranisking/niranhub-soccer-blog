const express = require('express')

const bodyParser = require('body-parser')

const request = require("request")

const https = require('node:https')

const PORT = "5800"



app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.post("/", function(req, res ){


    const firstName = req.body.firstname

    const lastName = req.body.lastname

    const email = req.body.email

    var data = {

        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]

    }

    const jsonData = JSON.stringify(data)

 
    const url = "https://us12.api.mailchimp.com/3.0/lists/9556c99682"

    const options = {
        method: "POST",
        auth: "niranblogspot:ca7bf7695f9e0669954357392cecd273-us12"
    }


    const request = https.request(url, options, function(response){
        response.on("data", function(data){

            if (response.statusCode === 200) {

                res.sendFile(__dirname + "/success.html")
            }

            else if (response.statusCode !==200 ) {

                res.sendFile(__dirname + "/failure.html")
            }
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})



app.post("/failure", function(req, res){
    res.redirect("/")
})



app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html")

})


app.listen(PORT, function(){
    console.log("app started on port 5800...")
})