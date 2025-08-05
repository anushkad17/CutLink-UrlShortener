import React from 'react';

const QrModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center relative">
        <h2 className="text-xl font-semibold mb-4">QR Code</h2>
        <img src={imageUrl} alt="QR Code" className="mx-auto w-56 h-56" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
        <a
          href={imageUrl}
          download="qr-code.png"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default QrModal;
