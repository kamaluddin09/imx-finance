"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import type { SalaryRecord } from "../types/Types"

interface SalaryFilterProps {
  onFilter: (field: keyof SalaryRecord, query: string) => void
}

const SalaryFilter: React.FC<SalaryFilterProps> = ({ onFilter }) => {
  const [filterField, setFilterField] = useState<keyof SalaryRecord>("email")
  const [query, setQuery] = useState("")

  const handleFilterChange = () => {
    onFilter(filterField, query)
  }

  const handleClear = () => {
    setQuery("")
    onFilter(filterField, "")
  }

  return (
    <div className="flex items-center justify-end mb-6">
      <div className="flex items-center bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Enhanced Select Dropdown */}
        <div className="relative">
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value as keyof SalaryRecord)}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 px-4 py-3 text-sm font-medium text-gray-700 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 border-r border-gray-200 cursor-pointer transition-all duration-200"
          >
            <option value="email">📧 Email</option>
            <option value="salaryMonth">📅 Month</option>
            <option value="status">✅ Status</option>
          </select>
        </div>

        {/* Enhanced Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
          <input
            type="text"
            placeholder={`Search by ${filterField}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleFilterChange}
            className="pl-10 pr-10 py-3 text-sm w-64 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 placeholder-gray-400 text-gray-700 transition-all duration-200"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-all duration-150 group"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors duration-150" />
            </button>
          )}
        </div>


      </div>

      {/* Active Filter Indicator */}
      {query && (
        <div className="ml-3 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl text-sm font-medium text-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Active Filter
        </div>
      )}
    </div>
  )
}

export default SalaryFilter
