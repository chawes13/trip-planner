var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
    name: String,
    start: Date,
    end: Date,
    destinations: [{type: String}],
    traveller_ids: [
        {type: mongoose.Schema.Types.ObjectId}
    ]
});

module.exports = mongoose.model("Trip", tripSchema);