import React, { useState } from 'react';
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import { Bar } from "react-chartjs-2";

function IntegrationsScreen() {
  const [developerMode, setDeveloperMode] = useState(false);

  const bar_data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Link Views",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardTemplate pageTitle={"Integration"}>
      <div className="flex flex-col justify-center text-normal bg-white">
        <div className="flex justify-center text-3xl py-12">
          <label htmlFor="developerMode">Developer Mode&nbsp;&nbsp;</label>
          <input
            type="checkbox"
            id="developerMode"
            name="mode"
            value="developer"
            checked={developerMode}
            onChange={(e) => setDeveloperMode(e.target.checked)}
          />
        </div>
        {developerMode && (
          <>
            <div className="p-8 flex flex-col justify-center">
              <div className="my-2 text-lg">Web View Link</div>
              <div className="flex flex-row">
                <div className="w-1/3">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="ml-8 flex justify-end items-center">
                  <button className="p-2 px-4 bg-blue-500 text-white rounded">
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className="py-12 px-8">
              <div className='text-3xl font-normal'>Link Views</div>
              <Bar data={bar_data} />
            </div>
          </>
        )}
      </div>
    </DashboardTemplate>
  );
}

export default IntegrationsScreen;
