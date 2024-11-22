import React from 'react';
import { Camera, X } from 'lucide-react';

interface Props {
  photos: string[];
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoRemove: (index: number) => void;
}

export function PhotoUploader({ photos, onPhotoUpload, onPhotoRemove }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">上傳照片</h2>
      <div className="grid grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={photo}
              alt={`上傳照片 ${index + 1}`}
              className="w-full h-24 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => onPhotoRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {photos.length < 4 && (
          <label className="w-full h-24 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors duration-300 group">
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoUpload}
              className="hidden"
            />
            <Camera className="text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
          </label>
        )}
      </div>
    </div>
  );
}