import React from "react";
import './loader.css';

export default function Loader(props) {

  return (
    <div className="loader absolute top-0 right-0 left-0 bottom-0 flex bg-white z-[2] items-center">
        <div className="flex-1 text-center">
            <div className="spinner">
                <div className="bounce"></div>
            </div>
            <p className="text-2xl font-bold mt-6 mb-3">Please wait while we process these details</p>
            <p className="font-bold">This should take a few seconds</p>
        </div>
    </div>
  );
}