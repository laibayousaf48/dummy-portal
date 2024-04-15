import { IoAnalytics, IoPersonOutline } from "react-icons/io5";
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import StatCard from "../../components/StatCard.jsx";
import { PiBriefcase } from "react-icons/pi";
import AppImages from "../../assets/images/index.js";

function DashboardScreen() {
  const data = [
    { time: "10:36 am", message: "promotions ads created" },
    { time: "09:16 am", message: "new messages" },
    { time: "10:36 am", message: "promotions ads created" },
    { time: "09:16 am", message: "new messages" },
    { time: "10:36 am", message: "promotions ads created" },
    { time: "09:16 am", message: "new messages" },
  ];
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
        <div class="px-2 w-1/2 mb-4 border border-gray-300  bg-white">
          <div class="flex flex-wrap w-full bg-white sm:py-24 py-16 sm:px-10 px-6 relative">
            <div class="text-center relative z-10 w-full">
              <h2 class="text-xl text-gray-900 font-medium title-font mb-2">Maps</h2>
            </div>
          </div>
        </div>
        <div class="px-2 w-1/2 mb-4 border border-gray-300 ">
          <div class="flex flex-wrap w-full bg-white sm:py-24 py-16 sm:px-10 px-6 relative">
            <div class="text-center relative z-10 w-full">
              <h2 class="text-xl text-gray-900 font-medium title-font mb-2">Graph</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-full bg-white py-5 px-10 relative ">
         <div className="flex flex-col bg-white py-4 px-2 w-full border border-gray-200 mt-4">
        <div className="text-[14px] text-[#333333] font-semibold">RECENT</div>
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