var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');
    
//Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//===========
//  ROUTES
//===========

app.get("/", function(req, res){
    res.send("Hello World");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Keep calm and deploy TripPlanner++ on");
});