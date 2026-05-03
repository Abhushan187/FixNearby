import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Services = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const dummyWorkers = [
    { id: 1, name: "John Doe", profession: "Electrician", rating: 4.8, price: "$40/hr", verified: true },
    { id: 2, name: "Jane Smith", profession: "Plumber", rating: 4.9, price: "$50/hr", verified: true },
    { id: 3, name: "Mike Johnson", profession: "Carpenter", rating: 4.5, price: "$35/hr", verified: true },
    { id: 4, name: "Sarah Wilson", profession: "Cleaning", rating: 4.7, price: "$30/hr", verified: true },
    { id: 5, name: "Tom Brown", profession: "AC Repair", rating: 4.6, price: "$55/hr", verified: true },
  ];

  const categories = ['All', 'Electrician', 'Plumber', 'Carpenter', 'Cleaning', 'AC Repair', 'Pest Control', 'Moving'];

  const iconMap = {
    Electrician: '⚡',
    Plumber: '🚿',
    Carpenter: '🔨',
    Cleaning: '🧹',
    'AC Repair': '❄️',
    'Pest Control': '🐛',
    Moving: '🚚',
    Painting: '🎨',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      let filtered = dummyWorkers;

      if (query) {
        filtered = filtered.filter(worker => 
          worker.name.toLowerCase().includes(query) || 
          worker.profession.toLowerCase().includes(query)
        );
      }

      if (categoryFilter !== 'All') {
        filtered = filtered.filter(worker => worker.profession === categoryFilter);
      }

      setFilteredWorkers(filtered);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, categoryFilter]);
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Expanded categories
  const categories = [
    "All",
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "AC Technician",
    "Cleaner",
    "Mechanic",
    "Gardener",
    "Appliance Repair",
    "Pest Control",
  ];

  // Category icons
  const categoryIcons = {
    Electrician: "⚡",
    Plumber: "🚰",
    Carpenter: "🪵",
    Painter: "🎨",
    "AC Technician": "❄️",
    Cleaner: "🧹",
    Mechanic: "🔧",
    Gardener: "🌱",
    "Appliance Repair": "🔌",
    "Pest Control": "🐜",
  };

  // Simulated API call
  useEffect(() => {
    setTimeout(() => {
      try {
        const data = [
          { id: 1, name: "John Doe", profession: "Electrician", rating: 4.8, price: "$40/hr" },
          { id: 2, name: "Jane Smith", profession: "Plumber", rating: 4.9, price: "$50/hr" },
          { id: 3, name: "Mike Johnson", profession: "Carpenter", rating: 4.5, price: "$35/hr" },
          { id: 4, name: "Ravi Kumar", profession: "Painter", rating: 4.6, price: "$30/hr" },
          { id: 5, name: "Amit Sharma", profession: "AC Technician", rating: 4.7, price: "$45/hr" },
          { id: 6, name: "Suresh Patel", profession: "Cleaner", rating: 4.3, price: "$25/hr" },
          { id: 7, name: "David Lee", profession: "Mechanic", rating: 4.8, price: "$55/hr" },
          { id: 8, name: "Priya Singh", profession: "Gardener", rating: 4.4, price: "$20/hr" },
          { id: 9, name: "Imran Khan", profession: "Appliance Repair", rating: 4.6, price: "$35/hr" },
          { id: 10, name: "Neha Gupta", profession: "Pest Control", rating: 4.5, price: "$40/hr" },
        ];
        setWorkers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load workers");
        setLoading(false);
      }
    }, 1000);
  }, []);

  // Filtering logic
  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.profession.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || worker.profession === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workers, services, or location..." 
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
          <button 
            onClick={() => setSearchQuery('')}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
          >
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredWorkers.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">🔍</div>
          <h3 className="mt-2 text-2xl font-bold text-gray-900 mb-2">No services found</h3>
          <p className="text-xl text-gray-500 mb-8">Try adjusting your search or category filter</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
            >
              Clear All Filters
            </button>
            <Link to="/" className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm transition">
              Browse Categories
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="group bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col border border-gray-100 hover:border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{iconMap[worker.profession] || '👷'}</div>
                {worker.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">Verified</span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">{worker.name}</h3>
              <p className="text-blue-600 font-medium text-lg mb-4">{worker.profession}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                <span>⭐ {worker.rating}</span>
                <span className="font-semibold text-gray-900">{worker.price}</span>
              </div>
              <Link 
                to={`/worker/${worker.id}`} 
                className="w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                View Profile & Book
              </Link>
            </div>
          ))}
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Find Skilled Workers Nearby
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full border text-sm transition ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat !== "All" ? `${categoryIcons[cat] || ""} ${cat}` : cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      {!loading && !error && (
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredWorkers.length} results
        </p>
      )}

      {/* States */}
      {loading && <p className="text-gray-500">Loading workers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Worker Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {worker.name}
                </h3>

                <span className="inline-block mt-1 text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full w-fit">
                  {worker.profession}
                </span>

                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span> {worker.rating}</span>
                  <span className="font-medium text-gray-700">
                    {worker.price}
                  </span>
                </div>

                <Link
                  to={`/worker/${worker.id}`}
                  className="mt-6 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  View Profile
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No workers found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;