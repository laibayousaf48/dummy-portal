import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { formatTimestamp, hasUrduCharacters } from '../../utils/helpers.js';
import ShowMoreText from "react-show-more-text";
import TextInputField from "../../components/basic/TextInputField.jsx";

Modal.setAppElement('#root');

const NotificationList = () => {
  const [data, setData] = useState([]);
const navigate = useNavigate();
const tdClasses = `p-2 border-[1px] border-slate-100`;
  const [formFields, setFormFields] = useState({
    phone_no: "",
  });
  const [error, setError] = useState("");
  const business_id = localStorage.getItem("Business ID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/api/dynamic-notification?business_id=${business_id}&type=all`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleClick = ()=>{
    navigate("/form")
  }

  const modalStyle = {
    content: {
      top: "50%",
      maxWidth: "480px",
      width:"100vw",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
      setIsModalOpen(false);
    };
    const  handleSubmit = () =>{
      // debugger;
          console.log("submitted", formFields.title);
      }
  

  return (
    // <DashboardTemplate pageTitle={'Notification Data'}>
    
      // <div className='max-w-md mx-auto bg-white shadow-md overflow-auto md:max-w-2xl'>
      <div className="bg-white py-10">
        <div className="flex flex-wrap justify-between lg:flex-row sm:flex-col justify-right mb-4">
        <button className='m-4 p-2 bg-blue-500 text-white rounded' onClick={handleClick}>Add Notification</button>
        <button className=' ml-4 m-4 p-2 bg-blue-500 text-white rounded' onClick={(e) => {setIsModalOpen(true);}}>Send Individual Notification</button> 
        </div>
        <hr />
        <div className="md:flex mx-0 md:shrink-0">
        <table className='w-full pr-4'>
          <thead className='border-b-2'>
            <tr className='md:px-2'>
              <th className="md:px-2 py-4">Time</th>
              <th className="md:px-2 py-4">Title</th>
              <th className="md:px-2 py-4">Audience</th>
              <th className="md:px-2 py-4">Body</th>
              <th className="md:px-2 py-4">Type</th>
              <th className="md:px-2 py-4">Content</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className='border-b border-slate-200'>
                <td className={'w-[15%] ' + tdClasses}>{formatTimestamp(item.updated_at)}</td>
                <td className={'w-[20%] ' + (hasUrduCharacters(item.title) ? "ur" : "") + " " + tdClasses}>{item.title}</td>
                <td className={'w-[5%] ' + tdClasses}>{item.audience_count}</td>
                <td className={'w-[20%] ' + (hasUrduCharacters(item.title) ? "ur" : "") + " " + tdClasses}>{item.body}</td>
                <td className={tdClasses}>{item.content_type}</td>
                <td className={tdClasses}>
                  {item.content_type === 'image' ? (
                    <img src={item.content_body} alt="content" style={{ maxWidth: '100px' }} />
                  ) : (
                    <ShowMoreText lines={3} className={(hasUrduCharacters(item.title) ? "ur" : "")}>{item.content_body}</ShowMoreText>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
        {/* <div className="flex flex-wrap lg:flex-row sm:flex-col">
           <button className='absolute top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded' onClick={handleClick}>Add Notification</button>
        </div>
        <div>
        <button className='absolute top-0 right-40 sm:top-auto sm:right-auto sm:ml-4 m-4 p-2 bg-blue-500 text-white rounded' onClick={(e) => {
                  setIsModalOpen(true);}}>Send Individual Notification</button> 
        </div> */}

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
                        Send Individual Notification
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
                        <TextInputField
                          type={"text"}
                          style={{
                            width: "w-full",
                            labelFontSize: "text-[27px]",
                            inputFontSize: "text-[22px]",
                          }}
                          label="Message"
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
                         <TextInputField
                          type={"text"}
                          style={{
                            width: "w-full",
                            labelFontSize: "text-[27px]",
                            inputFontSize: "text-[22px]",
                          }}
                          label="Link"
                          onChange={(e) => {
                            setFormFields((old) => ({
                              ...old,
                              link: e?.target?.value,
                            }));
                          }}
                          value={formFields.link}
                          error={formFields.link ? null : ""}
                          isRequired={true}
                          placeholder={"Link"}
                        />
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
    // </DashboardTemplate>
  );
};

export default NotificationList;
