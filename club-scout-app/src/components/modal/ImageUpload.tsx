import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

// More about hiddenInputRef for forms: 
// https://react-dropzone.js.org/#section-styling-dropzone

// Define props for the component, explicitly typing the onUpload callback.
interface ImageUploadProps {
  uploadMultiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  // setFile,
  uploadMultiple,
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: (incomingFiles: File[]) => {
        if (hiddenInputRef.current) {
          const dataTransfer = new DataTransfer();
          incomingFiles.forEach((file) => dataTransfer.items.add(file));
          hiddenInputRef.current.files = dataTransfer.files;
        }
      },
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      multiple: uploadMultiple
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer"
    >
      <input
        type="file"
        name="image-file"
        className="hidden"
        ref={hiddenInputRef}
      />
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drop a .png or .jpeg image here, or click to select one</p>
      )}
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default ImageUpload;
