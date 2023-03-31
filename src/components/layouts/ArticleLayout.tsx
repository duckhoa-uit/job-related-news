import { CommentsContext } from '@/context/CommentContext'
import { useAuth } from '@/hooks/useAuth'
import { Post } from '@/models/post'
import { Comment } from '@/models/comment'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import Blocks from 'editorjs-blocks-react-renderer'
import Image from 'next/future/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import EmptyComments from '../CommentForm/Comment/CommentEmpty'
import Comments from '../CommentForm/Comment/Comments'
import CommentForm from '../CommentForm/CommentForm'
import { Container } from '../Container'
import { Prose } from '../Prose'
function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface ArticleLayoutProps {
  meta: any
  previousPathname?: string
  post: Post
  comments: Comment[]
}
export function ArticleLayout({
  post,
  previousPathname = '',
}: ArticleLayoutProps) {
  let router = useRouter()
  const { comments } = useContext(CommentsContext)

  const date = format(parseISO(post.updatedAt), 'dd MMMM yyyy', { locale: vi })

  return (
    <>
      <Head>
        <title>{`${post.title} - NewsJob`}</title>
        {/* <meta name="description" content={meta.description} /> */}
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-3xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}

            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {post.title}
                </h1>
                <time
                  dateTime={date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{date}</span>
                </time>
              </header>

              <div className="relative h-96 w-full">
                <Image
                  src={post.cover}
                  alt=""
                  className="mt-6 h-full w-full rounded-2xl object-cover"
                  fill
                />
              </div>

              <Prose className="mt-8">
                {post && <Blocks data={post.content} />}
              </Prose>
            </article>

            <CommentForm isReply={false} />

            <div id="card-group" className="flex flex-col">
              {(comments || []).length === 0 ? (
                <EmptyComments />
              ) : (
                <Comments comments={comments} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
