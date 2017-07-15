var mongoose = require('mongoose');
var moment = require('moment');

var tripSchema = new mongoose.Schema({
    name: String,
    start: Date,
    end: Date,
    destinations: [{type: String}],
    traveller_ids: [
        {type: mongoose.Schema.Types.ObjectId}
    ]
});

tripSchema.virtual('tripDates').get(function(){
  return moment(this.start).format('DD.MM.YY') +' to ' + moment(this.end).format('DD.MM.YY');  
});

module.exports = mongoose.model("Trip", tripSchema);