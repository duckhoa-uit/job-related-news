import SectionTitle from '@/components/SectionTitle'
import { Category } from '@/models/category'
import Link from 'next/link'
import React from 'react'

const Topic = ({ data }: { data: Category }) => {
  return (
    <div className="relative z-0 h-40 translate-y-0 cursor-pointer overflow-hidden rounded-2xl  shadow-md  transition duration-300 ease-in-out hover:-translate-y-1 focus-visible:ring">
      <Link
        className="absolute inset-0 z-10 w-full rounded-2xl shadow-md"
        href="/categories/culture"
      />
      <div
        style={{
          backgroundImage: data.cover
            ? `url(${data.cover})`
            : 'url(/avatar.jpeg)',
        }}
        className={`absolute inset-x-0 z-[-1px] h-full w-full bg-gray-100  bg-cover bg-center bg-no-repeat`}
      />
      <div className="absolute inset-x-0 bottom-0 w-full pb-6">
        <div className="flex w-full justify-center">
          <span className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur-lg">
            {data.title}
          </span>
        </div>
      </div>
    </div>
  )
}
const TrendingTopics = ({ topics }: { topics: Category[] }) => {
  return (
    <>
      <SectionTitle>Trending topics</SectionTitle>
      <div className="relative mt-8 md:mt-9">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-4 xl:gap-6">
          {topics.map((tp) => (
            <Topic key={tp.id} data={tp} />
          ))}
        </div>
      </div>
    </>
  )
}

export default TrendingTopics
