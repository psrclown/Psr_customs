/**
 * Service Model - Detailing services offered by PSR Customs
 */

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
    },
    priceMin: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: [0, 'Price cannot be negative'],
    },
    priceMax: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: [0, 'Price cannot be negative'],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    duration: {
      type: Number, // in hours
      default: 2,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for price range display
serviceSchema.virtual('priceRange').get(function () {
  return `₹${this.priceMin.toLocaleString()} - ₹${this.priceMax.toLocaleString()}`;
});

serviceSchema.set('toJSON', { virtuals: true });
serviceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Service', serviceSchema);
