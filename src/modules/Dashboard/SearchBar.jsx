import React from "react";
// import { SearchIcon } from "@heroicons/react/outline"; // Assuming you have the SearchIcon component from Heroicons

function SearchBar() {
  return (
    <div className="flex items-center border rounded-md">
      <input
        type="text"
        placeholder="Search..."
        className="outline-none"
      />
      {/* <SearchIcon className="w-5 h-5 text-gray-400" /> */}
    </div>
  );
}

export default SearchBar;
