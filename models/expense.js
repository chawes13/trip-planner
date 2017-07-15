var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
    description: String,
    txnDate: {
        type: Date,
        default: Date.now()},
    txnAmount: Number,
    currency: String,
    traveller_ids: [
        {type: mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model("Expense", expenseSchema);