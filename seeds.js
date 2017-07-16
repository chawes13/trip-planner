var User            = require('./models/user'),
    Expense         = require('./models/expense'),
    Trip            = require('./models/trip'),
    passport        = require('passport'),
    mongoose        = require('mongoose');
    
var user = {
    username: "aspitz",
    password: "test",
    name: "Andrew",
    surname: "Spitz"
};    

var u1_id = mongoose.Types.ObjectId("596a52f4a5751523051e4a20");
var u2_id = mongoose.Types.ObjectId("596a52defb768e22ecfd52b0");
var u3_id = mongoose.Types.ObjectId("596a4b61862ea61ddaf47a8e");

var trips = [
  {name: "Copenhagen", start: new Date(2017, 6, 27), end: new Date(2017, 6, 30), destinations:["Copenhagen"], traveller_ids: [u1_id, u2_id, u3_id]},
  {name: "Krakow", start: new Date(2017, 7, 28), end: new Date(2017, 7, 30), destinations:["Copenhagen"], traveller_ids: [u1_id, u2_id, u3_id]},
  {name: "Lisbon", start: new Date(2017, 8, 10), end: new Date(2017, 8, 12), destinations:["Copenhagen"], traveller_ids: [u1_id, u2_id, u3_id]}
];

function seedDB(){
    //createUser();
    createTrips();
}

function createUser(){
    User.register(new User({username: user.username, name: user.name, surname: user.surname}), user.password, function(err, newUser){
        if(err){
            console.log(err);
        } else {
            console.log("Successfully created user: " + user.username);
        }
    });
}

function createTrips(){
    Trip.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            trips.forEach(function(trip){
                Trip.create(trip, function(err, newTrip){
                   if(err){
                       console.log(err);
                   } else {
                       console.log("Successfully created trip: " + newTrip._id);
                   }
                });
            });
        }
    });
}

module.exports = seedDB;