import { useEffect, useState } from "react";
import TextInputField from "../../components/basic/TextInputField";
import AppImages from "../../assets/images";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function VerifyScreen() {
  const navigate = useNavigate(); 
  let { number } = useParams();
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

  // const handleSubmit = (e) => {
  //   console.log("data", formFields.password);
  //   e.preventDefault();
  //   let hasErrors = false;
    
  //   if (formFields.password.toString().trim().length === 0) {
  //     setFormErrors((old) => ({ ...old, password: "Password is required" }));
  //     hasErrors = true;
  //   }
  //   if (hasErrors) {
  //     return;
  //   }
  //   // setShowLoader(true);
  //   setFormErrors({ password: null, api: null });
  //   setError(null);
    
  // };
 const userEmail = localStorage.getItem('userEmail');
 const generateOTP = async()=>{
 const userEmail = localStorage.getItem('userEmail');
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log("OTP:", otp)
  localStorage.setItem("OTP", otp);
try {
  const response = await axios.post('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/api/otp-email', {
  email: userEmail,
  otp: otp,
  });
  console.log('API response:', response.data.message);


  setFormErrors({ password: null, api: null });
  setError(null);
} catch (error) {
  console.error('API error:', error.response);
  setFormErrors((old) => ({ ...old, api: 'Failed to send password data.' }));
  setError('Failed to send password data.');
}
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
 const userEmail = localStorage.getItem('userEmail');

  console.log("handleSubmit clicked", userEmail)
    // Check if the password is empty
    const otp = localStorage.getItem("OTP");
    if (formFields.password.toString().trim().length === 0) {
      setFormErrors((old) => ({ ...old, password: "Password is required" }
    
    ));
      return; 
    }else if(otp === formFields.password){
      console.log("Right Password")
      try {
        // Make the API request to send password data
        const response = await axios.post('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/verify-email', {
          email: userEmail,
        },
        {headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }}
      );
        console.log('API response:', response.data);
        navigate('/');
        setFormErrors({api: null });
        setError(null);
      } catch (error) {
        console.error('API error:', error.response);
        setFormErrors((old) => ({ ...old, api: 'Failed to send password data.' }));
        setError('Failed to send password data.');
      }
    }else{
      console.log("Enter right OTP");
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
                  // label="* * * *"
                  // onChange={(e) => {
                  //   // setFormErrors((old) => ({ ...old, password: null }));
                  //   setFormFields((old) => ({
                  //     ...old,
                  //     password: e?.target.value,
                  //   }));
                  // }}
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
              {/* {formErrors.password && ( */}
              <p className="my-1 text-sm text-primary pl-4">{error}</p>
              {/* )} */}
              <div>
              <button onClick={generateOTP} className="w-1/2 h-[56px] bg-[#1FA3DB] text-[18px] rounded-md text-white hover:bg-[#b6ddee] mt-4">
                Send OTP
              </button>

              <button
                className={buttonClass}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleSubmit}
              >
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
      {/* )}
        </div> */}
      {/* )} */}
    </div>
  );
}

export default VerifyScreen;
