"use client"

import React from "react"

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const handleClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    onPageChange(newPage)
  }

  return (
    <div className="flex items-center justify-center space-x-2  py-4 rounded-md">
      <button
        onClick={() => handleClick(page - 1)}
        disabled={page === 1}
        className="text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:text-primary transition"
      >
        Prev
      </button>

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(0, 3)
          .map((p) => (
            <button
              key={p}
              onClick={() => handleClick(p)}
              className={`px-3 py-1 rounded font-medium transition cursor-pointer ${
                p === page
                  ? "bg-primary text-black"
                  : "bg-[#0A3A46] text-white hover:bg-[#14545f]"
              }`}
            >
              {p}
            </button>
          ))}
      </div>

      <button
        onClick={() => handleClick(page + 1)}
        disabled={page === totalPages}
        className="text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:text-primary transition"
      >
        Next
      </button>
    </div>
  )
}
