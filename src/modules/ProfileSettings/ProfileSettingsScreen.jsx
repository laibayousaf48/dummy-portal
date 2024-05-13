import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextInputField from "../../components/basic/TextInputField";
import Map from "../../components/basic/Map";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase_service from "../../utils/firebase_service.js";

function ProfileSettingsScreen() {
  const [selectedImage, setSelectedImage] = useState("");
  const [businessInfo, setBusinessInfo] = useState(null);
  const [formFields, setFormFields] = useState({
    email: "",
    business_name: "",
    business_phone: "",
    address: "",
    category: "",
    account_holder_name: "",
    account_number: "",
    bank_code: "",
    branch_code: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    business_name: "",
    business_phone: "",
    address: "",
    category: "",
  });
  const [error, setError] = useState("");
  const business_id = localStorage.getItem("Business ID");
console.log(business_id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger;
        const response = await axios.get(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=${business_id}`);
        const { user, business } = response.data;
        const { email } = user;
        const { phone: business_number, name: business_name, category, address, avatar_url, bank_details } = business;
  
        // Set business info
        setBusinessInfo({ business_name, business_number, email, address, category, avatar_url, bank_details });
        console.log("total information", response)
        if (bank_details) {
          const { account_holder_name, account_number, bank_code, branch_code } = bank_details;
          setFormFields({
            business_name,
            business_phone: business_number,
            email,
            address,
            category,
            account_holder_name: account_holder_name || "NA",
            account_number: account_number || "NA",
            bank_code: bank_code || "NA",
            branch_code: branch_code || "NA"
          });
          console.log("Bank details set in formFields:", bank_details);
        } else {
          setFormFields({
            business_name,
            business_phone: business_number,
            email,
            address,
            category,
            account_holder_name: "",
            account_number: "",
            bank_code: "",
            branch_code: ""
          });
          console.log("Bank details not available in response.");
        }
  
        console.log("Response for GET request:", response);
      } catch (error) {
        console.error('API error:', error);
      }
    };
  
    fetchData();
  }, [business_id]);

  const handleIconClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; 
        fileInput.onchange = (e) => {
          const file = e.target.files[0];
          console.log('Selected file:', file);
          const url = URL.createObjectURL(file);
          console.log('Selected image URL:', url); 
          setSelectedImage(URL.createObjectURL(file)); 
          const fd = new FormData(); 
          setBusinessInfo({...businessInfo, avatar_url: URL.createObjectURL(file)})
          firebase_service.uploadFileOnFirebase({
            file, 
            filename: file.name
          }).then(fileUrl => {
            try {
              fd.append('avatar_url', fileUrl);
              const response = fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=${business_id}`, {
                method: 'POST',
                body: fd
              });
              // const data = response.json(); 
              // console.log('API image update:', data.message);
              console.log('API image update:', response.url);
              toast.success("Image updated Successfully");
            // setTimeout(function(){ location.reload(); }, 5000);
      
              setFormErrors({
                email: "",
                password: null,
                cpassword: null,
                business_name: "",
                business_phone: "",
                api: null,
              });
              setError(null);
            } catch (error) {
              console.error('API error:', error);
              setFormErrors((old) => ({ ...old, api: 'Failed to send data to the server.' }));
              setError('Failed to send data to the server.');
            }
          })
          
        };
        fileInput.click();
      };
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = new FormData()
          data.append('business_name', formFields.business_name)
          data.append('business_phone', formFields.business_phone)
          data.append('email', formFields.email)
          data.append('address', formFields.address)
          data.append('category', formFields.category)
    
          const response = fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=${business_id}`, {
            method: 'POST',
            body: data
          }).then(res => res.json())
      
          console.log('API form update:', response);
          setTimeout(function(){ location.reload(); }, 5000);
          toast.success("Profile Updated Successfully");
          setFormErrors({
            email: "",
            business_name: "",
            business_phone: "",
            address:"",
            category:"",
            api: null,
          });
          setError(null);
        } catch (error) {
          console.error('API error:', error);
          setFormErrors((old) => ({ ...old, api: 'Failed to send data to the server.' }));
          setError('Failed to send data to the server.');
        }
      };
    

  return (
    <DashboardTemplate pageTitle={"Profile Settings"}>
      <div>
        <section className="text-gray-600 body-font bg-white">
          <div className="container px-5 py-24 mx-auto flex flex-col">
            <div className="lg:w-full mx-auto">
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    {businessInfo && businessInfo.avatar_url ? (
                      <img src={businessInfo.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <div className="w-12 h-1 bg-gray-500 rounded mt-2 mb-4"></div>
                  </div>
                  <button onClick={handleIconClick} className="focus:outline-none">Edit Profile Picture</button>
                      {/* <div className="flex flex-row justify-center"> */}
                      <div className="mt-8 container overflow-hidden ml-2" style={{width: '100%', height: '50%'}}>
                        <Map/>
                      </div>
                      {/* </div> */}
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div className="flex flex-row h-screen bg-white">
                    <div className="w-full h-screen pt-5 mt-10">
                      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-5 gap-2 py-[3%] h-[70vh] justify-center flex flex-col">
                        {/* <div className="text-[40px] text-[#333333] mt-[16px] justify-center text-center">Update Profile</div> */}
                        <div className="mt-[16px]">
                          <TextInputField
                            type={"email"}
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Email"
                            className="mb-0"
                            onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                            value={formFields.email}
                            error={formErrors.email}
                            isRequired={true}
                            placeholder={"Type your Email"}
                          />
                        </div>
                        <div className="mt-[0]">
                          <TextInputField
                            type={"text"}
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Business Name"
                            onChange={(e) => setFormFields({ ...formFields, business_name: e.target.value })}
                            value={formFields.business_name}
                            error={formErrors.business_name}
                            isRequired={true}
                            placeholder={"Type your Business Name"}
                          />
                        </div>
                        <div className="mt-[0]">
                          <TextInputField
                            type={"number"}
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Business Phone"
                            className="mb-0"
                            onChange={(e) => setFormFields({ ...formFields, business_phone: e.target.value })}
                            value={formFields.business_phone}
                            error={formErrors.business_phone}
                            isRequired={true}
                            placeholder={"03** *******"}
                          />
                        </div>
                        <div className="mt-[0]">
                          <TextInputField
                            type="text"
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Business Address"
                            onChange={(e) => setFormFields({ ...formFields, address: e.target.value })}
                            value={formFields.address}
                            error={formErrors.address}
                            isRequired={true}
                            placeholder={"Address"}
                          />
                        </div>
                        <div className="mt-[0]">
                          <TextInputField
                            type="text"
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Business Category"
                            onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                            value={formFields.category}
                            error={formErrors.category}
                            isRequired={true}
                            placeholder={"Category"}
                          />
                        </div>
                        {/* <div>Bank Details</div> */}
                        <div className="mt-[0]">
                          <TextInputField
                            type="text"
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Account Holder Name"
                            onChange={(e) => setFormFields({ ...formFields, account_holder_name: e.target.value })}
                            value={formFields.account_holder_name}
                            error={formErrors.account_holder_name}
                            isRequired={true}
                            placeholder={"Account holder name"}
                          />
                        </div>
                        <div className="mt-[0]">
                          <TextInputField
                            type={"number"}
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Account Number"
                            className="mb-0"
                            onChange={(e) => setFormFields({ ...formFields, account_number: e.target.value })}
                            value={formFields.account_number}
                            error={formErrors.account_number}
                            isRequired={true}
                            placeholder={"*******"}
                          />
                        </div>
                        <div className="mt-[0]">
                          <TextInputField
                            type={"number"}
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Bank Code"
                            className="mb-0"
                            onChange={(e) => setFormFields({ ...formFields, bank_code: e.target.value })}
                            value={formFields.bank_code}
                            error={formErrors.bank_code}
                            isRequired={true}
                            placeholder={"*******"}
                          />
                        </div>
                        <div className="mt-[0]">
                          <TextInputField
                            type={"number"}
                            style={{ width: "w-full", labelFontSize: "text-[27px]", inputFontSize: "text-[22px]" }}
                            label="Branch Code"
                            className="mb-0"
                            onChange={(e) => setFormFields({ ...formFields, branch_code: e.target.value })}
                            value={formFields.branch_code}
                            error={formErrors.branch_code}
                            isRequired={true}
                            placeholder={"*******"}
                          />
                        </div>
                        <p className="my-1 text-sm text-primary pl-4">{error}</p>
                        <button className="w-full h-[56px] bg-[#1FA3DB] text-[16px] p-4 rounded-md text-white hover:bg-[#a2dbf3] mb-8">
                           Update
                          </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </DashboardTemplate>
  );
}

export default ProfileSettingsScreen;
