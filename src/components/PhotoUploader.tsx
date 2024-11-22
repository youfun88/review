import React from 'react';
import { Camera, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  photos: string[];
  onPhotoAdd: (photo: string) => void;
  onPhotoRemove: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PhotoUploader({ photos, onPhotoAdd, onPhotoRemove, onNext, onBack }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotoAdd(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">上傳照片</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative group aspect-square">
            <img
              src={photo}
              alt={`上傳照片 ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <button
              onClick={() => onPhotoRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {photos.length < 4 && (
          <label className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-center">
              <Camera className="mx-auto text-gray-400 mb-2" size={24} />
              <span className="text-sm text-gray-500">上傳照片</span>
            </div>
          </label>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-6">
        最多可上傳 4 張照片，建議上傳店家環境、商品或服務過程的照片
      </p>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} />
          返回
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          下一步
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}