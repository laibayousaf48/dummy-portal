import { useEffect, useState } from "react";
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import TextInputField from "../../components/basic/TextInputField.jsx";
import { FiMapPin,FiEdit2, FiTrash2 } from "react-icons/fi";
import AppImages from "../../assets/images/index.js";
import axios from "axios";
import { LambdaAPI } from "../../LambdaAPI.js";
import firebase_service from "../../utils/firebase_service.js";
import { GrUploadOption } from "react-icons/gr";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function OffersRequestsScreen() {
  const modalStyle = {
    content: {
      top: "50%",
      maxWidth: "488px",
      width: "100vw",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "100vh",
      overflowY: "auto",
      borderRadius: "18px",
      position: "relative"
    },
    overlay: {
      backgroundColor: "rgba(0,0,0, 0.5)",
    },
  };
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  const [offerData, setOfferData] = useState([]);
  const [id, setId] = useState([]);

  const [formFields, setFormFields] = useState({
    title: "",
    message: "",
    location: "",
    state: "",
    package: "",
    duration: "",
    latitude: "",
    longitude: "",
  });
  const requiredFields = [
    "state",
    "title",
    "message",
    "location",
    "package",
    "duration",
  ];
  const [isIconClicked, setIsIconClicked] = useState(false);
  const handleIconClick = () => {
    if ("geolocation" in navigator) {
      // Request the user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Successfully obtained the location
          //  setLatitude();
          //  setLongitude(position.coords.longitude);
          setFormFields((old) => ({
            ...old,
            latitude: position.coords.latitude,
          }))
          setFormFields((old) => ({
            ...old,
            longitude: position.coords.longitude,
          }))
          setFormFields((old) => ({
            ...old,
            location: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
          }));
        },
        (err) => {
          // Handle errors
          alert(err.message);
        }
      );
    } else {
      alert("Geolocation is not available in your browser.");
    }
  };
  // const [formErrors, setFormErrors] = useState({
  //   title: "",
  //   message: "",
  //   category: "",
  // });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const closeModal = () => {
    setIsAddModalOpen(false);
  };
  const [part, setPart] = useState(1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  //   const handleSubmit = async(e) => {
  //     e.preventDefault();
  //     const emptyFields = requiredFields.filter((field) => !formFields[field]);
  //     if (emptyFields.length > 0) {
  //       alert(`Please fill in the following fields: ${emptyFields.join(", ")}`);
  //       return;
  //     }
  //     console.log("Imagesss",imageurls)
  //     const res = LambdaAPI.post("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/create-post", {
  //       category: formFields.state,
  //       title: formFields.title,
  //       message: formFields.message,
  //       location: formFields.location,
  //       lat: formFields.latitude,
  //       lng: formFields.longitude,
  //       images: imageurls,
  //     })
  //       .then((res) => {
  //         if (res.data?.status == 200) {
  //           console.log("response", res);
  //         } else {
  //           throw new Error(
  //             res.data?.message ?? "Error logging you in! Please try again"
  //           );
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         // setIsLoading(false);
  //       });
  // // console.log("Response",res);
  //     // console.log(
  //     //   "data",
  //     //   formFields.title,
  //     //   formFields.message,
  //     //   formFields.state,
  //     //   formFields.location,
  //     //   formFields.package,
  //     //   formFields.duration,
  //     //   selectedFiles
  //     // );
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = requiredFields.filter((field) => !formFields[field]);
    if (emptyFields.length > 0) {
      alert(`Please fill in the following fields: ${emptyFields.join(", ")}`);
      return;
    }
    debugger;
    console.log("Imagesss", imageurls)
    const data = localStorage.getItem("User");
    const phone = JSON.parse(data);
    const phone_no = phone.username;
    console.log("Response phone", phone_no);
    const res = await fetch("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/create-post?key=oc.fc8ab25facba44eb959939ad6d3f8c6a", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: formFields.state,
        title: formFields.title,
        location: formFields.location,
        lat: formFields.latitude,
        lng: formFields.longitude,
        from: phone_no,
        radius: 5,
        messages: [
          { type: 'text', content: `${formFields.message}` },
          { type: 'image', content: `${imageurls}` }
        ]
      })
    })
      .then((res) => {
        if (res.status == 200) {
          console.log("response", res);
          toast.success('Your Post has been Published Successfully!');
        window.location.reload();
        } else {
          throw new Error(
            res.data?.message ?? "Error in Publishing your Post"
          );
        }
        toast.failure("Error in Publishing Your Post")
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   const offerData = async () => {
  //     try {
  //       const response = await fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/offers?user_id=65e867611f2cadccb9922295`);
  //       const responseData = await response.json();
  //       console.log("Graph data:", responseData.offers);

  //       // Extract required variables from each object in 'offers' array
  //       const extractedData = responseData.offers.map(offer => ({
  //         reach: offer.reach,
  //         category: offer.category,
  //         location: offer.location
  //       }));
  //       console.log("Extracted data:", extractedData);

  //       // Set extracted data to state
  //       setData(extractedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   offerData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("User");
        const user_id = JSON.parse(userData);
        const u_id = user_id?._id;
        console.log("user is", user_id?._id)
        const response = await fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/offers?user_id=${u_id}`);
        const data = await response.json();
        console.log("graph data", data.offers);
        setOfferData(data.offers);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, []);

  const states = ["Ac service", "phone", "rental car"];
  const packages = ["listing", "add"];
  const durations = ["6 months", "1 year", "1.5 year"];
  // const [optionData, setOption] = useState();
  let optionData = ["ListingPlan", "BusinessPlan", "ActivePlan"]
  const [images, setImages] = useState([]);
  const [imageurls, setImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images1, setImages1] = useState([]);
  const [image1urls, setImage1Urls] = useState([]);
  const [selectedFiles1, setSelectedFiles1] = useState([]);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    const selectedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const selectedImages1 = Array.from(files)
    const foldername = "/wa-groups-screenshots";

    firebase_service.uploadManyFilesOnFirebase({ files: selectedImages1, foldername })
      .then(async (urls) => {
        console.log("Uploaded Image URLs:", urls);
        setImageUrls([...imageurls, urls])
        // setData(result1.data.data);
        // You can perform further actions with the uploaded images here.
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });

    setImages([...images, ...selectedImages]);
    setSelectedFiles([...selectedFiles, ...files]);
  };
  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    const updatedUrls = [...imageurls];
    const updatedFiles = [...selectedFiles];

    updatedImages.splice(index, 1);
    updatedFiles.splice(index, 1);
    updatedUrls.splice(index, 1);

    setImages(updatedImages);
    setSelectedFiles(updatedFiles);
    setImage1Urls(updatedUrls)
  };
  const handleFileInputChange1 = (e) => {
    const files = e.target.files;
    const selectedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const selectedImages1 = Array.from(files);
    const foldername = "/wa-groups-screenshots";

    firebase_service
      .uploadManyFilesOnFirebase({ files: selectedImages1, foldername })
      .then(async (urls) => {
        console.log("Uploaded Image URLs:", urls);
        setImage1Urls([...image1urls, urls]);
        // setData(result1.data.data);
        // You can perform further actions with the uploaded images here.
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });

    setImages1([...images1, ...selectedImages]);
    setSelectedFiles1([...selectedFiles1, ...files]);
  };
  const handleImageRemove1 = (index) => {
    const updatedImages = [...images1];
    const updatedFiles = [...selectedFiles1];
    const updatedUrls = [...image1urls];

    updatedImages.splice(index, 1);
    updatedFiles.splice(index, 1);
    updatedUrls.splice(index, 1)

    setImages1(updatedImages);
    setSelectedFiles1(updatedFiles);
    setImage1Urls(updatedUrls)
  };
  useEffect(() => {
    //  let na = authCtx.user.sector;
    // let page = 1;

    const fetchData = async () => {

      //  const result = await LambdaAPI.get(`/packages`);
      //  setOption(result.data.data.packages)
      //  var url = `https://7b7xlap5jvkahyo5himfrzqy640qnadr.lambda-url.eu-west-1.on.aws/packages`;
      //  console.log("URLLL", url);
      //  console.log("RESData", result);

    };

    fetchData();
  }, []);
  // console.log("Packages", optionData)
  let duration = ["12 months"];
  // if(optionData){
  //  duration = optionData.find(item => item.name === formFields.package)
  // if (duration) {
  // Handle the case where 'durations' is not undefined
  // You can access 'durations' here
  // console.log("durationnnn",duration);
  // } else {
  // Handle the case where 'durations' is undefined (no matching element found)
  // console.log("No matching element found in optionData");
  // }}

  // const handleSubmit = () => {
  //   // Send selectedFiles to your server or perform further actions
  //   console.log(selectedFiles);
  // };
  const deletePost = async (p_id) => {
    // debugger;
    setId(p_id);
    console.log("post id ", p_id);

    try {
      console.log("post id ", id);
      const response = await fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/remove-offer?id=${p_id}`);
      const data = await response.json();
      console.log("API response:", data);
      if (data.error === false) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };



  return (
    <DashboardTemplate pageTitle={"Offers / Requests"}>
      <div className="bg-white min-h-[50vh] py-4 px-8 rounded-lg shadow-lg">
        <Tabs selectedTabClassName="border-b-2 border-blue-500 text-[#000]">
          <TabList className={"flex items-center gap-6 border-b-[1px]"}>
            <Tab
              className={
                "border-0 bg-transparent cursor-pointer outline-none py-2 px-2 text-slate-500"
              }
            >
              ACTIVE
            </Tab>
            {/* <Tab
              className={
                "border-0 bg-transparent cursor-pointer outline-none py-2 px-2 text-slate-500"
              }
            >
              DRAFT
            </Tab>
            <Tab
              className={
                "border-0 bg-transparent cursor-pointer outline-none py-2 px-2 text-slate-500"
              }
            >
              EXPIRED
            </Tab> */}
          </TabList>

          <TabPanel>
            {/* <div> <div className="container px-5 py-12 mx-auto flex flex-wrap">
<div className="flex flex-wrap -m-4 mt-1 w-5/6">
    <div className="p-4 lg:w-full md:w-full sm:justify-center">
      <div className="flex border border-gray-400  sm:flex-row flex-col">

        <div className='flex-[1_1_25%] flex-grow inline-flex items-center justify-center p-2'>
          <img src="src/assets/images/img.jpg" alt="Image" className='block mx-auto object-contain p-2' />
        </div>
        <div className="flex-[1_1_50%] flex-grow sm:justify-center p-2">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-1 mt-3 text-left">Get 20% Discount</h2>
          <p className="leading-relaxed text-base text-left mb-4">Do you provide your services in Essex?</p>
          <p className="leading-relaxed text-base text-left">Please share your requirements</p>
        </div>
        <div className="flex-[1_1_25%] flex-grow border-l border-gray-400 bg-gray-100 pl-4 pr-4 pb-4 pt-1">
        <div className="flex-grow flex flex-col ">
          
            <table className="border-collapse w-full">
            <tr> 
              <td className="pl-2 pr-2 pb-2 pt-0 text-left text-lg">Reach</td>
              <td className="pl-2 pr-2 pb-2 pt-0 text-left text-lg">Views</td>
            </tr>
            <tr>
              <td className="p-2 font-normal text-3xl text-left">2.8K</td>
              <td className="p-2 font-normal text-3xl text-left">1.5K</td>
            </tr>
            <tr>
              <td className="p-2 text-left text-lg"><strong className='font-normal text-3xl'>19 </strong><br /> Calls</td>
              <td className="p-2 text-left text-lg"><strong className=' font-normal text-3xl'>1,634 </strong><br />Distance(m)</td>
            </tr>
          </table>
          
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="flex flex-wrap -m-4 mt-1 w-5/6">
    <div className="p-4 lg:w-full md:w-full sm:justify-center">
      <div className="flex border border-gray-400  sm:flex-row flex-col">
        <div className='flex-[1_1_25%] flex-grow inline-flex items-center justify-center p-2'>
          <img src="src/assets/images/img.jpg" alt="Image" className='block mx-auto object-contain p-2' />
        </div>
        <div className="flex-[1_1_50%] flex-grow sm:justify-center p-2">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-1 mt-3 text-left">Get 20% Discount</h2>
          <p className="leading-relaxed text-base text-left mb-4">Do you provide your services in Essex?</p>
          <p className="leading-relaxed text-base text-left">Please share your requirements</p>
        </div>
        <div className="flex-[1_1_25%] flex-grow border-l border-gray-400 bg-gray-100 pl-4 pr-4 pb-4 pt-1">
        <div className="flex-grow flex flex-col ">
          
            <table className="border-collapse w-full">
            <tr> 
              <td className="pl-2 pr-2 pb-2 pt-0 text-left text-lg">Reach</td>
              <td className="pl-2 pr-2 pb-2 pt-0 text-left text-lg">Views</td>
            </tr>
            <tr>
              <td className="p-2 font-normal text-3xl text-left">2.8K</td>
              <td className="p-2 font-normal text-3xl text-left">1.5K</td>
            </tr>
            <tr>
              <td className="p-2 text-left text-lg"><strong className='font-normal text-3xl'>19 </strong><br /> Calls</td>
              <td className="p-2 text-left text-lg"><strong className=' font-normal text-3xl'>1,634 </strong><br />Distance(m)</td>
            </tr>
          </table>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</div></div> */}
            {/* <div className="container pr-5 py-12 mx-auto flex flex-wrap">
      {offerData.map((offer, index) => (
        <div key={index} className="flex flex-wrap -m-4 mt-1 w-5/6">
          <div className="p-4 lg:w-full md:w-full sm:justify-center">
            <div className="flex border border-gray-400  sm:flex-row flex-col">
              <div className='flex-[1_1_25%] flex-grow inline-flex items-center justify-center'>
                {offer.query_messages && offer.query_messages.length > 1 ? (
            <img src={offer.query_messages[1].content} alt="Image" className='block mx-auto object-contain'/>
            ) : (
           <svg
           fill="none"
           stroke="currentColor"
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           className="w-10 h-10 text-gray-400"
           viewBox="0 0 24 24"
         >
           <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
           <circle cx="12" cy="7" r="4"></circle>
         </svg>
         )}
              </div>
              <div className="flex-[1_1_50%] flex-grow sm:justify-center p-2">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-1 mt-3 text-left">{offer.business_name}</h2>
                <p className="leading-relaxed text-base text-left mb-4">{offer.query_messages[0].content}</p>
                <p className="leading-relaxed text-base text-left">{offer.requirements}</p>
              </div>
              <div className="flex-[1_1_25%] flex-grow border-l border-gray-400 bg-gray-100 pl-4 pr-4 pb-4 pt-1">
                <div className="flex-grow flex flex-col">
                  <table className="border-collapse w-full">
                    <tr> 
                      <td className="pl-2 pr-2 pb-2 pt-0 text-left text-lg">Reach</td>
                      <td className="pl-2 pr-2 pb-2 pt-0 text-center text-lg">Views</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-normal text-3xl text-left">{offer.reach}</td>
                      <td className="p-2 font-normal text-3xl text-center">{offer.__v}</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left text-lg"><strong className='font-normal text-3xl'>{offer.radius}</strong><br /> Calls</td>
                      <td className="p-2 text-center text-lg"><strong className='font-normal text-3xl'>{offer.radius}</strong><br />Distance(m)</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div> */}
            <div className="container pr-5 py-12 mx-auto flex flex-wrap flex-row">
              {offerData.map((offer, _id) => (
                <div key={_id} className="relative flex flex-wrap flex-row -m-4 mt-1 w-5/6">
                  <div className="flex flex-row">
                  <div className="p-4 lg:w-full md:w-full sm:justify-center">
                    <div className="flex border border-gray-400 sm:flex-row flex-col ">
                      <div className="flex-[1_1_25%] flex-grow inline-flex items-center justify-center">
                        {offer.query_messages && offer.query_messages.length > 1 ? (
                          <img src={offer.query_messages[1].content} alt="Image" className='block mx-auto object-contain' />
                        ) : (
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-10 h-10 text-gray-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        )}
                      </div>
                      <div className="flex-[1_1_50%] flex-grow sm:justify-center p-2">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-1 mt-3 text-left">{offer.business_name}</h2>
                        <p className="leading-relaxed text-base text-left mb-4">{offer.query_messages[0].content}</p>
                        <p className="leading-relaxed text-base text-left">{offer.requirements}</p>
                      </div>
                      <div className="flex-[1_1_25%] flex-grow border-l border-gray-400 bg-gray-100 pl-4 pr-4 pb-4 pt-1">
                        <div className="flex-grow flex flex-col">
                          <table className="border-collapse w-full">
                            <tr>
                              <td className="pl-2 pr-2 pb-2 pt-0 text-left text-lg">Reach</td>
                              <td className="pl-2 pr-2 pb-2 pt-0 text-center text-lg">Views</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-normal text-3xl text-left">{offer.reach}</td>
                              <td className="p-2 font-normal text-3xl text-center">{offer.__v}</td>
                            </tr>
                            <tr>
                              <td className="p-2 text-left text-lg"><strong className='font-normal text-3xl'>{offer.radius}</strong><br /> Calls</td>
                              <td className="p-2 text-center text-lg"><strong className='font-normal text-3xl'>{offer.radius}</strong><br />Distance(m)</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex-[1_1_25%] flex-grow flex justify-end items-center p-4">
                    <button className="mr-2 px-6 py-2 bg-blue-500 text-white rounded-md flex flex-row justify-between"><FiEdit2  className="mr-2 mt-1"/>Edit</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md  flex flex-row justify-between" onClick={() => deletePost(offer._id)}><FiTrash2 className="mr-2 mt-1"/>Delete</button>
                  </div> */}
                </div>
                <div className="flex-[1_1_25%] flex-grow flex justify-end items-center p-4">
                    <button className="mr-2 px-6 py-2 bg-blue-500 text-white rounded-md flex flex-row justify-between"><FiEdit2  className="mr-2 mt-1"/>Edit</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md  flex flex-row justify-between" onClick={() => deletePost(offer._id)}><FiTrash2 className="mr-2 mt-1"/>Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center h-full">
              <div className="mt-3">
                <img src={AppImages.postImage} alt="" />
              </div>
              <div className="text-[#333333] text-[24px] text-center">
                Get more leads with featured posts
              </div>
              <div
                className="w-[142px] h-[40px] bg-[#24ACE3] pt-2 text-center rounded-md mt-5 text-white hover:bg-[#80c6e1] cursor-pointer"
                onClick={(e) => {
                  setIsAddModalOpen(true);
                }}
              >
                Create Now
              </div>
              <Modal
                isOpen={isAddModalOpen}
                // onAfterOpen={afterOpenModal}
                style={modalStyle}
                onRequestClose={() => setIsAddModalOpen(false)}
              >
                <button
                  className="text-[20px] font-bold absolute right-6 top-[4px]"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  X
                </button>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto my-2 w-full h-[80vh] justify-between flex flex-col"
                >
                  {part === 1 ? (
                    <div>
                      <div className="text-[18px] text-[#24ACE3] text-center font-bold">
                        Featured Post
                      </div>
                      <div className="border-[1px] border-[#333333] opacity-20 my-2"></div>
                      <div className="mt-[25px]">
                        <label
                          htmlFor={"site_location_states"}
                          className={`block  text-[14px] font-bold pl-0`}
                        >
                          Select Category /زمرہ
                        </label>
                        <select
                          id="site_location_states"
                          className={`px-3 py-2 my-1 text-[14px] border-[1px] opacity-75 border-solid border-black rounded-lg w-full outline-primary text-black `}
                          onChange={(e) => {
                            setFormFields((old) => ({
                              ...old,
                              state: e.target.value,
                            }));
                          }}
                          value={formFields.state ?? ""}
                        // disabled={action === "view"}
                        >
                          <option value="" className="opacity-70">
                            Select
                          </option>
                          {states.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        <TextInputField
                          type={"text"}
                          style={{
                            width: "w-full",
                            labelFontSize: "text-[14px]",
                            inputFontSize: "text-[12px]",
                          }}
                          label="Title / عنوان"
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

                        <TextInputField
                          type={"text"}
                          style={{
                            width: "w-full",
                            labelFontSize: "text-[27px]",
                            inputFontSize: "text-[22px]",
                          }}
                          label="Message / پیغام"
                          onChange={(e) => {
                            setFormFields((old) => ({
                              ...old,
                              message: e?.target?.value,
                            }));
                          }}
                          value={formFields.message}
                          error={formFields.message ? null : ""}
                          isRequired={true}
                          placeholder={"Message"}
                        />
                      </div>
                      <label
                        htmlFor={"site_location_states"}
                        className={`block  text-[14px] mt-2 font-bold`}
                      >
                        Location
                      </label>
                      <div
                        className={`w-full flex flex-row ${isInputFocused ? "border-bold" : ""
                          }`}
                      >
                        <input
                          type="text"
                          placeholder="location"
                          required={true}
                          onChange={(e) => {
                            setFormFields((old) => ({
                              ...old,
                              location: e.target.value,
                            }));
                          }}
                          value={formFields.location}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          className={`block pl-4 text-[14px] py-2 mb-2 w-[90%] opacity-75 border-[1px] border-black rounded-md`}
                        />
                        <FiMapPin
                          className={`w-6 h-6 mt-2 ml-2 cursor-pointer ${isIconClicked ? "text-blue-500" : "text-black"
                            }`}
                          onClick={handleIconClick}
                        />
                      </div>
                      <div className="flex flex-row my-2">
                        <div>
                          <GrUploadOption
                            color={"#AFAFAF"}
                            size={"24px"}
                          />
                        </div>
                        <div>
                          {" "}
                          <label class="upload-button">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileInputChange}
                            />
                            <span
                              id="uploadText"
                              className="text-[14px] pl-2 font-bold text-[#333333] opacity-60 cursor-pointer"
                            >
                              Upload New
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="image-preview flex flex-row">
                        {images.map((image, index) => (
                          <div key={index} className="image-container">
                            <button
                              className="remove-button"
                              onClick={() => handleImageRemove(index)}
                            >
                              <AiOutlineClose />
                            </button>
                            <img
                              src={image}
                              alt={`Image ${index}`}
                              className="w-[90px] h-[80px] mr-[30px]"
                            />
                          </div>
                        ))}
                      </div>

                      {/* <Link to={`/verify/${formFields.mobile}`}> */}
                      <button
                        className="w-full h-[46px] mb-3 bg-[#1FA3DB] text-[14px] rounded-md text-white hover:bg-[#8cd2f0]  mt-4"
                        onClick={(e) => {
                          setPart(2);
                        }}
                      >
                        Next
                      </button>
                      {/* </Link> */}
                    </div>
                  ) : part == 2 ? (
                    <div>
                      <div className="text-[22px] text-[#24ACE3] text-center font-bold">
                        Featured Post
                      </div>
                      <div className="border-[1px] border-[#333333] my-2"></div>
                      <label
                        htmlFor={"site_location_states"}
                        className={`block text-[14px] font-bold`}
                      >
                        Select Package
                      </label>
                      <select
                        id="site_location_states"
                        className={`px-3 py-2 my-1 text-[14px] border-[1px] border-solid border-black rounded-lg w-full outline-primary text-black `}
                        onChange={(e) => {
                          setFormFields((old) => ({
                            ...old,
                            package: e.target.value,
                          }));
                        }}
                        value={formFields.package ?? ""}
                      // disabled={action === "view"}
                      >
                        <option value="">Select</option>
                        {optionData.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>

                      <label
                        htmlFor={"site_location_states"}
                        className={`block mt-2 text-[14px] font-bold`}
                      >
                        Duration
                      </label>
                      <select
                        id="site_location_states"
                        className={`px-3 py-2 mb-2 text-[14px] border-[1px] border-solid border-black rounded-lg w-full outline-primary text-black `}
                        onChange={(e) => {
                          setFormFields((old) => ({
                            ...old,
                            duration: e.target.value,
                          }));
                        }}
                        value={formFields.duration ?? ""}
                      // disabled={action === "view"}
                      >
                        <option value="">Select</option>
                        {duration.map(
                          (item, index) => (
                            // state.durations.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          )
                          // ))
                        )}
                      </select>

                      {/* Second Image  */}
                      <label
                        htmlFor={"site_location_states"}
                        className={`block mt-2 text-[14px] font-bold`}
                      >
                        Upload Transfer Receipt
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInputChange1}
                        className="mb-2"
                      />
                      <div className="image-preview flex flex-row">
                        {images1.map((image, index) => (
                          <div key={index} className="image-container">
                            <button
                              className="remove-button"
                              onClick={() => handleImageRemove1(index)}
                            >
                              <AiOutlineClose />
                            </button>
                            <img
                              src={image}
                              alt={`Image ${index}`}
                              className="w-[90px] h-[80px] mr-[30px]"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        className="w-full h-[46px] mb-3 bg-[#1FA3DB] text-[14px] rounded-md text-white hover:bg-[#8cd2f0]  mt-4"
                        onClick={(e) => {
                          setPart(3);
                        }}
                      >
                        Next
                      </button>
                      <button
                        className="w-full h-[46px] mb-3 bg-[#1FA3DB] text-[14px] rounded-md text-white hover:bg-[#8cd2f0]  mt-4"
                        onClick={(e) => {
                          setPart(1);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[22px] text-[#24ACE3] text-center font-bold">
                        Featured Post
                      </div>
                      <div className="border-[1px] border-[#333333] my-2"></div>
                      <div className="text-[16px] font-bold text-[#333333]">
                        {formFields.title}
                      </div>
                      <div className="text-[14px] text-[#333333]">
                        {formFields.location}
                      </div>
                      <div className="text-[14px] text-[#333333]">
                        {formFields.state}
                      </div>
                      <div className="border-[1px] border-[#333333] my-2"></div>
                      <div className="text-[16px] font-bold text-[#333333]">
                        Offer Selected
                      </div>
                      <div className="text-[14px] text-[#333333]">
                        {formFields.location}
                      </div>
                      <div className="text-[14px] text-[#333333]">
                        {formFields.state}
                      </div>
                      <div className="border-[1px] border-[#333333] my-2"></div>
                      <div className="image-preview flex flex-row">
                        {images.map((image, index) => (
                          <div key={index} className="image-container">
                            <img
                              src={image}
                              alt={`Image ${index}`}
                              className="w-[90px] h-[80px] mr-[30px]"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="border-[1px] border-[#333333] my-2"></div>
                      <div className="text-[14px] font-bold text-[#333333]">
                        Your post goes live upon publishing. Receipt
                        verification with in 24 hours
                      </div>
                      <button
                        className="w-full h-[46px] mb-3 bg-[#1FA3DB] text-[14px] rounded-md text-white hover:bg-[#8cd2f0]  mt-4"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        Publish
                      </button>
                      <button
                        className="w-full h-[46px] mb-3 bg-[#1FA3DB] text-[14px] rounded-md text-white hover:bg-[#8cd2f0]  mt-4"
                        onClick={(e) => {
                          setPart(2);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  )}
                </form>
              </Modal>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="py-4">
              <h1>Hello World 2</h1>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="py-4">
              <h1>Hello World 3</h1>
            </div>
          </TabPanel>
        </Tabs>
        <ToastContainer />
      </div>
    </DashboardTemplate>
  );
}

export default OffersRequestsScreen;
