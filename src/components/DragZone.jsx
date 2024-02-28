import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
const DragZone = ({ setFile }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = "all";
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  return (
    <div
      className={`${
        dragOver ? "border-primary-50 border-[2px]" : "border-primary-30"
      } h-[300px] max-w-[500px] w-full border-2 border-dashed border-primary-30 rounded-lg flex items-center justify-center flex-col gap-y-2`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <RiImageAddFill size={42} className="text-gray" />
      <p className="text-gray text-center font-medium">
        Drag and drop an img or <br />{" "}
        <label
          htmlFor="image-file"
          className="text-primary-30 underline cursor-pointer hover:text-primary-50"
        >
          Browse to upload
        </label>{" "}
      </p>
      <input
        type="file"
        name=""
        id="image-file"
        accept="image/png, image/jpg, image/jpeg"
        hidden
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
  );
};

export default DragZone;
