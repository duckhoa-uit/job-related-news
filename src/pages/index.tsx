// import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'

import { categoryApi, postApi } from '@/api'
import { Container } from '@/components/Container'
import Hero from '@/components/home/Hero'
import TrendingTopics from '@/components/home/TrendingTopics'
import SectionTitle from '@/components/SectionTitle'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import { Post } from '@/models/post'
import { formatDistanceToNow, parseISO } from 'date-fns'
import Image from 'next/image'
import { Card } from '../components/Card'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function MostActiveUsers() {
  let users = [
    {
      userName: 'Planetaria',
      jobTitle: 'CEO',
      logo: logoPlanetaria,
      posts: 20,
    },
    {
      userName: 'Airbnb',
      jobTitle: 'Product Designer',
      logo: logoAirbnb,
      posts: 18,
    },
    {
      userName: 'Facebook',
      jobTitle: 'iOS Software Engineer',
      logo: logoFacebook,
      posts: 15,
    },
    {
      userName: 'Starbucks',
      jobTitle: 'Shift Supervisor',
      logo: logoStarbucks,
      posts: 10,
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <SectionTitle>Most active users</SectionTitle>

      <ol className="mt-6 space-y-4">
        {users.map((user, userIndex) => (
          <li key={userIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={user.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">User&apos;s name/Role</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {user.userName} ({user.jobTitle})
              </dd>
              <dt className="sr-only">Date</dt>
              <dd className="text-xs text-zinc-400 dark:text-zinc-500">
                {user.posts} posts/m
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

const HomePage = ({ articles, topics }) => {
  console.log('🚀 ~ file: index.tsx:106 ~ HomePage ~ articles:', topics)
  return (
    <>
      <Head>
        <title>News Job</title>
        <meta
          name="description"
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
        />
      </Head>

      <Container className="pt-12 md:pt-16 lg:pt-20">
        <Hero articles={articles} />
      </Container>

      <Container className="pb-14 pt-12 md:py-20 lg:pt-24">
        <TrendingTopics topics={topics} />
      </Container>

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto max-w-xl grid-cols-2 gap-y-20 lg:grid lg:max-w-none lg:grid-cols-3">
          <div className="col-span-2">
            <Link
              href="/"
              className="relative mx-auto block w-full max-w-2xl rounded-2xl bg-gray-50 px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-none lg:px-0"
            >
              <Image
                className="h-auto w-full rounded-2xl object-cover"
                src="/_images_ads_banner.jpeg"
                alt=""
                layout="fill"
              />
            </Link>
            <div className="mx-auto grid max-w-xl gap-x-12 gap-y-14 px-4 sm:px-6 md:max-w-3xl md:grid-cols-2 md:px-8 lg:max-w-none lg:px-0">
              {articles.map((article: Post) => (
                <Card as="article" key={article.slug} className="relative">
                  <Card.PostMedia src={article.cover} />
                  <div className="z-10 mb-2 mt-4 flex w-full items-center justify-between text-gray-500">
                    <span className="inline-flex items-center rounded bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-200 dark:text-teal-800">
                      {article.category.title}
                    </span>
                    <span className="text-xs">
                      {formatDistanceToNow(parseISO(article.createdAt), {
                        includeSeconds: false,
                      })}
                    </span>
                  </div>
                  <Card.Link href={`/articles/${article.slug}`}>
                    <Card.PostBody
                      title={article.title}
                      description={article.description}
                      href={`/articles/${article.slug}`}
                    />
                  </Card.Link>
                  <Card.PostAuthor author={article.author} />
                </Card>
              ))}
            </div>
          </div>
          <div className="col-span-1 space-y-10 lg:pl-8 xl:pl-12">
            <MostActiveUsers />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {
      articles: (await postApi.getAll()).data.data,
      topics: (await categoryApi.getTrendingTopics()).data.data.slice(0, 4),
    },
  }
}

HomePage.guestGuard = true
export default HomePage
