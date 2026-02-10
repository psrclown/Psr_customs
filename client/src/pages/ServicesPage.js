import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../utils/api';

/**
 * Services Page - Display all detailing services
 */
const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await servicesAPI.getAll();
        setServices(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load services');
        // Fallback to static services if API fails
        setServices([
          { _id: '1', name: 'Ceramic Coating', description: 'Premium ceramic coating for long-lasting protection.', priceMin: 15000, priceMax: 50000 },
          { _id: '2', name: 'Paint Protection Film (PPF)', description: 'Invisible shield protecting your paint from chips and scratches.', priceMin: 25000, priceMax: 80000 },
          { _id: '3', name: 'Car Washing & Detailing', description: 'Complete exterior wash and interior cleaning.', priceMin: 500, priceMax: 2000 },
          { _id: '4', name: 'Interior Cleaning', description: 'Deep interior cleaning with upholstery and leather care.', priceMin: 2000, priceMax: 8000 },
          { _id: '5', name: 'Scratch & Paint Correction', description: 'Professional paint correction to remove swirls and scratches.', priceMin: 5000, priceMax: 25000 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const formatPrice = (min, max) => {
    return `₹${min?.toLocaleString()} - ₹${max?.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-primary-500 font-display">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle mx-auto">
            Premium detailing services for cars and bikes. From ceramic coating to paint correction.
          </p>
          {error && (
            <p className="text-amber-500 text-sm mt-4">Note: Using cached data. {error}</p>
          )}
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service._id} className="card-dark flex flex-col">
              <div className="h-2 w-16 bg-primary-500 rounded-full mb-4" />
              <h3 className="font-display font-semibold text-xl text-white mb-3">
                {service.name}
              </h3>
              <p className="text-gray-400 flex-1 mb-6">
                {service.description}
              </p>
              <p className="text-primary-500 font-semibold mb-4">
                {formatPrice(service.priceMin, service.priceMax)}
              </p>
              <Link
                to={`/booking?service=${service._id}`}
                className="btn-primary text-center block"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Not sure which service you need?</p>
          <Link to="/contact" className="text-primary-500 hover:text-primary-400 font-medium">
            Contact us for a consultation →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
