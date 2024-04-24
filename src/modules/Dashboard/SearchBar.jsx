import React from "react";
//  import { IoSearchSharp } from 'react-icons-io5';


function SearchBar() {
  return (
    <div className="flex items-center border rounded-lg p-2  w-[30vw]">
      <input
        type="text"
        placeholder="Search..."
        className="outline-none bg-none"
      />
      {/* <IoSearchSharp className="w-5 h-5 text-gray-400" /> */}
    </div>
  );
}

export default SearchBar;
