const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userPhoneNumber: {
        type: String,
        required: true,
    },
    numberOfDays: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    additionalNotes: {
        type: String,
    },
    licenseId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    }
}, { timestamps: true });

bookingSchema.statics.isVehicleBooked = async function(vehicleId, startDate, returnDate) {
    const existingBooking = await this.findOne({
      vehicleId,
      $or: [
        { startDate: { $lte: startDate }, returnDate: { $gte: startDate } },
        { startDate: { $lte: returnDate }, returnDate: { $gte: returnDate } },
        { startDate: { $gte: startDate }, returnDate: { $lte: returnDate } }
      ]
    });
  
    return existingBooking !== null;
  };

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
