import { supabase } from "@/lib/supabaseClient";
import { ChangeEvent, useState } from "react";

// Define props for the component, explicitly typing the onUpload callback.
interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  // Handle file input changes.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files) {
      // TypeScript now knows that event.target.files[0] is of type File.
      setFile(event.target.files[0]);
    }
  };

  // Handle the upload process.
  const handleUpload = async () => {
    if (!file) return;

    // Create a unique file name using the current timestamp.
    const fileName = `${Date.now()}-${file.name}`;

    // Upload the file to the "club-images" bucket.
    const { data, error } = await supabase.storage
      .from("club-card-images")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error.message);
      return;
    }else{
        console.log("MMA data: ", data);
    }

    // Fix 3 & 4: getPublicUrl returns an object with a data property that contains publicUrl (note the lowercase 'l').
    // Also, getPublicUrl does not return an error, so we remove the destructuring of error.
    const { data: publicUrlData } = supabase.storage
      .from("club-images")
      .getPublicUrl(fileName);

    // Ensure that publicUrl is defined.
    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error("Unable to get public URL.");
      return;
    }

    // Call the onUpload callback with the public URL.
    onUpload(publicUrlData.publicUrl);
  };

  return (
    <div>
      {/* Input for file selection */}
      <input type="file" onChange={handleFileChange} />
      {/* Button to trigger the upload */}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
