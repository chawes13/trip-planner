var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
    trip_id: mongoose.Schema.Types.ObjectId,
    description: String,
    txnDate: {
        type: Date,
        default: Date.now()},
    txnAmount: Number,
    currency: String,
    traveller_ids: [
        {type: mongoose.Schema.Types.ObjectId}],
    createdBy: String
});

module.exports = mongoose.model("Expense", expenseSchema);