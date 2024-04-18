import { IoAnalytics, IoPersonOutline } from "react-icons/io5";
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import StatCard from "../../components/StatCard.jsx";
import { PiBriefcase } from "react-icons/pi";
import AppImages from "../../assets/images/index.js";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
function DashboardScreen() {
  const [graphData, setGraphData] = useState(null);
  const [data, setData] = useState([]);
  // const data = [
  //   { time: "10:36 am", message: "promotions ads created" },
  //   { time: "09:16 am", message: "new messages" },
  //   { time: "10:36 am", message: "promotions ads created" },
  //   { time: "09:16 am", message: "new messages" },
  //   { time: "10:36 am", message: "promotions ads created" },
  //   { time: "09:16 am", message: "new messages" },
  // ];

  // const labels = ["January", "February", "March", "April", "May", "June"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/markers/nearby/of-any-category?lat=38.9912665&lng=-94.5797532`);
        const result = await response.json();
        const api_data = result.data.markers;
        console.log("result", api_data)
        setData(api_data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const graph_data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24","25", "26", "27", "28", "29", "30"],
    datasets: [
      {
        label: "Total Audience of the month",
        data: [0, 10, 5, 2, 20, 30, 45],
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  //Earning Graph
  const graph = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24","25", "26", "27", "28", "29", "30"],
    datasets: [
      {
        label: "Earning Graph",
        data: [0],
        backgroundColor: "rgb(0, 0, 255)",
        borderColor: "rgb(0, 0, 255)",
      },
    ],
  };


  return (
    <DashboardTemplate pageTitle={"Dashboard"}>
      <div className="flex flex-wrap items-center">
        {/* <StatCard
          icon={<IoPersonOutline color={"#24ACE3"} size={"20px"} />}
          number={932}
          title="QR code Scans"
          subtitle={"Report"}
        />
        <StatCard
          icon={<PiBriefcase color={"#24ACE3"} size={"20px"} />}
          number={132}
          title="Link Clicks"
          subtitle={"Report"}
        />
        <StatCard
          icon={<IoAnalytics color={"#24ACE3"} size={"20px"} />}
          number={"23"}
          title="Active Users"
          subtitle={"Report"}
        />
         <StatCard
          icon={<IoAnalytics color={"#24ACE3"} size={"20px"} />}
          number={"$155.0"}
          title="Earning"
          subtitle={"Report"}
        /> */}
        {/* <div className="flex-[0_0_30%] bg-white py-3 px-3 rounded-xl shadow-xl">
          <div className="flex flex-row w-full">
            <div className="w-[50%]">
              <img src={AppImages.barcode} alt="" className="w-[70%]" />
            </div>
            <div className="w-[50%] ">
              <div className="flex flex-col">
                <div className="text-[16px] text-[#333333]">
                  Share your Profile
                </div>
                <div className="text-[13px] text-[#AFAFAF]">
                  {" "}
                  Scan this code and add new customers
                </div>
                <div className="text-[16px] text-[#24ACE3] cursor-pointer">
                  Share
                </div>
              </div>
            </div>
          </div>
        </div> */}
<div class="container px-5 py-5 mx-auto bg-white">
    <div class="flex justify-around text-left">
        <div class="p-4 w-1/3 border-r-2 border-gray-300">
            <h2 class="title-font font-medium text-3xl text-gray-900">9,342</h2>
            <div className='flex flex-inline flex-row justify-between'>
            <p class="leading-relaxed text-left text-xs text-gray-600">QR code scans &nbsp;</p>
            <p><a href="#" className='underline-offset-auto text-xs text-blue-500 font-light'>Report</a></p>
            </div>
        </div>
        <div class="p-4 w-1/3 ml-8 border-r-2 border-gray-300">
            <h2 class="title-font font-medium text-3xl text-gray-900">821</h2>
            <div className='flex flex-inline flex-row justify-between'>
            <p class="leading-relaxed text-left text-xs text-gray-600">Links clicked &nbsp;</p>
            <a href="#" className='underline-offset-auto text-xs text-blue-500 font-light'>Report</a>
            </div>
        </div>
        <div class="p-4 w-1/3 ml-8 border-r-2 border-gray-300">
            <h2 class="title-font font-medium text-3xl text-gray-900">11,213</h2>
            <div className='flex flex-inline flex-row justify-between'>
            <p class="leading-relaxed text-left text-xs text-gray-600">Active users &nbsp;</p>
           <a href="#" className='underline-offset-auto text-xs text-blue-500 font-light'>Report</a>
            </div>
        </div>

        <div class="p-4 w-1/3 ml-8">
            <h2 class="title-font font-medium text-3xl text-gray-900">$129.22</h2>
            <div className='flex flex-inline flex-row justify-between'>
            <p class="leading-relaxed text-left text-xs text-gray-600">Earnings &nbsp;</p>
            <a href="#" className='underline-offset-auto text-xs text-blue-500 font-light'>Report</a>
            </div>
        </div>
    </div>
</div>


<div class="lg:w-full mx-auto bg-white mt-0 pt-0">
     
      <div class="flex flex-wrap px-10 py-8">
        <div className="text-[14px] text-[#333333] font-semibold mb-4">Total Audience</div>
        {/* <div class="px-2 w-full mb-4 border border-gray-300  bg-white"> */}
          <div class="flex flex-wrap w-full bg-white sm:py-24 py-16 sm:px-10 px-6 relative border border-gray-300">
            <div class="text-center relative z-10 w-full">
              {/* <h2 class="text-xl text-gray-900 font-medium title-font mb-2">Maps</h2> */}
              <Line data={graph_data} />
            </div>
          </div>
        {/* </div> */}
     
        <div className="text-[14px] text-[#333333] font-semibold pl-12 mb-4">Earning</div>
        <div class="px-2 w-full mb-4 border border-gray-300 ">
          <div class="flex flex-wrap w-full bg-white sm:py-24 py-16 sm:px-10 px-6 relative">
            <div class="text-center relative z-10 w-full">
              {/* <h2 class="text-xl text-gray-900 font-medium title-font mb-2">Graph</h2> */}
              <Line data={graph} />
            </div>
          </div>
        </div>
      </div>
      {/* <div class="flex flex-wrap w-full bg-white py-5 px-10 relative ">
         <div className="flex flex-col bg-white py-4 px-2 w-full border border-gray-200 mt-4">
        <div className="text-[14px] text-[#333333] font-semibold">NEAR BUSINESSES</div>
        <div className="border-[1px] border-[#6d6c6c] opacity-30 my-2"></div>
        {data.map((item, index) => (
          <div className="flex flex-row my-[2px] w-full" key={index}>
            <div className="text-[14px] text-[#333333] opacity-70 w-[50%]">
              {item.time}
            </div>
            <div className="text-[14px] text-[#333333] opacity-70 w-[50%]">
              {item.message}
            </div>
          </div>
        ))}
      </div>
      </div> */}

<div class="flex flex-wrap w-full bg-white py-5 px-10 relative ">
<div className="text-[14px] text-[#333333] font-semibold">NEAR BUSINESSES</div>
         <div className="flex flex-col bg-white py-4 px-2 w-full border border-gray-200 mt-4">
        <table className='w-full pr-4'>
          <thead className='border-b-2'>
            <tr className='flex justify-between text-left mb-2'>
              <th className="text-left pr-8 ml-0 pl-12">Image</th>
              <th className="text-left pr-10">Title</th>
              <th className="text-left pr-12">Address</th>
              <th className="pr-4"></th>
            </tr>
          </thead>
          <tbody>
          <div className=" opacity-30 my-2"></div>
        {data.map((item, index) => (
          <div className="flex flex-row my-[2px] w-full pl-12 pr-12 mb-4" key={index}>
            <div className="text-[14px] text-[#333333]  w-[50%]">
             {/* <img src={item.photo_urls} alt="Business" className="w-20 h-20 object-cover rounded-md" /> */}
            {item.photo_urls !=="NA" ?(
             <img src={item.photo_urls} alt="Business" className="w-20 h-20 object-cover rounded-md" />
            ): (
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
            <div className="text-[14px] text-[#333333] opacity-70 w-[50%]">
              {item.name}
            </div>
            <div className="text-[14px] text-[#333333] opacity-70 w-[50%]">
              {item.address}
            </div>
          </div>
        ))}
          </tbody>
          </table>
       
        </div>
        </div>


    </div>

      </div>
      {/* <div className="flex flex-col bg-white py-4 px-2 rounded-xl shadow-xl w-[475px] mt-8">
        <div className="text-[14px] text-[#333333] font-semibold">RECENT ACTIVITIES</div>
        <div className="border-[1px] border-[#6d6c6c] opacity-30 my-2"></div>
        {data.map((item, index) => (
          <div className="flex flex-row my-[2px] w-full" key={index}>
            <div className="text-[14px] text-[#333333] opacity-70 w-[50%]">
              {item.time}
            </div>
            <div className="text-[14px] text-[#333333] opacity-70 w-[50%]">
              {item.message}
            </div>
          </div>
        ))}
      </div> */}
    </DashboardTemplate>
  );
}

export default DashboardScreen;