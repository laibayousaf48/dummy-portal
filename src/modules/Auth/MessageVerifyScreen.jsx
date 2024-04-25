import { useEffect, useState } from "react";
import TextInputField from "../../components/basic/TextInputField";
import AppImages from "../../assets/images";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function MessageVerifyScreen(){
   
  const navigate = useNavigate(); 
  let { number } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    AppImages.img1,
    AppImages.img2,
  ];
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentImageIndex((prevIndex) =>
         prevIndex === images.length - 1 ? 0 : prevIndex + 1
       );
     }, 2000); 

     return () => clearInterval(interval); 
   }, [images]);
  const [formFields, setFormFields] = useState({
  
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: "",
  });
  const [error, setError] = useState("");
  // const [showLoader, setShowLoader] = useState(false);
   const [isHovered, setIsHovered] = useState(false);

   const buttonClass = isHovered
     ? "w-1/2 h-[56px] mt-5 bg-[#1FA3DB] text-[18px] rounded-md text-white"
     : "w-1/2 h-[56px] mt-5 bg-white text-[#1FA3DB] rounded-md text-[18px] text-[#1FA3DB] border-b-2 hover:border-transparent hover:bg-transparent"
     ;

  const userEmail = localStorage.getItem('userEmail');
  const registrationData = localStorage.getItem('registrationData');
  console.log("reg data", registrationData)
  const getData = JSON.parse(registrationData);
  const phoneNumber = getData.b_phone
  const phone = phoneNumber.replace(/\+/g, '').trim();
  const c_code = getData.c_code;
  console.log("phone", phone, c_code)
 useEffect(() => {
    const generateOTP = async () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("pin code:", otp)
    localStorage.setItem("OTP", otp);
    const fd = new FormData();
    fd.append("phone", phone);
    fd.append("countryCode", c_code)
    fd.append("pinCode", otp);
    fd.append("priority", "normal");
  
    try {
      const response = await fetch('https://crm.onecallapp.com/api/onecallapp/send-otp-sms', {
        method: 'POST',
        body: fd,
      }).then(res => res.text());
      console.log('API response:', response);
      toast.success("OTP sent successfully!");
      setFormErrors({ password: null, api: null });
      setError(null);
    } catch (error) {
      console.error('API error:', error.response);
      setFormErrors((old) => ({ ...old, api: 'Failed to send password data.'}));
      setError('Failed to send password data.');
    }
  };
  generateOTP(); 
}, []); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//  const userEmail = localStorage.getItem('userEmail');
// // debugger;
//   console.log("handleSubmit clicked", userEmail)
//     const otp = localStorage.getItem("OTP");
//     if (formFields.password.toString().trim().length === 0) {
//       setFormErrors((old) => ({ ...old, password: "Password is required" }
//     ));
//       return; 
//     }else if(otp === formFields.password){
//       console.log("Right Password")
//       const data = userEmail;
//       // debugger;
//       try {
//       const response = fetch('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/verify-email',{
//         method: 'POST',
//         body: data,
//       }).then(res => res.json());

//         console.log('API response:', response.data);
//         toast.success('Verification successful!');
//         navigate('/');
//         setFormErrors({api: null });
//         setError(null);
//       } catch (error) {
//         toast.failure("Error occured")
//         console.error('API error:', error.response);
//         setFormErrors((old) => ({ ...old, api: 'Failed to send password data.' }));
//         setError('Failed to send password data.');
//       }
//     }else{
//     //   toast.failure("Enter Right OTP");
//       console.log("Enter Right OTP");
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    const otp = localStorage.getItem("OTP");
  
    if (formFields.password.toString().trim().length === 0) {
      setFormErrors((old) => ({ ...old, password: "Password is required" }));
      return; 
    } else if (otp === formFields.password) {
      console.log("Right Password");
  
      try {
        // First API call to verify email
        const verifyEmailResponse = await fetch('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: userEmail
        });
        
        const verifyEmailData = await verifyEmailResponse.json();
        console.log('Verify Email API response:', verifyEmailData);
  
        if (verifyEmailData.message === "Email Verified Success") {
          console.log("Email verification successful");
  const Regdata = localStorage.getItem("registrationData")
  const data = JSON.parse(Regdata)
  console.log("registrationdata", data.b_name)
          const registerUserResponse = await fetch('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/api/business-portal/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              business_name: data.b_name, 
              business_phone: data.b_phone,
              password: data.password,
              email: data.userEmail,
            })
          });
          
          const registerUserData = await registerUserResponse.json();
          console.log('Register User API response:', registerUserData);
          if(registerUserData.message === "Registration successful with unverified email"){
            toast.success('Registration successful!');
            navigate('/');
          }
        } else {
          console.log("Email verification failed");
          toast.failure('Email verification failed');
        }
  
        // Reset form errors and error state
        setFormErrors({ api: null });
        setError(null);
      } catch (error) {
        // Handle API call errors
        toast.failure("Error occurred");
        console.error('API error:', error);
        
        // Update form errors and error state
        setFormErrors((old) => ({ ...old, api: 'Failed to register user.' }));
        setError('Failed to register user.');
      }
    } else {
      console.log("Enter Right OTP");
      toast.failure("Enter Right OTP");
    }
  };
  
  return (
    <div>
      <div className="flex flex-row h-screen bg-white">
        <div className="w-[50%] h-screen pt-5 ">
          <h1 className="text-center mt-9 mb-2 text-[45px] tracking-tight font-bold font-sans2 text-black">
          </h1>
          <h4 className="text-center mt-1 mb-2 text-[22px] tracking-tight font-bold font-sans2 text-black">
          </h4>
          <form
            // onSubmit={handleSubmit}
            className="max-w-md mx-auto my-5 gap-2 py-[3%] h-[70vh] justify-between flex flex-col"
          >
            <div>
              <img
                src={AppImages.onecall}
                alt=""
                className="w-[90px] h-[91px]"
              />
              <div className="text-[47px] text-[#333333] mt-[61px]">
                Number Verification <span></span>
              </div>
              <div className="text-[16px] text-[#A9A9A9]">
                Enter 4 digit code sent to your mobile number {number}
              </div>
              <div className="text-[16px] text-[#A9A9A9]">
                Email: {userEmail}
              </div>
              <div className="mt-[41px]">
                <TextInputField
                  type="password"
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const onlyNumbers = /^[0-9]*$/;
                    if (inputValue.length <= 4 && onlyNumbers.test(inputValue)) {
                      setFormFields({ ...formFields, password: inputValue });
                      setFormErrors({ ...formErrors, password: '' });
                    } else {
                      setFormErrors({ ...formErrors, password: 'Please enter exactly 4 digits.' });
                    }
                  }}
                  value={formFields.password}
                  error={formErrors.password}
                  isRequired={true}
                  placeholder={"* * * *"}
                />
              </div>

              <p className="my-1 text-sm text-primary pl-4">{error}</p>
              <div>
              <button onClick={handleSubmit} className="w-full h-[56px] bg-[#1FA3DB] text-[18px] rounded-md text-white hover:bg-[#b6ddee] mt-4">
                Verify
              </button>
              </div>
            
            </div>
          </form>
        </div>
        <div className="w-[50%] h-screen border-[1px] py-[5%] pl-[100px] border-gray-300 bg-[#1FA3DB] relative">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex}`}
            />
            
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    );
}

export default MessageVerifyScreen;
