import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfileSettingsScreen() {
  const [businessInfo, setBusinessInfo] = useState(null);
  const handleSubmit = async () => {
    try {
      const response = await axios.get('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d', {

      });
  
      console.log('API response:', response.data);
      let business_name = response.data.user.full_name;
      let business_number = response.data.business.number;
      let address = response.data.user.address;
      let category = response.data.business.category;
      let email = response.data.user.email;
      // const { full_name, number, address, category, email } = response.data;
      // setBusinessInfo({
      //   business_name: full_name,
      //   business_number: number,
      //   email: email,
      //   address: address,
      //   category: category
      // });

      setError(null);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  useEffect(() => {
    console.log('Hello, world!');
handleSubmit();
  }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=6604a786bc60ff8cf57c1f5d');
//       console.log('API response:', response.data);
//       const { full_name, number, address, category, email } = response.data.user;
//       setBusinessInfo({ business_name: full_name, business_number: number, email, address, category });
//       setError(null);
//     } catch (error) {
//       console.error('API error:', error);
//       setError('Failed to fetch data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchData();
// }, []);

  const handleIconClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; 
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      console.log('Selected file:', file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    };
    fileInput.click();
  };


  
  return (  
    <DashboardTemplate pageTitle={"Profile Settings"}>
<div><section class="text-gray-600 body-font bg-white">
  <div class="container px-5 py-24 mx-auto flex flex-col">
    <div class="lg:w-full mx-auto">
      <div class="flex flex-col sm:flex-row mt-10">
        <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
             <button onClick={handleIconClick} className="focus:outline-none">
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
    </button>
          </div>
          <div class="flex flex-col items-center text-center justify-center">
            <div class="w-12 h-1 bg-gray-500 rounded mt-2 mb-4"></div>
          </div>
        </div>
        <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Name: </h2>
          <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Number:</h2>
          <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Email:</h2>
          <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Address:</h2>
          <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Category:</h2>
           {/* <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Name: {businessInfo.business_name}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Number: {businessInfo.business_number}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Email: {businessInfo.email}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Address: {businessInfo.address}</h2>
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Business Category</h2> */}

          <button 
          className="bg-gry-300 inline-flex items-center">Update
          </button>
        </div>
      </div>
    </div>
  </div>
</section></div>

    </DashboardTemplate>
  );
}

export default ProfileSettingsScreen;