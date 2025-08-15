"use client";
import React from "react";

const AutoCompleteSpinner = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default AutoCompleteSpinner;
