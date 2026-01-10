import React from 'react';
import { MapPin, Clock, Star, Heart, TrendingUp } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  tags: string[];
  rating: number;
  reviews: number;
  recommended: boolean;
}

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {destination.recommended && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs shadow-lg">
              <TrendingUp className="w-3 h-3" />
              <span>AI 推荐</span>
            </div>
          )}
          <button className="ml-auto bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg">
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-2xl mb-1">{destination.name}</h3>
          <div className="flex items-center gap-1 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{destination.location}</span>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Rating & Duration */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-gray-900">{destination.rating}</span>
            <span className="text-sm text-gray-500">({destination.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{destination.duration}</span>
          </div>
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">起价</div>
            <div className="text-2xl text-gray-900">{destination.price}</div>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
            查看详情
          </button>
        </div>
      </div>
    </div>
  );
}
