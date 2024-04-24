import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
// import DashboardScreen from "../Dashboard/DashboardScreen.jsx";
import Chart from "chart.js/auto";
import { Pie, Line } from "react-chartjs-2";
function ChannelsScreen() {
  const data = {
    labels: ["Audience by QR Code scans", "Audience by Service Code", "Audience by invitation"],
    datasets: [
      {
        label: "My First Dataset",
        data: [12, 19, 3],
        backgroundColor: [
          "rgb(255, 192, 203)", // Light Pink
          "rgb(211, 211, 211)", // Violet
          "rgb(192, 192, 128)", // Olive
        ],
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  const line_data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Audience",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  return <DashboardTemplate pageTitle={"Channels"}>
    <div className="bg-white py-8">
    <div className="text-3xl p-12">Audience Analytics</div>
    <div className="flex justify-center text-5xl w-[70vw] h-[70vh]">
        <Pie data={data} />
        </div>
    <div className="text-3xl p-12">Audience</div>
        <div className="flex justify-center text-5xl w-[70vw] h-[70vh] mt-8">
        <Line data={line_data} />
        </div>
    </div>

  </DashboardTemplate>;
}

export default ChannelsScreen;
