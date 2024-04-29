import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";

const ProductsScreen = () => {
    const [file, setFile] = useState(null);
    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0])
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const handleUpload = async () => {
        if (!file) return;
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                console.log('Parsed Excel data:', jsonData);
                const response = await axios.post("api", {
                    data: jsonData
                });
                console.log(response.data);
            }
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <DashboardTemplate pageTitle={"Products"}>
            <div className="bg-white h-screen">Products will display here</div>
            <div>
                <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    <p>Drag and drop an Excel file here, or click to select one</p>
                </div>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </DashboardTemplate>
    );
}
   
export default ProductsScreen