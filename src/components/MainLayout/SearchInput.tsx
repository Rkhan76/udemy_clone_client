// src/components/SearchInput.tsx
import React from 'react'
import { Input } from '../ui/input' // Adjust the import path based on your structure
import { Search } from 'lucide-react'

export const SearchInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="Search for anything"
        className="pl-12 py-3 w-full max-w-2xl rounded-2xl" // Increased padding, height, width, and font size
        {...props}
      />
    </div>
  )
}


