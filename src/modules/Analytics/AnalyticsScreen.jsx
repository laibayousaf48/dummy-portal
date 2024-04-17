import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import DashboardScreen from "../Dashboard/DashboardScreen.jsx";
import { useState } from "react";
function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const handleLoad = () => {
    console.log("loading completed")
    setLoading(false); 
};
  return (  
    <DashboardTemplate pageTitle={"Analytics"}>
<div className="container px-5 py-24 mx-auto bg-white">
<div className="ml-8 mr-8 justify-center">
    {loading ? (
        <div className="loader">Loading...</div>
    ) : null}
    <iframe
        style={loading ? { display: 'none' } : {}} 
        src="https://www.oc92.com/app/my-business/stats?lat=31.4625383&lng=74.4085917&business_id=6453a5f9501d3f275574ecaf&os=android"
        width="100%"
        height="600px"
        onLoad={handleLoad} 
    />
</div>
</div>
    </DashboardTemplate>
  );
}

export default AnalyticsScreen;