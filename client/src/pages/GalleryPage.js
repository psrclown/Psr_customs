import React, { useState } from 'react';

/**
 * Gallery Page - Before & After car images
 * Using placeholder images from Unsplash for demo
 */
const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Ceramic Coating',
      before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
      category: 'coating',
    },
    {
      id: 2,
      title: 'Paint Correction',
      before: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
      category: 'correction',
    },
    {
      id: 3,
      title: 'Interior Detailing',
      before: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
      category: 'interior',
    },
    {
      id: 4,
      title: 'Full Detail',
      before: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
      category: 'full',
    },
    {
      id: 5,
      title: 'Bike Detailing',
      before: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop',
      category: 'bike',
    },
    {
      id: 6,
      title: 'PPF Installation',
      before: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop',
      category: 'ppf',
    },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'coating', label: 'Ceramic Coating' },
    { key: 'correction', label: 'Paint Correction' },
    { key: 'interior', label: 'Interior' },
    { key: 'ppf', label: 'PPF' },
    { key: 'bike', label: 'Bikes' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Before & After</h1>
          <p className="section-subtitle mx-auto">
            See the transformation. Our detailing work speaks for itself.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="card-dark group overflow-hidden">
              <div className="text-center mb-4">
                <h3 className="font-display font-semibold text-lg text-white">{item.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Before</p>
                  <img
                    src={item.before}
                    alt={`${item.title} - Before`}
                    className="w-full h-40 object-cover rounded-lg border border-dark-600 group-hover:border-primary-500/50 transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">After</p>
                  <img
                    src={item.after}
                    alt={`${item.title} - After`}
                    className="w-full h-40 object-cover rounded-lg border border-dark-600 group-hover:border-primary-500/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-gray-400 py-12">No results for this filter.</p>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
