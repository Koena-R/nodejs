const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    industry: String,
    orders: [
        {
            description: String,
            amountInCents: Number
        }
    ]
});

module.exports = mongoose.model('Customer', customerSchema);
