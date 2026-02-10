/**
 * Service Routes - CRUD operations for detailing services
 */

const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/services
 * @desc    Get all services (public - for booking page)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ name: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   GET /api/services/:id
 * @desc    Get single service
 * @access  Public
 */
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid service ID')],
  async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @route   POST /api/services
 * @desc    Create new service
 * @access  Private (Admin only)
 */
router.post(
  '/',
  protect,
  [
    body('name').trim().notEmpty().withMessage('Service name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('priceMin').isNumeric().withMessage('Min price must be a number'),
    body('priceMax').isNumeric().withMessage('Max price must be a number'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const service = await Service.create(req.body);
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @route   PUT /api/services/:id
 * @desc    Update service
 * @access  Private (Admin only)
 */
router.put(
  '/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid service ID')],
  async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.json(service);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete service
 * @access  Private (Admin only)
 */
router.delete(
  '/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid service ID')],
  async (req, res) => {
    try {
      const service = await Service.findByIdAndDelete(req.params.id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
