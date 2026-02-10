/**
 * Booking Model - Appointment bookings for PSR Customs
 */

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[\d\s\-\+]+$/, 'Please enter a valid phone number'],
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      enum: ['car', 'bike', 'suv', 'other'],
    },
    vehicleModel: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service is required'],
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for formatted date
bookingSchema.virtual('formattedDate').get(function () {
  return this.date.toLocaleDateString();
});

// Ensure virtuals are included in JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema);
