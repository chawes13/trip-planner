var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');
    
//Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//======================
//       ROUTES
//======================

//HOME -- tile view of various options for the trip (mobile only)
app.get("/", function(req, res){
    res.render("index");
});

//INDEX -- show a list summary of the expenses created (abbrev. desc, amount, created by)
//Option to add new expense
app.get("/expenses", function(req, res){
    
});

//NEW -- create a new expense and assign it to individuals
app.get("/expenses/new", function(req, res){
    
});

//CREATE -- post route, redirect to /expenses
app.post("/expenses", function(req, res){
    
});

//SHOW -- review the read only version of the expense (DO LAST)
app.get("/expenses/:id", function(req, res){
    
});

//Summary, unique to the individual
//calculates who owes who what
app.get("/expenses/summary", function(req, res){
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Keep calm and deploy TripPlanner++ on");
});