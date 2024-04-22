import React from 'react';
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import Modal from "react-modal";
import { useState } from 'react';
import TextInputField from "../../components/basic/TextInputField.jsx";

Modal.setAppElement('#root');
function Invitations(){
    // const data = [
    //       { time: "10:36 am", message: "promotions ads created" },
    //       { time: "09:16 am", message: "new messages" },
    //       { time: "10:36 am", message: "promotions ads created" },
    //       { time: "09:16 am", message: "new messages" },
    //       { time: "10:36 am", message: "promotions ads created" },
    //       { time: "09:16 am", message: "new messages" },
    //     ];
    const modalStyle = {
        content: {
          top: "50%",
          width: "488px",
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
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const closeModal = () => {
    setIsAddModalOpen(false);
  };
  const  handleSubmit = () =>{
    debugger;
        console.log("submitted", formFields.phone_no)
    }

  const [formFields, setFormFields] = useState({
    phone_no: "",

  });
//   const requiredFields = [
//     "phone_no"
//   ];
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
    return(
        <DashboardTemplate pageTitle={"Invitations"}>
        <div className='bg-white'>
        <div>
        <table className='w-full pr-4'>
          <thead className='border-b-2'>
            <tr className=''>
              <th>Title</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
            {/* <hr /> */}
          </thead>
          <tbody>
            {/* {data.map(item => (
              <tr key={item.id} className='border-b-2 border-slate-200'>
                <td className={'w-[15%] ' + tdClasses}>{formatTimestamp(item.updated_at)}</td>
                <td className={'w-[20%] ' + (hasUrduCharacters(item.title) ? "ur" : "") + " " + tdClasses}>{item.title}</td>
                <td className={'w-[5%] ' + tdClasses}>{item.audience_count}</td>
                <td className={'w-[20%] ' + (hasUrduCharacters(item.title) ? "ur" : "") + " " + tdClasses}>{item.body}</td>
                <td className={tdClasses}>{item.content_type}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
        </div>
        <div>
        <button className='absolute top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded'  onClick={(e) => {
                  setIsAddModalOpen(true);
                }}>Send Invite</button>
        </div>
        <Modal
                isOpen={isAddModalOpen}
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
                //   onSubmit={handleSubmit}
                  className="max-w-md mx-auto my-2 w-full h-[80vh] justify-between flex flex-col"
                >
                    <div>
                      <div className="text-[18px] text-[#24ACE3] text-center font-bold">
                        Send Invitation
                      </div>
                      <div className="border-[1px] border-[#333333] opacity-20 my-2"></div>
                      <div className="mt-[25px]">
                        <TextInputField
                          type={"text"}
                          style={{
                            width: "w-full",
                            labelFontSize: "text-[14px]",
                            inputFontSize: "text-[12px]",
                          }}
                          label="Phone Number"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const regex = /^[0-9]+$/;
                            if (inputValue === '' || (regex.test(inputValue) && inputValue.length <= 11)) {
                              setFormFields((old) => ({
                                ...old,
                                phone_no: inputValue,
                              }));
                            }
                          }}   
                          value={formFields.phone_no}
                          error={formFields.phone_no ? null : ""}
                          isRequired={true}
                          placeholder={"03*********"}
                        />

                        {/* <TextInputField
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
                        /> */}
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
    )
}
export default Invitations;