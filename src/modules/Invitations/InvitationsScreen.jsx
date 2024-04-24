import React from 'react';
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import Modal from "react-modal";
import { useState } from 'react';
import TextInputField from "../../components/basic/TextInputField.jsx";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
// import BootstrapTable from 'react-bootstrap-table-next';
// import { CompactTable } from '@table-library/react-table-library/compact';
import DataTable from 'datatables.net-dt';
// import 'datatables.net-responsive-dt';
let table = new DataTable('#myTable',{
  responsive: true
});
Modal.setAppElement('#root');
function Invitations(){
  const bar_data = {
    labels: ["Delivered", "Accepted", "Rejected"],
    datasets: [
      {
        label: "Notifications Status",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
    const data = [
          {phone:"13463454939", time: "10:36 am", message: "promotions ads created" },
          {phone:"23463454939", time: "09:16 am", message: "new messages" },
          {phone:"33463454939", time: "10:36 am", message: "promotions ads created" },
          {phone:"43463454939", time: "09:16 am", message: "new messages" },
          {phone:"53463454939", time: "10:36 am", message: "promotions ads created" },
          {phone:"63463454939", time: "09:16 am", message: "new messages" },
        ];
        const columns = [
          { dataField: 'phone', text: 'phone' },
          { dataField: 'time', text: 'Time' },
          { dataField: 'message', text: 'message' },
        ];

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
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
    return(
        <DashboardTemplate pageTitle={"Invitations"}>
        {/* <div className='max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl'> */}
        {/* <div> */}
        {/* <Bar data={bar_data} /> */}
        <div className='w-[75vw] bg-white mt-12'>
          <div className='p-8'>
            <div className='text-3xl '>Invitations Status</div>
            <hr className='my-4' />
          <Bar data={bar_data} />
          </div>
          <div className='p-8 pb-0 text-3xl '>Invitations Data</div>
        <div className='md:flex p-8 '>
        <table className='w-full pr-4 border-2 border-gray-300'>
          <thead className='border-b-2'>
            <tr className='flex flex-row justify-around py-4 '>
              <th>Phone</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
        {data?.map((item, index) => (
          <tr key={index} className='flex flex-row justify-around text-center border-b py-4 text-gray-500'>
            <td className='w-[33%]'>NA</td>
            <td className='w-[33%]'>{item.time}</td>
            <td className='w-[33%]'>{item.message}</td>
          </tr>
        ))}
      </tbody>
        </table>
        </div>

        {/* <DataTable columns={columns} data={data} />; */}
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
                  className="max-w-md mx-auto my-2 w-full h-[40vh] justify-between flex flex-col"
                >
                    <div>
                      {/* <div className="text-[18px] text-[#24ACE3] text-center font-bold">
                        Send Invitation
                      </div> */}
                      <div className="border-[1px] border-[#333333] opacity-20 mt-2"></div>
                      <div className="mt-[25px]">
                        <TextInputField
                          type={"tel"}
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