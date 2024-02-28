import { useEffect, useState } from "react";
import { DragZone, ImageCropper } from "./components";
import { useFileReader } from "./hooks/useFileReader";

function App() {
  const [openCropper, setOpenCropper] = useState(false);
  const [{ result, error, file }, setFile] = useFileReader({
    method: "readAsDataURL",
    accept: ["png", "jpg", "jpeg"],
    maxFileSize: 5,
  });

  useEffect(() => {
    if (result && !error.type) setOpenCropper(true);
    else setOpenCropper(false);
  }, [result, error.type]);

  return (
    <div className="realtive min-h-screen flex flex-col items-center justify-center p-2 bg-white-50 font-poppins">
      <DragZone setFile={setFile} />
      {(error.type === "fileType" || error.type === "fileSize") && (
        <p className="text-red-500 font-medium">{error.msg}</p>
      )}
      {openCropper && (
        <ImageCropper
          imageSrc={result}
          file={file}
          setOpenCropper={setOpenCropper}
        />
      )}
    </div>
  );
}

export default App;
