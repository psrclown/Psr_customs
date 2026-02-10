/**
 * Booking Routes - CRUD operations for appointments
 */

const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create new booking (public - customers can book)
 * @access  Public
 */
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('vehicleType').isIn(['car', 'bike', 'suv', 'other']).withMessage('Invalid vehicle type'),
    body('vehicleModel').trim().notEmpty().withMessage('Vehicle model is required'),
    body('service').isMongoId().withMessage('Valid service ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, phone, vehicleType, vehicleModel, service, date, notes } = req.body;

      // Verify service exists
      const serviceExists = await Service.findById(service);
      if (!serviceExists) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const booking = await Booking.create({
        name,
        phone,
        vehicleType,
        vehicleModel,
        service,
        date: new Date(date),
        notes,
      });

      await booking.populate('service', 'name priceMin priceMax');
      res.status(201).json(booking);
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings
 * @access  Private (Admin only)
 */
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service', 'name priceMin priceMax')
      .sort({ date: 1, createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   GET /api/bookings/:id
 * @desc    Get single booking
 * @access  Private (Admin only)
 */
router.get(
  '/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid booking ID')],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const booking = await Booking.findById(req.params.id).populate(
        'service',
        'name priceMin priceMax description'
      );

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @route   PUT /api/bookings/:id
 * @desc    Update booking (mainly status)
 * @access  Private (Admin only)
 */
router.put(
  '/:id',
  protect,
  [
    param('id').isMongoId().withMessage('Invalid booking ID'),
    body('status').optional().isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('service', 'name priceMin priceMax');

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete booking
 * @access  Private (Admin only)
 */
router.delete(
  '/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid booking ID')],
  async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
