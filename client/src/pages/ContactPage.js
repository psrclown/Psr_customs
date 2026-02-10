import React, { useState } from "react";

/**
 * Contact Page - Address, phone, WhatsApp, Google Map, contact form
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Message sent successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Server not reachable",
      });
    }
  };

  const whatsappNumber = "919876543210"; // Replace with actual number
  const phoneNumber = "+91 98765 43210";

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle mx-auto">
            Reach out to us for bookings, queries, or just to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-dark">
              <h3 className="font-display font-semibold text-xl text-white mb-4">
                Visit Our Studio
              </h3>
              <p className="text-gray-400">
                123 Automotive Street
                <br />
                Detailing District
                <br />
                City - 400001
              </p>
            </div>

            <div className="card-dark">
              <h3 className="font-display font-semibold text-xl text-white mb-4">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <span className="text-primary-500">📞</span> {phoneNumber}
                </a>
                <a
                  href="mailto:info@psrcustoms.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <span className="text-primary-500">✉️</span>{" "}
                  info@psrcustoms.com
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary mt-4"
                >
                  <span>WhatsApp</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Google Map - Replace embed URL with your location */}
            <div className="card-dark overflow-hidden p-0">
              <div className="aspect-video relative">
                <iframe
                  title="PSR Customs Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.813165788309!2d81.94866782956689!3d25.4245194675263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854b3e2fed4cef%3A0xe6db86c3f701dfa5!2sPSR%20CUSTOMS!5e0!3m2!1sen!2sin!4v1770722973642!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 300 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="p-2 text-center text-gray-500 text-xs">
                Update embed URL in ContactPage.js with your actual location
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="card-dark space-y-6">
              <h3 className="font-display font-semibold text-xl text-white mb-6">
                Send us a Message
              </h3>

              {message.text && (
                <div
                  className={`p-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-primary-500/20 text-primary-400 border border-primary-500/50"
                      : "bg-red-500/20 text-red-400 border border-red-500/50"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
