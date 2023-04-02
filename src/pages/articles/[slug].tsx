import { GetStaticPaths, GetStaticProps } from 'next'

import { commentApi, postApi } from '@/api'
import { ArticleLayout } from '@/components/layouts/ArticleLayout'
import { CommentsProvider } from '@/context/CommentContext'
import { Post } from '@/models/post'
import { Comment as CommentModel } from '@/models/comment'

type IPostUrl = {
  slug: string
}

type IPostProps = {
  post: Post
  comments: CommentModel[]
}

export const meta = {
  author: 'Adam Wathan',
  date: '2022-09-05',
  title: 'Crafting a design system for a multiplanetary future',
  description:
    'Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.',
}

const PostDetailsPage = (props: IPostProps) => {
  return (
    <CommentsProvider>
      <ArticleLayout meta={meta} {...props} />
    </CommentsProvider>
  )
}

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  try {
    const posts = (await postApi.getAll()).data.data

    return {
      paths: posts.map((post: Post) => ({
        params: {
          slug: post.slug,
        },
      })),
      fallback: true,
    }
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    }
  }
}

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const post = (await postApi.getPostBySlug(params!.slug)).data.data
  const comments = (await commentApi.getCommentsByPostSlug(params!.slug)).data
    .data

  return {
    props: {
      post,
      comments,
    },
    revalidate: 10,
  }
}

PostDetailsPage.guestGuard = true
export default PostDetailsPage
