// import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ProfileSettingsScreen() {
//   const [businessInfo, setBusinessInfo] = useState(null);
//   const handleSubmit = async () => {
//     try {
//       const response = await axios.get('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d', {

//       });
  
//       console.log('API response:', response.data);
//       const business_name = response.data.user.full_name;
//       let business_number = response.data.business.phone;
//       let address = response.data.user.address;
//       let category = response.data.business.category;
//       let email = response.data.user.email;
//       document.querySelector('.business-name').innerText = `Business Name: ${business_name}`;
//       // console.log(business_name, business_number,address, category, email)
//       // const { full_name, number, address, category, email } = response.data;
//       // setBusinessInfo({
//       //   business_name: full_name,
//       //   business_number: number,
//       //   email: email,
//       //   address: address,
//       //   category: category
//       // });

//       // setError(null);
//     } catch (error) {
//       console.error('API error:', error);
//     }
//   };

//   useEffect(() => {
//     console.log('Hello, world!');
// handleSubmit();
//   }, []);

// // useEffect(() => {
// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d');
// //       console.log('API response:', response.data);
// //       const { full_name, number, address, category, email } = response.data.user;
// //       setBusinessInfo({ business_name: full_name, business_number: number, email, address, category });
// //       setError(null);
// //     } catch (error) {
// //       console.error('API error:', error);
// //       setError('Failed to fetch data');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   fetchData();
// // }, []);

//   const handleIconClick = () => {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = 'image/*'; 
//     fileInput.onchange = (e) => {
//       const file = e.target.files[0];
//       console.log('Selected file:', file);
//       if (onFileSelect) {
//         onFileSelect(file);
//       }
//     };
//     fileInput.click();
//   };


  
//   return (  
//     <DashboardTemplate pageTitle={"Profile Settings"}>
// <div><section class="text-gray-600 body-font bg-white">
//   <div class="container px-5 py-24 mx-auto flex flex-col">
//     <div class="lg:w-full mx-auto">
//       <div class="flex flex-col sm:flex-row mt-10">
//         <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
//           <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
//              <button onClick={handleIconClick} className="focus:outline-none">
//       <svg
//         fill="none"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         className="w-10 h-10"
//         viewBox="0 0 24 24"
//       >
//         <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
//         <circle cx="12" cy="7" r="4"></circle>
//       </svg>
//     </button>
//           </div>
//           <div class="flex flex-col items-center text-center justify-center">
//             <div class="w-12 h-1 bg-gray-500 rounded mt-2 mb-4"></div>
//           </div>
//         </div>
//         <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
//           <h2 class="font-medium title-font mt-4 text-gray-900 text-lg business_name">Business Name: </h2>
//           <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Number:</h2>
//           <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Email:</h2>
//           <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Address:</h2>
//           <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Category:</h2>
//            {/* <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Name: {businessInfo.business_name}</h2>
//                   <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Number: {businessInfo.business_number}</h2>
//                   <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Email: {businessInfo.email}</h2>
//                   <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Address: {businessInfo.address}</h2>
//                   <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Category</h2> */}

//           <button 
//           className="bg-gry-300 inline-flex items-center">Update
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </section></div>

//     </DashboardTemplate>
//   );
// }

// export default ProfileSettingsScreen;




import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextInputField from "../../components/basic/TextInputField";
import AppImages from "../../assets/images";

function ProfileSettingsScreen() {
  const [selectedImage, setSelectedImage] = useState("");
  const [businessInfo, setBusinessInfo] = useState(null);
  const [formFields, setFormFields] = useState({
    email:"",
    business_name: "",
    business_phone:"",
    address: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({
    email:"",
    business_name:"",
    business_phone:"",
    address:"",
    category:"",
  });
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d');
        console.log('API response:', response.data);
        const { user, business } = response.data;
        const {address } = user;
        const { phone: business_number, name: business_name, category, email, avatar_url} = business;
        setBusinessInfo({ business_name, business_number, email, address, category, avatar_url });
      } catch (error) {
        console.error('API error:', error);
      }
    };

    fetchData();
  }, []);

  // const handleIconClick = () => {
  //   const fileInput = document.createElement('input');
  //   fileInput.type = 'file';
  //   fileInput.accept = 'image/*'; 
  //   fileInput.onchange = (e) => {
  //     const file = e.target.files[0];
  //     console.log('Selected file:', file);
  //     debugger;
  //     setSelectedImage(URL.createObjectURL(file)); // Display selected image
  //     const url = URL.createObjectURL(file)
  //     console.log('Selected image URL:', url); // Log selected image URL
  //     const fd = new FormData()
  //     fd.append('business_name', formFields.business_name)
  //     fd.append('business_phone', formFields.business_phone)
  //     fd.append('email', formFields.email)
  //     fd.append('address', formFields.address)
  //     fd.append('category', formFields.category)
  //     fd.append(avatar_url, url)

  //     try{
  //       const response = fetch('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d', {
  //         method: 'POST',
  //         body: fd
  //       }).then(res => res.json())
  //     }catch(error){

  //     }
  //   };
  //   fileInput.click();
  // };
  
  const handleIconClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; 
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      console.log('Selected file:', file);
      setSelectedImage(URL.createObjectURL(file)); // Display selected image
      const url = URL.createObjectURL(file);
      console.log('Selected image URL:', url); // Log selected image URL
      const fd = new FormData();
      // fd.append('business_name', formFields.business_name);
      // fd.append('business_phone', formFields.business_phone);
      // fd.append('email', formFields.email);
      // fd.append('address', formFields.address);
      // fd.append('category', formFields.category);
      fd.append('avatar_url', url); 
  
      try {
        const response = await fetch('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d', {
          method: 'POST',
          body: fd
        });
        const data = await response.json();
        console.log('API image update:', data.message);
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

      const response = fetch('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d', {
        method: 'POST',
        body: data
      }).then(res => res.json())
  
      console.log('API form update:', response);
      // fetchData();
      setTimeout(function(){ location.reload(); }, 5000);
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
      // Handle API error by setting appropriate form errors or error state
      setFormErrors((old) => ({ ...old, api: 'Failed to send data to the server.' }));
      setError('Failed to send data to the server.');
    }
  };

  return (  
    <DashboardTemplate pageTitle={"Profile Settings"}>
      <div>
        <section class="text-gray-600 body-font bg-white">
          <div class="container px-5 py-24 mx-auto flex flex-col">
            <div class="lg:w-full mx-auto">
              <div class="flex flex-col sm:flex-row mt-10">
                <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                {/* <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                {selectedImage ? (
                     <img src={selectedImage} alt="Selected" className="w-full h-full rounded-full object-cover" />
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
               </div> */}
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

                  <div class="flex flex-col items-center text-center justify-center">
                    <div class="w-12 h-1 bg-gray-500 rounded mt-2 mb-4"></div>
                  </div>
                  <button onClick={handleIconClick} className="focus:outline-none">Edit Profile Picture</button>

                </div>
                <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg business_name">Business Name:&nbsp; {businessInfo && businessInfo.business_name}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Number:&nbsp; {businessInfo && businessInfo.business_number}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Email:&nbsp; {businessInfo && businessInfo.email}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Address:&nbsp; {businessInfo && businessInfo.address}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Category:&nbsp; {businessInfo && businessInfo.category}</h2>
                  {/* <button className="bg-gray-500 flex items-center mt-8 pl-5 pr-5 pt-2 pb-2 text-white float-right mr-20 border rounded">Update</button> */}
                </div>
              </div>
            </div>
          </div>
          <div>


      <div className="flex flex-row h-screen bg-white">
        <div className="w-full h-screen pt-5">
          <h1 className="text-center mt-9 mb-2 text-[45px] tracking-tight font-bold font-sans2 text-black">
            {/* {data.web_title} */}
          </h1>
          <h4 className="text-center mt-1 mb-2 text-[22px] tracking-tight font-bold font-sans2 text-black">
            {/* {data.candidate_name} */}
          </h4>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto my-5 gap-2 py-[3%] h-[70vh] justify-center flex flex-col"
          >
            <div>
              {/* <img
                src={AppImages.onecall}
                alt=""
                className="w-[90px] h-[91px]"
              /> */}

              <div className="text-[40px] text-[#333333] mt-[16px] justify-center text-center">
                Update Profile
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
              <div className="mt-[16px]">
                <TextInputField
                  type={"text"}
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Business Name"
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
              <div className="mt-[16px]">
                <TextInputField
                  type="text"
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Business Address"
                  onChange={(e) => {
                   
                    setFormFields((old) => ({
                      ...old,
                      address: e?.target.value,
                    }));
                  }}
                  value={formFields.address}
                  error={formErrors.address}
                  isRequired={true}
                  placeholder={"Address"}
                />
              </div>
              <div className="mt-[16px]">
                <TextInputField
                  type="text"
                  style={{
                    width: "w-full",
                    labelFontSize: "text-[27px]",
                    inputFontSize: "text-[22px]",
                  }}
                  label="Business Category"
                  onChange={(e) => {
                    setFormFields((old) => ({
                      ...old,
                      category: e?.target.value,
                    }));
                  }}
                  value={formFields.category}
                  error={formErrors.category}
                  isRequired={true}
                  placeholder={"Category"}
                />
              </div>
              
              <p className="my-1 text-sm text-primary pl-4">{error}</p>

              <button className="w-full h-[56px] bg-[#1FA3DB] text-[16px] rounded-md text-white hover:bg-[#a2dbf3]  mt-4">
               Update
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>

        </section>
      </div>
    </DashboardTemplate>
  );
}

export default ProfileSettingsScreen;