import React from 'react';
import { Link } from 'react-router-dom';

/**
 * About Page - Description, Mission & Vision of PSR Customs
 */
const AboutPage = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title">About PSR Customs</h1>
          <p className="section-subtitle mx-auto">
            Premium car detailing and customization studio for cars and bikes.
          </p>
        </div>

        {/* Description */}
        <div className="card-dark mb-12">
          <h2 className="font-display font-semibold text-2xl text-white mb-6">
            Who We Are
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            PSR Customs is a premium car detailing and customization studio dedicated to providing
            exceptional care for your vehicles. Whether you own a car or a bike, we bring your
            ride to its best form with professional-grade services.
          </p>
          <p className="text-gray-400 leading-relaxed">
            From ceramic coating and paint protection film to interior cleaning and paint
            correction, our team uses industry-leading products and proven techniques to deliver
            results that exceed expectations. We believe every vehicle deserves premium care.
          </p>
        </div>

        {/* Mission */}
        <div className="card-dark mb-12">
          <h2 className="font-display font-semibold text-2xl text-primary-500 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-400 leading-relaxed">
            To provide car and bike owners with the highest quality detailing and protection
            services. We strive to transform every vehicle we touch, using premium products,
            skilled craftsmanship, and unwavering commitment to customer satisfaction.
          </p>
        </div>

        {/* Vision */}
        <div className="card-dark mb-12">
          <h2 className="font-display font-semibold text-2xl text-primary-500 mb-6">
            Our Vision
          </h2>
          <p className="text-gray-400 leading-relaxed">
            To be the most trusted name in automotive detailing and customization. We envision
            a future where every vehicle owner understands the value of professional care and
            turns to PSR Customs for premium protection and stunning results.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">Ready to experience the PSR Customs difference?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-primary">
              Book Appointment
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
