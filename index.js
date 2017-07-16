var express         = require('express'),
    app             = express(),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    User            = require('./models/user'),
    Expense         = require('./models/expense'),
    Trip            = require('./models/trip'),
    seedDB          = require('./seeds');
    
//Mongo configuration
var url = process.env.DATABASEURL || "mongodb://localhost/trip-planner";
mongoose.connect(url, {useMongoClient: true});
mongoose.promise = global.promise;

//Express configurations
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//For testing purposes only
seedDB();

//Passport configuration
app.use(require('express-session')({
    secret: "This is my first hackathon",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware to have easy access to user
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//======================
//       ROUTES
//======================

//HOME -- tile view of various options for the trip (mobile only)
app.get("/", function(req, res){
    if(req.isAuthenticated()){
        Trip.find({traveller_ids: req.user._id}, function(err, trips){
           if(err){
                console.log(err);
           } else {
                res.render("trips/index", {trips: trips});                
           }
        });
    } else {
        res.redirect("/login");
    }
});

app.get("/login", function(req, res){
    res.render("auth/login");
});

//authenticate
app.post("/login", passport.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/"
}));

//INDEX -- show a list summary of the expenses created (abbrev. desc, amount, created by)
//Option to add new expense
app.get("/trips/:id/expenses", function(req, res){
    Expense.find({trip_id: req.params.id}, function(err, foundExpenses){
        if(err){
            console.log(err);
            res.redirect("/trips/"+req.params.id);
        } else {
           res.render("expenses/index", {expenses: foundExpenses, trip_id: req.params.id});
        }
    });
});

//NEW -- create a new expense and assign it to individuals
//TODO: maintain trip info across requests?
app.get("/trips/:id/expenses/new", function(req, res){
    Trip.findById(req.params.id, function(err, foundTrip){
       if(err){
           console.log(err);
       } else if(foundTrip) {
           User.find({_id: {$in: foundTrip.traveller_ids}}, function(err, foundUsers){
               if(err){
                   console.log(err);
                   res.redirect("/");
               } else {
                   res.render("expenses/new", {trip: foundTrip, users: foundUsers});
               }
           });
       } else {
           res.redirect("/");
       }
    });
});

//CREATE -- post route, redirect to /expenses
app.post("/trips/:id/expenses", function(req, res){
    var expense = req.body.expense;
    expense.currency = "GBP"; //will come in dynamically later! (not MVP)
    expense.trip_id = req.params.id; //should probably come from form?
    Expense.create(expense, function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/trips/"+req.params.id+"/expenses");
    });
});

//SHOW -- review the read only version of the expense (DO LAST)
app.get("/trips/:id/expenses/:id", function(req, res){
    
});

//Summary, unique to the individual
//calculates who owes who what
app.get("/trips/:id/expenses/summary", function(req, res){
    
});

//Show specific trip with options (Travel Itinerary, Schedule, Expenses)
app.get("/trips/:id", function(req, res){
    Trip.findById(req.params.id, function(err, foundTrip){
       if(err){
           console.log(err);
       } else if(foundTrip) {
           res.render("trips/show", {trip: foundTrip});
       } else {
           res.redirect("/");
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Keep calm and deploy TripPlanner++ on");
});