import React from 'react';
import { Book } from '../types';
import { Brain, ExternalLink, Star } from 'lucide-react';

interface BookCardProps extends Book {
  rank?: number;
  onOpenModal: () => void;
}

export default function BookCard({ 
  title, 
  text, 
  url, 
  imgUrl, 
  category, 
  rank, 
  price,
  goodReads,
  reviews,
  onOpenModal 
}: BookCardProps) {
  return (
    <div 
      onClick={onOpenModal}
      className="group relative bg-white/5 rounded-2xl overflow-hidden border border-blue-500/20 backdrop-blur-sm cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Rank Badge */}
      <div className="absolute top-4 right-4 z-20 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
        {rank}
      </div>
      
      {/* Image Container */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">{category}</span>
          </div>
          {goodReads && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">{goodReads}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {text}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-400">${price}</span>
          <span className="inline-flex items-center gap-2 text-sm text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
            View Details <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}