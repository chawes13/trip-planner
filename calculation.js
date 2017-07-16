var mongoose    = require('mongoose'),
    User        = require('./models/user'),
    Expense     = require('./models/expense'),
    Trip        = require('./models/trip');
    
// var calculator = {
    
//     amountOwed: function(expenses, currentUser){
//         var result = [];
        
//         var usersExpenses = expenses.filter(function(expense){
//             return expense.createdBy === currentUser.username;
//         });
        
//         usersExpenses.forEach(function(expense){
//             var splitAmount = expense.splitAmount;
//             expense.traveller_ids.forEach(function(traveller_id){
//                 if(traveller_id !== currentUser._id){
//                     result[traveller_id].amount += splitAmount;
//                 }
//             });
//         });
        
        
        
        
        
        
//         console.log("===========================")
//         console.log(result);
//         return result;
//         }
// };


function calculateExpenseSummary(expenses){
    
    
    
    
}

function filterUsersResult(results, currentUser){
    return results.filter(function(result){
        return result.user_id.equals(currentUser._id);
    });
}


//module.exports = calculateUserExpenseSummary;