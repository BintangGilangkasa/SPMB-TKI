import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

import {
  FaTimes,
  FaCheck,
  FaSearchPlus,
} from "react-icons/fa";

import getCroppedImg from "../utils/CropImage";

import "./ProfileCropModal.css";

function ProfileCropModal({
  image,
  onClose,
  onSave,
}) {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const handleCropComplete = useCallback(
    (_, croppedPixels) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      setLoading(true);

      const croppedBlob = await getCroppedImg(
        image,
        croppedAreaPixels
      );

      onSave(croppedBlob);
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan crop foto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-modal-overlay">

      <div className="crop-modal">

        {/* HEADER */}
        <div className="crop-modal-header">
          <div>
            <h2>Atur Foto Profil</h2>

            <p>
              Geser dan zoom foto untuk memilih
              bagian yang ingin digunakan.
            </p>
          </div>

          <button
            type="button"
            className="crop-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* CROPPER */}
        <div className="crop-container">

          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />

        </div>

        {/* ZOOM */}
        <div className="crop-controls">

          <FaSearchPlus />

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(event) =>
              setZoom(Number(event.target.value))
            }
          />

          <span>
            {Math.round(zoom * 100)}%
          </span>

        </div>

        {/* BUTTON */}
        <div className="crop-actions">

          <button
            type="button"
            className="crop-cancel-button"
            onClick={onClose}
          >
            <FaTimes />
            Batal
          </button>

          <button
            type="button"
            className="crop-save-button"
            onClick={handleSave}
            disabled={loading}
          >
            <FaCheck />

            {loading
              ? "Memproses..."
              : "Gunakan Foto"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileCropModal;