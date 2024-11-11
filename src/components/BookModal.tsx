import React from 'react';
import { X, Brain, ExternalLink, Star } from 'lucide-react';
import { Book } from '../types';

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a2e] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-modal">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <img
              src={book.imgUrl}
              alt={book.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">{book.category}</span>
              </div>
              {book.goodReads && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">{book.goodReads} ({book.reviews} reviews)</span>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {book.title}
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {book.text}
            </p>

            <p className="text-3xl font-bold text-blue-400 mb-6">
              ${book.price}
            </p>

            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors"
            >
              View on Amazon <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}