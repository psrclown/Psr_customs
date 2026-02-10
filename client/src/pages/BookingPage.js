import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bookingsAPI, servicesAPI } from '../utils/api';

/**
 * Booking Page - Appointment booking form
 */
const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: 'car',
    vehicleModel: '',
    service: preselectedService || '',
    date: '',
    notes: '',
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await servicesAPI.getAll();
        setServices(data);
        if (preselectedService && !formData.service) {
          setFormData((prev) => ({ ...prev, service: preselectedService }));
        }
      } catch (err) {
        setServices([]);
      }
    };
    fetchServices();
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' });
      return false;
    }
    if (!formData.phone.trim()) {
      setMessage({ type: 'error', text: 'Phone number is required' });
      return false;
    }
    if (!formData.vehicleModel.trim()) {
      setMessage({ type: 'error', text: 'Vehicle model is required' });
      return false;
    }
    if (!formData.service) {
      setMessage({ type: 'error', text: 'Please select a service' });
      return false;
    }
    if (!formData.date) {
      setMessage({ type: 'error', text: 'Please select appointment date' });
      return false;
    }
    const selectedDate = new Date(formData.date);
    if (selectedDate < new Date().setHours(0, 0, 0, 0)) {
      setMessage({ type: 'error', text: 'Please select a future date' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await bookingsAPI.create({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        vehicleType: formData.vehicleType,
        vehicleModel: formData.vehicleModel.trim(),
        service: formData.service,
        date: formData.date,
        notes: formData.notes.trim() || undefined,
      });

      setMessage({ type: 'success', text: 'Booking submitted successfully! We will contact you to confirm.' });
      setFormData({
        name: '',
        phone: '',
        vehicleType: 'car',
        vehicleModel: '',
        service: '',
        date: '',
        notes: '',
      });
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Failed to submit booking';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-title">Book an Appointment</h1>
          <p className="section-subtitle">
            Fill in the form below and we'll get back to you to confirm your slot.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-dark space-y-6">
          {/* Message */}
          {message.text && (
            <div
              className={`p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Vehicle Type *</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="suv">SUV</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Vehicle Model */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Vehicle Model *</label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              placeholder="e.g., Honda City, Royal Enfield Classic"
              required
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              required
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} (₹{s.priceMin?.toLocaleString()} - ₹{s.priceMax?.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
              placeholder="Any special requests or details..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
