const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        client: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        car: {type: Schema.Types.ObjectId, ref: 'Vehicle', required: true},
        rentalStartDate: {type: Date, required: true},
        rentalEndDate: {type: Date, required: true},
        totalPrice: {type: Number, required: true},
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
            default: 'Pending'
        },
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Order', orderSchema);
