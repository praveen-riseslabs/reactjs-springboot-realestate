import React, { useState } from 'react';
import axios from 'axios';

export default function ExcelUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'http://localhost:8086/api/public/project-details/upload-customers-data',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Excel sheet Data sent to backend successfully', response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div>
      <div className="mb-3 col-6">
        <label className="form-label">Upload Excel Sheet <span className="text-danger">*</span></label>
        <div className="input-group">
          <input
            type="file"
            accept=".xlsx, .xls"
            name="excel_sheet"
            className="form-control"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
