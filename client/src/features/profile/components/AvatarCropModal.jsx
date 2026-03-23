import Cropper from "react-easy-crop";
import { useState } from "react";

export default function AvatarCropModal({ image, onCancel, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleDone = async () => {
    onCropComplete(croppedAreaPixels);
    onCancel()
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl w-[90%] max-w-md">

        <div className="relative w-full h-64 bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="mt-4 flex justify-between items-center">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-3 py-1 bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}