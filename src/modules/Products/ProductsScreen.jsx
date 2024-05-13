import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import Modal from "react-modal";
import TextInputField from "../../components/basic/TextInputField.jsx";

const ProductsScreen = () => {
    const [file, setFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const modalStyle = {
        content: {
            top: "50%",
            maxWidth: "480px",
            width: "100vw",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            // maxHeight: "100vh",
            height: "400px",
            overflowY: "auto",
            borderRadius: "18px",
            position: "relative"
        },
        overlay: {
            backgroundColor: "rgba(0,0,0, 0.5)",
        },
    };
    const [formFields, setFormFields] = useState({
        title: "",
    });
    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0])
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    // const handleUpload = async () => {
    //     debugger;
    //     if (!file) return;
    //     try {
    //         debugger;
    //         const reader = new FileReader();
    //         reader.onload = async (e) => {
    //             const data = new Uint8Array(e.target.result);
    //             const workbook = XLSX.read(data, { type: 'array' });
    //             const sheetName = workbook.SheetNames[0];
    //             const sheet = workbook.Sheets[sheetName];
    //             const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    //             console.log('Parsed Excel data:', jsonData);
    //             const response = await axios.post("api", {
    //                 data: jsonData
    //             });
    //             console.log(response.data);
    //         }
    //         reader.readAsArrayBuffer(file);
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }

    const handleUpload = async () => {
        debugger;
        if (!file) {
            console.log('Please select a file');
            return;
        }
        console.log('Uploading file...');
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                console.log('Parsed Excel data:', jsonData);
                console.log('Processing data...');
                const response = await axios.post("api", {
                    data: jsonData
                });
                console.log(response.data);
                console.log('File upload and processing complete.');
            }
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.log("Error:", error);
        }
    }
    


    const handleClick = () => {
        setIsModalOpen(true);
    }
    return (
        <DashboardTemplate pageTitle={"Products"}>
            <div className="bg-white h-screen">
            <div className='flex flex-row justify-between py-4 px-3'>
                <div></div>
                <button type="submit" className='bg-blue-500 py-2 px-4 rounded-md text-white' onClick={handleClick}>Add New Products</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                style={modalStyle}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <button
                    className="text-[20px] font-bold absolute right-6 top-[4px]"
                    onClick={closeModal}
                    aria-label="Close"
                >
                    X
                </button>
                <form
                    //   onSubmit={handleSubmit}
                    className="max-w-md mx-auto my-2 w-full h-[40vh] justify-between flex flex-col"
                >
                    <div>
                        <div className="text-[18px] text-[#24ACE3] text-center font-bold">
                            Add New Products
                        </div>
                        <div className="border-[1px] border-[#333333] opacity-20 mt-2"></div>
                        <div className="mt-[25px]">
                            <TextInputField
                                type={"text"}
                                style={{
                                    width: "w-full",
                                    labelFontSize: "text-[14px]",
                                    inputFontSize: "text-[12px]",
                                }}
                                label="Title"
                                onChange={(e) => {
                                    setFormFields((old) => ({
                                        ...old,
                                        title: e?.target?.value,
                                    }));
                                }}
                                value={formFields.title}
                                error={formFields.title ? null : ""}
                                isRequired={true}
                                placeholder={"Title"}
                            />
                            <div>
                                <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop an Excel file here, or click to select one</p>
                                </div>
                                <button onClick={handleUpload}>Upload</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            className="w-full h-[46px] mb-3 bg-[#1FA3DB] text-[14px] rounded-md text-white hover:bg-[#8cd2f0]"
                            onClick={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            Send
                        </button>
                    </div>
                </form>
            </Modal>
            </div>
        </DashboardTemplate>
    );
}

export default ProductsScreen