import { useEffect, useState } from "react";
import axios from 'axios';

import TextInputField from "../../components/basic/TextInputField";
import AppImages from "../../assets/images";


function SignupScreen() {
 
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const images = [
     AppImages.img1,
     AppImages.img2,
     // Add more image URLs here
   ];
   useEffect(() => {
     const interval = setInterval(() => {
       // Increment the index to show the next image
       setCurrentImageIndex((prevIndex) =>
         prevIndex === images.length - 1 ? 0 : prevIndex + 1
       );
     }, 2000); // Change image every 1 second

     return () => clearInterval(interval); // Cleanup on component unmount
   }, [images]);
  const [formFields, setFormFields] = useState({
    // userName: "",
    email:"",
    // mobile: "",
    password: "",
    cpassword:"",
    business_name: "",
    business_phone:"",
  });
  const [formErrors, setFormErrors] = useState({
    // userName: "",
    email:"",
    // mobile: "",
    password: "",
    cpassword:"",
    business_name:"",
    business_phone:"",
  });
  const [error, setError] = useState("");
  // const [showLoader, setShowLoader] = useState(false);

  // const handleSubmit = (e) => {
  //    const password = formFields.password;
  //    const confirmPassword = formFields.cpassword;

  //    if (password !== confirmPassword) {
  //      alert(
  //        "Password and Confirm Password do not match. Please enter the same password."
  //      );
  //      return; // Exit the function early
  //    }
  //   console.log(
  //     "data",
  //     formFields.userName,
  //     formFields.email,
  //     formFields.mobile,
  //     formFields.password,
  //     formFields.cpassword,
  //     formFields.businessName,
  //     formFields.businessPhone,
  //   );
    
  //   e.preventDefault();
  //   let hasErrors = false;
   
  //   if (formFields.password.toString().trim().length === 0) {
  //     setFormErrors((old) => ({ ...old, password: "Password is required" }));
  //     hasErrors = true;
  //   }
  //   if (hasErrors) {
  //     return;
  //   }
    
  //   setFormErrors({ userName: null, email:"", mobile: null, password: null,cpassword: null, businessName:"", businessPhone:"", api: null });
  //   setError(null);
    
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const password = formFields.password;
    const confirmPassword = formFields.cpassword;
  
    if (password !== confirmPassword) {
      alert(
        "Password and Confirm Password do not match. Please enter the same password."
      );
      return; // Exit the function early
    }
  debugger;
    try {
      const response = await axios.post('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/register', {
        business_name: formFields.business_name, 
        email: formFields.email,
        password: formFields.password,
        business_phone: formFields.business_phone,
      });
  
      console.log('API response:', response.data);
    console.log('userEmail', formFields.email)
    const userEmail = formFields.email;
    localStorage.setItem('userEmail', userEmail);
      // Reset formErrors and setError if the request is successful
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
      // Handle API error by setting appropriate form errors or error state
      setFormErrors((old) => ({ ...old, api: 'Failed to send data to the server.' }));
      setError('Failed to send data to the server.');
    }
  };

  return (
    <div>
      <div className="flex flex-row h-screen bg-white">
        <div className="w-[50%] h-screen pt-5 ">
          <h1 className="text-center mt-9 mb-2 text-[45px] tracking-tight font-bold font-sans2 text-black">
            {/* {data.web_title} */}
          </h1>
          <h4 className="text-center mt-1 mb-2 text-[22px] tracking-tight font-bold font-sans2 text-black">
            {/* {data.candidate_name} */}
          </h4>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto my-5 gap-2 py-[3%] h-[70vh] justify-between flex flex-col"
          >
            <div>
              <img
                src={AppImages.onecall}
                alt=""
                className="w-[90px] h-[91px]"
              />

              <div className="text-[47px] text-[#333333] mt-[16px]">
                Register
              </div>

              {/* <div className="mt-[16px]">
                <TextInputField
                  type={"text"}
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="User Name"
                  onChange={(e) => {
                    // setFormErrors((old) => ({ ...old, email: null }));
                    setFormFields((old) => ({
                      ...old,
                      userName: e?.target?.value,
                    }));
                  }}
                  value={formFields.userName}
                  error={formErrors.userName}
                  isRequired={true}
                  placeholder={"Type your name"}
                />
              </div> */}
              <div className="mt-[16px]">
                <TextInputField
                  type={"email"}
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Email"
                  onChange={(e) => {
                    // setFormErrors((old) => ({ ...old, email: null }));
                    setFormFields((old) => ({
                      ...old,
                      email: e?.target?.value,
                    }));
                  }}
                  value={formFields.email}
                  error={formErrors.email}
                  isRequired={true}
                  placeholder={"Type your Email"}
                />
              </div>
              {/* <div className="mt-[16px]">
                <TextInputField
                  type={"number"}
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Mobile Number"
                  onChange={(e) => {
                    // setFormErrors((old) => ({ ...old, email: null }));
                    setFormFields((old) => ({
                      ...old,
                      mobile: e?.target?.value,
                    }));
                  }}
                  value={formFields.mobile}
                  error={formErrors.mobile}
                  isRequired={true}
                  placeholder={"03** *******"}
                />
              </div>
              {formErrors.mobile && (
                <p className="my-1 text-sm text-primary pl-4">{error}</p>
              )} */}
              <div className="mt-[16px]">
                <TextInputField
                  type="password"
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Password"
                  onChange={(e) => {
                    // setFormErrors((old) => ({ ...old, password: null }));
                    setFormFields((old) => ({
                      ...old,
                      password: e?.target.value,
                    }));
                  }}
                  value={formFields.password}
                  error={formErrors.password}
                  isRequired={true}
                  placeholder={"********"}
                />
              </div>
              <div className="mt-[16px]">
                <TextInputField
                  type="password"
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Confirm Password"
                  onChange={(e) => {
                    // setFormErrors((old) => ({ ...old, password: null }));
                    setFormFields((old) => ({
                      ...old,
                      cpassword: e?.target.value,
                    }));
                  }}
                  value={formFields.cpassword}
                  error={formErrors.cpassword}
                  isRequired={true}
                  placeholder={"********"}
                />
              </div>
              <div className="mt-[16px]">
                <TextInputField
                  type={"text"}
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Business Name"
                  // onChange={(e) => {
                  //   // setFormErrors((old) => ({ ...old, email: null }));
                  //   setFormFields((old) => ({
                  //     ...old,
                  //     business_name: e?.target?.value,
                  //   }));
                  // }}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^[A-Za-z]+$/;
                    if (inputValue === '' || regex.test(inputValue) || inputValue === '') {
                      setFormFields((old) => ({
                        ...old,
                        business_name: inputValue,
                      }));
                    }
                  }}
                  
                  value={formFields.business_name}
                  error={formErrors.business_name}
                  isRequired={true}
                  placeholder={"Type your Business Name"}
                />
              </div>
              <div className="mt-[16px]">
                <TextInputField
                  type={"number"}
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Business Phone"
                  // onChange={(e) => {
                  //   // setFormErrors((old) => ({ ...old, email: null }));
                  //   setFormFields((old) => ({
                  //     ...old,
                  //     business_phone: e?.target?.value,
                  //   }));
                  // }}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^[0-9]+$/;
                    if (regex.test(inputValue) && inputValue.length <= 11) {
                      setFormFields((old) => ({
                        ...old,
                        business_phone: inputValue,
                      }));
                    }
                  }}
                  value={formFields.business_phone}
                  error={formErrors.business_phone}
                  isRequired={true}
                  placeholder={"03** *******"}
                />
              </div>
              <p className="my-1 text-sm text-primary pl-4">{error}</p>

              <button className="w-full h-[56px] bg-[#1FA3DB] text-[16px] rounded-md text-white hover:bg-[#a2dbf3]  mt-4">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="w-[50%] h-screen border-[1px] py-[5%] pl-[100px] border-gray-300 bg-[#1FA3DB] relative">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex}`}
              className="w-[298px] h-[506px]"
            />
          </div>
        </div>
      </div>
      {/* )}
        </div> */}
      {/* )} */}
    </div>
  );
}

export default SignupScreen;
