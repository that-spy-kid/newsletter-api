const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const https = require("https");
const { options } = require("request");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res) =>{
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;
   const data = {
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
    };
    const jsonData = JSON.stringify(data); 

    const url = "https://us8.api.mailchimp.com/3.0/lists/98cbeca1a5";
     
    const options = {
        method : "POST",
        auth: "that_spy_kid:c105a979048c09b88834947af694f7c3-us8"
    }
   const request =  https.request(url, options, (response)=>{
       if(response.statusCode === 200){
           res.sendFile(__dirname+"/success.html");
       }
       else{
           res.sendFile(__dirname + "/failure.html");
       }
         response.on("data", (data)=>{
             console.log(JSON.parse(data));
         })
    })
   // request.write(jsonData);
    request.end();

});

app.post("/failure", (req,res)=>{
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});

// API KEY c105a979048c09b888349~47af694f7c3-us8
//98cbeca1a5


