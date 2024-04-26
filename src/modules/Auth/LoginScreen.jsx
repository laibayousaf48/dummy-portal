import { useContext, useEffect, useState } from "react";
import TextInputField from "../../components/basic/TextInputField";
import AppImages from "../../assets/images";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
// import axios from "axios";
import { ProgressBar,DNA } from 'react-loader-spinner'

function LoginScreen() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    AppImages.img1, AppImages.img2
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
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  
  function handleSubmit(e) {
    console.log("data", formFields.email, formFields.password);
    e.preventDefault();
    let hasErrors = false;
    if (formFields.password.toString().trim().length === 0) {
      setFormErrors((old) => ({ ...old, password: "Password is required" }));
      hasErrors = true;
    }
    if (hasErrors) {
      return;
    }
    setFormErrors({ email: null, password: null, api: null });
    setError(null);
    setIsLoading(true)
    axios.post(
      `https://7b7xlap5jvkahyo5himfrzqy640qnadr.lambda-url.eu-west-1.on.aws/auth/login`,
      { email: formFields.email, password: formFields.password }
    ).then(res => {
      if(res.data?.status == 200) {
        const {token, user} = res.data?.data 
        const business = res.data.data.business // i have removes curly brckets around business
        //  console.log("response", res.data.data.business)
        authCtx.login(token, user, location.state?.from,business);
        const business_id = res.data.data.business._id;
        console.log(business_id);
        const data = res.data.data.business
        const userData = res.data.data.user;
       console.log("Response", res.data.data.business);
        localStorage.setItem("Business ID", business_id);
         localStorage.setItem("Response", JSON.stringify(data));
         localStorage.setItem("User", JSON.stringify(userData));
      } else {
        throw new Error(res.data?.message ?? "Error logging you in! Please try again")
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

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
                Sign in
              </div>

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
                  placeholder={"abcd@gmail.com"}
                />
              </div>
              {formErrors.email && (
                <p className="my-1 text-sm text-primary pl-4">{error}</p>
              )}
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
              {/* {formErrors.password && ( */}
              <p className="my-1 text-sm text-primary pl-4">{error}</p>
              {/* )} */}
              
              {/* <div className="text-[14px] text-right text-[#A9A9A9] ">
                <span className="underline cursor-pointer hover:text-[#605e5e]">
                  {" "}
                  Forgot Password
                </span>
              </div> */}

              {/* <Link to={`/verify/${formFields.mobile}`}> */}
                <button className="w-full h-[56px] bg-[#1FA3DB] text-[16px] rounded-md text-white hover:bg-[#8cd2f0]  mt-4 justify-center">
                  {isLoading ? (<ProgressBar
                 visible={true}
                 height="80"
                 width="80"
                 color="#4fa94d"
                 ariaLabel="progress-bar-loading"
                 wrapperStyle={{ transform: "translateX(230%)"}}
                 wrapperClass=""
                 />):("Sign in")}
                </button>
                
                {/* <button className="w-full h-[56px] bg-[#1FA3DB] text-[16px] rounded-md text-white hover:bg-[#8cd2f0]  mt-4 justify-center">
                  {isLoading ? (<DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{ transform: "translateX(230%)", marginBottom: "4px"}}
                    wrapperClass="dna-wrapper"
                    />):("Sign in")}
                </button> */}




              {/* </Link> */}
            </div>
          </form>
          <div className="text-[16px] text-[#A9A9A9] text-center mt-[41px]">
            Don't have an account ?
            <span
              className="text-[16px] text-[#24ACE3] ml-1 cursor-pointer hover:text-[#8cd2ee]"
              onClick={(e) => {
                navigate("/signup");
              }}
            >
              Sign up
            </span>
          </div>
        </div>
        <div className="w-[50%] h-screen border-[1px] py-[5%] pl-[100px] border-gray-300 bg-[#1FA3DB] relative">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex}`}
              className="w-[298px] h-[506px]"
            />
            <div className="text-center text-[32px] text-white">
              {/* {data.web_title} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
