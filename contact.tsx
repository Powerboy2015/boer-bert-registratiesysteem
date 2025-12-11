"use client";
import React from 'react';

export default function Button1() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className="px-8 py-2 bg-[#007248] hover:bg-[#008f58] transition-colors duration-300 text-2xl font-bold text-[#FDF5D8] rounded-md"
      onClick={scrollToBottom}
    >
      Contact
    </button>
  );
}