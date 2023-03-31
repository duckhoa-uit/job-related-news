import React from 'react'

const SectionTitle = ({ children = '' }) => {
  return (
    <h3 className="relative border-b-[2px] border-gray-300 pb-3 text-xl font-medium text-gray-900 before:absolute before:bottom-[-2px] before:left-0 before:h-[2px] before:w-24 before:bg-indigo-700 before:content-['']  dark:border-gray-600 dark:text-zinc-100 dark:before:bg-indigo-600">
      {children}
    </h3>
  )
}

export default SectionTitle
