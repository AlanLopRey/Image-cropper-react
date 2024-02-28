import { useState } from "react";
import Cropper from "react-easy-crop";
import { RiCloseFill } from "react-icons/ri";

const ImageCropper = ({ imageSrc, file, setOpenCropper }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCroppedComplete = (_, croppedAreaPixels) =>
    setCroppedArea(croppedAreaPixels);

  const handleSave = (croppedArea) => {
    const {
      x: cropX,
      y: cropY,
      width: cropWidth,
      height: cropHeight,
    } = croppedArea;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    let image = new Image();
    image.src = imageSrc;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    image.onload = () => {
      const dataURL = canvas.toDataURL();
      const aTag = document.createElement("a");

      aTag.href = dataURL;
      aTag.download = file.name;
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    };
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={() => setOpenCropper(false)}
      ></div>
      <div className="relative w-full h-full sm:max-w-[600px] sm:h-auto bg-white-100 p-5 sm:rounded-xl flex flex-col gap-y-5 shadow-lg">
        <header className="flex justify-between">
          <p className="text-primary-90 font-medium text-base ">
            Image Cropper
          </p>
          <RiCloseFill
            size={24}
            className="text-primary-90 cursor-pointer"
            onClick={() => setOpenCropper(false)}
          />
        </header>
        <div className="relative h-[350px] w-full border-2 border-dashed border-primary-50 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            minZoom={1}
            maxZoom={2}
            zoomWithScroll={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCroppedComplete}
          />
        </div>
        <div className="flex flex-col gap-y-2 ">
          <label className="text-primary-90 font-medium " htmlFor="zoom-range">
            Zoom: {parseInt(zoom * 100)} %{" "}
          </label>
          <input
            className=" h-3 w-full rounded-full "
            type="range"
            name="zoom-range"
            id="zoom-range"
            min={100}
            max={200}
            value={zoom * 100}
            onChange={(e) => setZoom(e.target.value / 100)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="btn-primary-outlined"
            onClick={() => setOpenCropper(false)}
          >
            Close
          </button>
          <button
            className="btn-primary-fill"
            onClick={() => handleSave(croppedArea)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
