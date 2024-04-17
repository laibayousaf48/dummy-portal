import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// 
import { formatTimestamp, hasUrduCharacters } from '../../utils/helpers.js';
import ShowMoreText from "react-show-more-text";
const NotificationList = () => {
  const [data, setData] = useState([]);
const navigate = useNavigate();
// import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
  // const [showComponent, setShowComponent] = useState(false);
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

  const tdClasses = `p-2 border-[1px] border-slate-100`;

  return (
    // <DashboardTemplate pageTitle={'Notification Data'}>
      <div className='bg-white'>
        <div>
        <table className='w-full pr-4'>
          <thead className='border-b-2'>
            <tr className=''>
              <th>Time</th>
              <th>Title</th>
              <th>Audience</th>
              <th>Body</th>
              <th>Content Type</th>
              <th>Content Body</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className='border-b-2 border-slate-200'>
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
        <div>
        <button className='absolute top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded' onClick={handleClick}>Add New Notification</button>

        </div>
      </div>
    // </DashboardTemplate>
  );
};

export default NotificationList;
