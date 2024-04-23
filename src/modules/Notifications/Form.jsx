import axios from 'axios';
import React, { useState } from 'react';
import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // url: '',
    routeType: 'general_web_view_screen', // Initial value for route type
    contentType: 'text', // Initial value for content type
    contentBody: '' // Initial value for content body
  });
  const [loading , setLoading] = useState('')

  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: 'Title is required'
      }));
      return;
    }

    if (!formData.description) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: 'Description is required'
      }));
      return;
    }
    setLoading('1')

    const apiUrl = 'https://crm-lara-mongo-7azts5zmra-uc.a.run.app/api/broadcast-notification';
    try {
      const business_id = localStorage.getItem("Business ID");
      const response = await axios.post(apiUrl, {
        title: formData.title,
        body: formData.description,
        route_type: formData.routeType,
        route: 'https://oc92.com/notification',
        markerId:"65deedcd9135274171b0faa5",
        // business_id:`${business_id}`,
        content_type: formData.contentType,
        content_body: formData.contentBody
      });

      console.log(response.data)

      if (!response.data) {
        throw new Error('Failed to submit form data');
      }
      else{
        setLoading('')
         setFormData({
        title: '',
        description: '',
        // url: '',
        routeType: 'general_web_view_screen',
        contentType: 'text',
        contentBody: ''
      });
      }

      // If form data is successfully submitted, you may want to reset the form or show a success message
      console.log('Form data submitted successfully', response);
      setFormData({
        title: '',
        description: '',
        // url: '',
        routeType: 'general_web_view_screen',
        contentType: 'text',
        contentBody: ''
      });
      setErrors({
        title: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <DashboardTemplate pageTitle={'Add New Notification'}>
    <div className="flex justify-center md:w-full sm:m-0 items-center bg-white">
      <form onSubmit={handleSubmit} className="w-[70%] bg-[#24ACE31F] p-3 my-[50px]">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder='Enter Title'
            value={formData.title}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder='Enter Description'
            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        {/* <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder='Enter Url'
            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="routeType" className="block text-sm font-medium text-gray-700">Route Type</label>
          <select
            id="routeType"
            name="routeType"
            value={formData.routeType}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="general_web_view_screen">General Web View Screen</option>
            <option value="post_screen">Post Screen</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">Content Type</label>
          <select
            id="contentType"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="contentBody" className="block text-sm font-medium text-gray-700">Content Body</label>
          <input
            type="text"
            id="contentBody"
            name="contentBody"
            value={formData.contentBody}
            onChange={handleChange}
            placeholder='Enter Content Body'
            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {
            loading === '1' ? 'loading....':'Submit'
          }
          
        </button>
      </form>
    </div>
    </DashboardTemplate>
  );
};

export default Form;
