import { useState } from 'react';
import { Search, Bell, ChevronDown, Plus } from 'lucide-react';

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Beauty', 'Kids', 'Decor', 'Fitness'];

  const products = [
    {
      id: 1,
      name: 'Fortune Basmati Rice (5kg)',
      description: 'Premium long grain',
      price: 399,
      originalPrice: 460,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/b4af529d3863ed489a9f50c12382756a4b6d49f6?width=272'
    },
    {
      id: 2,
      name: 'Amul Gold Milk',
      description: 'Full Cream | 1L',
      price: 64,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/41878e45041b87b25a1a43faf7e04a07c2121540?width=272'
    },
    {
      id: 3,
      name: 'Lay\'s Magic Masala',
      description: 'Spicy, crispy snack | 52g',
      price: 20,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/155e8f52f2c8f26155a128c53f8474f3a1b241ca?width=272'
    },
    {
      id: 4,
      name: 'Fresh Tomatoes',
      description: '500g | Locally sourced',
      price: 19,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/d4a52c7d0ce3cc503cbc795b49056402471bb103?width=360'
    }
  ];

  return (
    <div className="w-full min-h-full bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-xs text-gray-600">Delivering to</p>
              <div className="flex items-center space-x-1">
                <h2 className="text-base font-bold text-gray-800">Shiv Vihar, Palwal</h2>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
          <Bell className="w-6 h-6 text-firststore-teal" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Groceries, Makeup, toys, kids collection"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-firststore-teal focus:border-transparent"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 mb-6">
        <div className="relative">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/cf3da88aea65f21ccca9adc8e5bef3421fda8c38?width=816"
            alt="Groceries at Your Doorstep"
            className="w-full h-80 object-cover rounded-3xl"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-5 h-1 bg-firststore-teal rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* What Do You Need Today Section */}
      <div className="px-4 mb-6">
        <h2 className="text-base font-bold text-firststore-dark mb-4">What Do You Need Today?</h2>
        
        {/* Category Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap border ${
                activeCategory === category
                  ? 'bg-white border-firststore-teal text-firststore-teal'
                  : 'bg-white border-gray-400 text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
              {/* Product Image */}
              <div className="bg-gray-50 rounded-t-lg p-1 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded-lg"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-2">
                <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                
                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
                    {product.originalPrice && (
                      <div className="relative">
                        <span className="text-xs text-gray-500">₹{product.originalPrice}</span>
                        <div className="absolute inset-x-0 top-1.5 h-px bg-firststore-teal"></div>
                      </div>
                    )}
                  </div>
                  <button className="w-6 h-6 bg-firststore-teal rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Near You Section */}
      <div className="bg-firststore-teal px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-white">Trending Near You!</h2>
          <button className="bg-white px-4 py-2 rounded-lg">
            <span className="text-xs text-firststore-teal">View All →</span>
          </button>
        </div>

        {/* Horizontal Scrolling Product List */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {products.map((product) => (
            <div key={`trending-${product.id}`} className="bg-white rounded-lg shadow-sm min-w-[196px] flex-shrink-0">
              {/* Product Image */}
              <div className="bg-gray-50 rounded-t-lg p-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded-lg"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-2">
                <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                
                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
                    {product.originalPrice && (
                      <div className="relative">
                        <span className="text-xs text-gray-500">₹{product.originalPrice}</span>
                        <div className="absolute inset-x-0 top-1.5 h-px bg-firststore-teal"></div>
                      </div>
                    )}
                  </div>
                  <button className="w-6 h-6 bg-firststore-teal rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
