"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { MapPin, Star, ArrowUpRight, Sparkles, TrendingUp, Users, Globe, Play, Heart, MessageCircle, Share2, Search, Filter, ChevronRight, Zap, Shield, Clock, ShoppingBag, Phone, Mail, Navigation } from 'lucide-react';
import BusinessReels from '@/components/BusinessReels';

export default function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showReels, setShowReels] = useState(false);
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    averageRating: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    const { data } = await supabase.from('businesses').select('*').order('created_at', { ascending: false });
    if (data) {
      setBusinesses(data);
      calculateStats(data);
    }
    setLoading(false);
  };

  const calculateStats = (businessData) => {
    // Total businesses
    const totalBusinesses = businessData.length;
    
    // Average rating (using actual ratings or fallback to 4.5 if no ratings exist)
    const ratings = businessData.map(b => b.rating || 4.5).filter(r => r > 0);
    const averageRating = ratings.length > 0 
      ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
      : '4.5';
    
    // Monthly growth calculation based on creation dates
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
    
    const thisMonth = businessData.filter(b => new Date(b.created_at) >= oneMonthAgo).length;
    const lastMonth = businessData.filter(b => {
      const date = new Date(b.created_at);
      return date >= twoMonthsAgo && date < oneMonthAgo;
    }).length;
    
    const monthlyGrowth = lastMonth > 0 
      ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100)
      : thisMonth > 0 ? 25 : 0; // Default to 25% if there are new businesses but no previous month data

    setStats({
      totalBusinesses,
      averageRating,
      monthlyGrowth: Math.max(0, monthlyGrowth) // Ensure non-negative
    });
  };

  const filtered = filter === 'All' ? businesses : businesses.filter(b => b.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-bold mb-8 border border-violet-200 dark:border-violet-800">
              <Zap size={16} className="text-yellow-500 animate-pulse" />
              <span>Discover Amazing Local Businesses</span>
              <Sparkles size={16} className="text-yellow-500 animate-spin-slow" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
              <span className="block text-gray-900 dark:text-white">Find Your</span>
              <span className="text-gradient-vibrant">Perfect Local</span>
              <span className="block text-gray-900 dark:text-white">Experience</span>
            </h1>

            {/* Subheading */}
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              🎯 Connect with exceptional local businesses
              <br className="hidden sm:block" />
              🚀 Experience quality service and innovation
              <br className="hidden sm:block" />
              💝 Support your local community
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="🔍 Search for businesses, services, or products..."
                  className="w-full px-8 py-6 text-lg rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/25">
                  <Search size={24} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                href="/signup" 
                className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-violet-500/30 transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
              >
                <span className="text-white">🚀 Start Exploring</span>
                <ArrowUpRight size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </Link>
              <Link 
                href="#businesses" 
                className="group inline-flex items-center gap-4 px-12 py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-3xl font-bold text-xl border-2 border-violet-200 dark:border-violet-700 hover:border-violet-500 transition-all duration-300 shadow-xl hover:shadow-violet-500/20 hover:-translate-y-2"
              >
                <span className="text-gray-900 dark:text-white">🎯 Browse Businesses</span>
                <Globe size={24} className="text-violet-600 dark:text-violet-400" />
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <div className="text-center p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border border-violet-100 dark:border-violet-800/50">
              <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verified Businesses</h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">All businesses are verified and trusted</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border border-violet-100 dark:border-violet-800/50">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Customer Love</h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Real reviews from real customers</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border border-violet-100 dark:border-violet-800/50">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quick Response</h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Fast replies from businesses</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-24 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">📊 Platform Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-2xl">
                <div className="text-5xl font-black mb-4">{stats.totalBusinesses}+</div>
                <p className="text-xl font-medium">Active Businesses</p>
              </div>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-2xl">
                <div className="text-5xl font-black mb-4">{stats.averageRating}⭐</div>
                <p className="text-xl font-medium">Average Rating</p>
              </div>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-2xl">
                <div className="text-5xl font-black mb-4">{stats.monthlyGrowth}%</div>
                <p className="text-xl font-medium">Monthly Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Businesses Section */}
      <section id="businesses" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
              Featured <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">Businesses</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Explore handpicked local businesses offering exceptional products and services
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['All', 'Grocery', 'Fashion', 'Electronics', 'Food', 'Services'].map((cat, index) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 animate-fadeInUp shadow-md ${
                  filter === cat 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-violet-200 dark:border-violet-700 hover:border-violet-400 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Business Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((biz, index) => (
                <Link 
                  key={biz.id} 
                  href={`/${biz.slug}`}
                  className="group animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden hover-lift gradient-card-light dark:gradient-card-dark">
                    {/* Image */}
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={biz.image_url} 
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
                          {biz.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-shadow-light dark:text-shadow-dark">
                        {biz.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin size={16} className="text-red-500" />
                        <span className="text-sm">{biz.location}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 text-shadow-light dark:text-shadow-dark">
                        {biz.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{biz.rating || 4.8}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setShowReels(true);
                            }}
                            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            <Play size={14} />
                            View Reels
                          </button>
                          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                            Visit →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Business Reels Modal */}
      {showReels && (
        <BusinessReels 
          businesses={filtered} 
          onClose={() => setShowReels(false)} 
        />
      )}
    </div>
  );
}