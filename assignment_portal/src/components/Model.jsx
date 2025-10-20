import { Loader2 } from "lucide-react";
import { useState } from "react";

const Modol = ({ isopen, onClose, onUpload ,loading }) => {
  const [file, setFile] = useState(null);
  if (!isopen) return null;

  return (
    <div className="min-h-screen fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Submit Assignments
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Please upload your completed assignment file (.pdf, .docx, or .zip)
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.zip "
          className=" block w-full border border-gray-300 rounded-lg p-2 text-sm"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
     
         <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (file) {
                onUpload(file);
                setFile(null)
                onclose()
              } else {
                alert("Please select a file first!");
              }
            }}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
           {loading?<Loader2 className="h-4 w-4 animate-spin mr-2"/>:"upload"}
          </button>
        </div>
            
      </div>
    </div>
  );
};
export default Modol