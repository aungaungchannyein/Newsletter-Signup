const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const mailchimp = require("@mailchimp/mailchimp_marketing");


const apiKey1 ="a6437577b38e139eb47c63329783e06b-us14"
const audienceID ="fb99d57f91"

mailchimp.setConfig({
  apiKey: apiKey1,
  server: "us14",
});

const app= express();

// for cssfile imagesfile
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
	res.sendFile(__dirname+"/signup.html")

})

app.post("/", function(req,res){
	console.log(req.statusCode)


	var first = req.body.first
	var last = req.body.last
	var mail =req.body.email

// 	async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// 	}

// run();

	const listId = audienceID;
	const subscribingUser = {
  		firstName: first,
  		lastName: last,
  		email: mail
		};

	async function run() {
  		const response = await mailchimp.lists.addListMember(listId, {
    			email_address: subscribingUser.email,
   				status: "subscribed",
    			merge_fields: {
      				FNAME: subscribingUser.firstName,
      				LNAME: subscribingUser.lastName
    			}
  	});

  			if(response){
						res.sendFile(__dirname+"/success.html")
				}
				else{
						res.sendFile(__dirname+"/failure.html")
				}
	}

	run();

		} )

app.post("/failure", function(req,res){
	res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
	console.log("Server is running on port 3000");
})