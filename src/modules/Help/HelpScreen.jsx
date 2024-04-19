import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import { useState } from "react";
function HelpScreen() {
  const [loading, setLoading] = useState(true);
  const handleLoad = () => {
    console.log("loading completed")
    setLoading(false); 
};
  return (  
    <DashboardTemplate pageTitle={"Help"}>
<div className="container px-5 py-24 mx-auto bg-white">
<div className="ml-8 mr-8 justify-center">
    {loading ? (
        <div className="loader flex justify-center text-2xl">Loading...</div>
    ) : null}
    <iframe
        style={loading ? { display: 'none' } : {}} 
        src="https://www.oc92.com/onecall/web/help"
        width="100%"
        height="600px"
        onLoad={handleLoad} 
    />
</div>
</div>
    </DashboardTemplate>
  );
}

export default HelpScreen;