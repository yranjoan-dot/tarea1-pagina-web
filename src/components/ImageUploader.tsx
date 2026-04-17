import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void;
  preview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, preview }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageSelected(file);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-nba-orange bg-orange-50'
            : 'border-gray-300 hover:border-nba-orange hover:bg-orange-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl">📸</div>
          {isDragActive ? (
            <p className="text-lg font-semibold text-nba-orange">Suelta la foto aquí</p>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-800">Sube la foto de tu equipo de NBA</p>
              <p className="text-sm text-gray-600">O arrastra y suelta una imagen aquí</p>
              <p className="text-xs text-gray-500 mt-2">Formatos soportados: JPG, PNG, GIF, WebP</p>
            </>
          )}
        </div>
      </div>

      {preview && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Vista previa</h3>
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
