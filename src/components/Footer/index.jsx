import React from "react";
import MyPagination from "../Pagination";

function Footer() {
  return (
    <div className="flex  md:flex-row flex-col md:gap-0 gap-5 items-center justify-between py-4 px-7">
      <div className="flex gap-1 text-slate-600">
        <p>Showing</p>
        <p className="font-semibold">5</p>
        <p>out of</p>
        <p className="font-semibold">25</p>
        <p>entries</p>
      </div>

      <div className="">
        <MyPagination />
      </div>
    </div>
  );
}

export default Footer;
