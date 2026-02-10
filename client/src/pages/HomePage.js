import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page - Landing page for PSR Customs
 */
const HomePage = () => {
  const whyChooseUs = [
    {
      title: 'Expert Craftsmanship',
      description: 'Our trained professionals use premium products and proven techniques for flawless results.',
      icon: '⚙️',
    },
    {
      title: 'Premium Products',
      description: 'We use only industry-leading ceramic coatings, PPF, and detailing products.',
      icon: '✨',
    },
    {
      title: 'Customer Satisfaction',
      description: 'Your vehicle deserves the best. We guarantee satisfaction with every service.',
      icon: '🏆',
    },
  ];

  const testimonials = [
    {
      name: 'Rahul S.',
      text: 'PSR Customs transformed my car! The ceramic coating is amazing - water beads right off.',
      rating: 5,
    },
    {
      name: 'Priya M.',
      text: 'Professional service and attention to detail. Will definitely come back for PPF on my new bike.',
      rating: 5,
    },
    {
      name: 'Vikram K.',
      text: 'Best detailing studio in town. The paint correction brought my old car back to life!',
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-500 font-display font-medium text-sm md:text-base tracking-widest uppercase mb-4 animate-fade-in">
            Premium Car Detailing & Customization
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 animate-slide-up">
            Transform Your
            <span className="block text-primary-500">Vehicle</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-slide-up">
            Experience the pinnacle of automotive care. Ceramic coating, PPF, detailing, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/booking" className="btn-primary">
              Book Appointment
            </Link>
            <Link to="/services" className="btn-secondary">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose PSR Customs */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Why Choose PSR Customs</h2>
          <p className="section-subtitle text-center mx-auto mb-16">
            We combine expertise with premium products to deliver exceptional results for cars and bikes.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="card-dark text-center group hover:border-primary-500/70">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">What Our Customers Say</h2>
          <p className="section-subtitle text-center mx-auto mb-16">
            Trusted by car and bike owners across the region.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((review, index) => (
              <div key={index} className="card-dark">
                <div className="flex text-primary-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{review.text}"</p>
                <p className="font-semibold text-primary-500">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Ready to Give Your Vehicle the Care It Deserves?</h2>
          <p className="text-gray-400 mb-8">
            Contact us today or book an appointment online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-primary">
              Book Now
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
