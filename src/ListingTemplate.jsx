// import AppImages from "../../../assets/images";
// import Header from "../../common/header/Header";
import Sidebar from "./Sidebar/Sidebar";

function ListingTemplate({ 
    children,
    title = "",
    contentTitle = null,
    headerSubtitle = null,
    onSearch = null,
    buttonTitle = null,
    onButtonClick = null,
    selectBoxLabel = '',
    selectItems = [],
    onSelect = null
}) {
    return (
      <div className="bg-white">
        <div className="layout w-screen flex  dashboard">
          <div className="flex-[1_1_20%] mr-2" id="nottoshow">
            <Sidebar />
          </div>

          <div id="dash-container" className="flex-[1_1_80%]">
            <div id="nottoshows">
              {/* <Header title={title} subtitle={headerSubtitle} /> */}
            </div>

            <div id="column-container">
              <div className="bg-[#EFF0F5] h-screen w-full flex-[1_1_70%] px-5 py-7 mt-2">
                <div className="flex justify-between items-end">
                  <div className="">
                    <h2 className="font-semibold text-[20px] text-black">
                      {contentTitle ?? title}
                    </h2>
                  </div>
                  <div className="flex items-end">
                    {/* <div className="relative">
                                        <input 
                                            type="text"
                                            className="border-[1px] border-black rounded-[6px] pr-3 pl-8 py-2 text-[10px] min-w-[250px]"
                                            placeholder="Search"
                                            onChange={onSearch}
                                        />
                                        <span
                                            className="absolute left-4 top-[50%] translate-x-[-50%] translate-y-[-50%]"
                                        ><img src={AppImages.search} className="w-4" /></span>
                                    </div> */}
                    {/* <div className="ml-6">
                                        <p className="text-[10px] font-bold">{selectBoxLabel}</p>
                                        <select name="" id="" className="py-2 px-2 border-[1px] border-black rounded-[6px] text-[10px] w-[120px]" onChange={onSelect}>
                                            {selectItems.map((item, index) => (
                                                <option key={index} value={item.value}>{item.text}</option>
                                            ))}
                                        </select>
                                    </div> */}

                    {buttonTitle && (
                      <div className="ml-6">
                        <button
                          className="bg-primary text-white text-[14px] rounded-lg px-4 py-2 hover:bg-black font-semibold"
                          onClick={onButtonClick}
                        >
                          {buttonTitle}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ListingTemplate;