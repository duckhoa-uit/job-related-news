import { createContext, ReactNode, useEffect, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { useRouter } from 'next/router'
import { commentApi } from '@/api'
import {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from '@/models/comment'
import toast from 'react-hot-toast'
import { CommentValuesType } from './types'
import { isEmpty } from 'lodash'

export const INITIAL_JSON = {
  demoUser: 'juliusomo',
  users: {
    amyrobson: {
      png: '/images/avatars/image-amyrobson.png',
      webp: '/images/avatars/image-amyrobson.webp',
    },
    maxblagun: {
      png: '/images/avatars/image-maxblagun.png',
      webp: '/images/avatars/image-maxblagun.webp',
    },
    ramsesmiron: {
      png: '/images/avatars/image-ramsesmiron.png',
      webp: '/images/avatars/image-ramsesmiron.webp',
    },
    juliusomo: {
      png: '/images/avatars/image-juliusomo.png',
      webp: '/images/avatars/image-juliusomo.webp',
    },
  },
  comments: {
    'amyrobson-1667275200000': {
      id: 'amyrobson-1667275200000',
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: 1667275200000,
      editedAt: 1667275200000,
      displayedDate: '1 month ago',
      score: {
        demo: 12,
      },
      username: 'amyrobson',
      hasReplies: false,
    },
    'maxblagun-1669266000000': {
      id: 'maxblagun-1669266000000',
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: 1669266000000,
      editedAt: 1669266000000,
      displayedDate: '2 weeks ago',
      score: {
        demo: 5,
      },
      username: 'maxblagun',
      hasReplies: true,
    },
  },
  replies: {
    'maxblagun-1669266000000': {
      'ramsesmiron-1669870800000': {
        id: 'ramsesmiron-1669870800000',
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: 1669870800000,
        editedAt: 1669870800000,
        displayedDate: '1 week ago',
        score: {
          demo: 4,
        },
        replyingTo: 'maxblagun',
        username: 'ramsesmiron',
      },
      'juliusomo-1670302800000': {
        id: 'juliusomo-1670302800000',
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: 1670302800000,
        editedAt: 1670302800000,
        displayedDate: '2 days ago',
        score: {
          demo: 2,
        },
        replyingTo: 'ramsesmiron',
        username: 'juliusomo',
      },
    },
  },
  showReset: false,
}

const defaultValues: CommentValuesType = {
  comments: [],
  setComments: () => null,
  addComment: () => null,
  updateComment: () => null,
  commentToDelete: {
    commentId: '',
    parentId: '',
  },
  setCommentToDelete: () => null,
  deleteComment: () => null,
  showModal: false,
  toggleDeleteModal: () => null,
}
export const CommentsContext = createContext(defaultValues)

export const CommentsProvider = (props: { children: ReactNode }) => {
  const [allData, setAllData] = useState(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('interactiveComments')
      if (storage) {
        const localStorageComments = JSON.parse(storage)
        return localStorageComments
      } else {
        return INITIAL_JSON
      }
    }
    return INITIAL_JSON
  })
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>([])

  // Delete Comment Modal
  const [showModal, setShowModal] = useState(false)
  const handleModalToggle = () => {
    setShowModal(!showModal)
  }
  const [commentToDelete, setCommentToDelete] = useState({
    parentId: '',
    commentId: '',
  })

  /**
   * Delete comment and their child replies, if they exist
   */
  const handleDeleteComment = async () => {
    try {
      const newComment = (await commentApi.delete(commentToDelete.commentId))
        .data
      console.log(
        '🚀 ~ file: CommentContext.tsx:139 ~ handleDeleteComment ~ newComment:',
        newComment
      )
      await fetchCommentsBySlug(router.query.slug as string)

      toast.success('Your comment has been deleted.')
    } catch (error: any) {
      toast.error(error.message)
    }
    // Hide Delete Modal
    handleModalToggle()
  }

  const handleAddComment = async (message: string, parentId: string | null) => {
    try {
      const payload: CreateCommentPayload = {
        message,
        parentId,
        postSlug: router.query.slug as string,
      }
      const newComment = (await commentApi.create(payload)).data
      await fetchCommentsBySlug(router.query.slug as string)

      toast.success('Your comment has been added.')
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const handleUpdateComment = async (
    id: string,
    comment: UpdateCommentPayload
  ) => {
    try {
      const newComment = (await commentApi.update(id, comment)).data
      await fetchCommentsBySlug(router.query.slug as string)

      toast.success('Your comment has been updated.')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // const saveNewComment = (cmt: Comment) => {
  //   const newComments = [...comments]

  //   // New comment is parent
  //   if (!cmt.parentId) {
  //     newComments.splice(0, 0, cmt)
  //     setComments(newComments)
  //     return
  //   }

  //   // New comment is child
  //   let founded = false
  //   let loopedCount = 0
  //   while (loopedCount < comments.length) {
  //     const findComment = (c: Comment) => {
  //       if (c.parentId) {
  //         loopedCount = loopedCount + 1

  //         console.log(
  //           '🚀 ~ file: CommentContext.tsx:197 ~ saveNewComment ~ loopedCount:',
  //           comments,
  //           loopedCount,
  //           c
  //         )
  //       }
  //       if (c.id === cmt.parentId) {
  //         const currentChildren = Array.isArray(c.children)
  //           ? [...c.children]
  //           : []
  //         currentChildren.push(c)
  //         c.children = currentChildren
  //         founded = true
  //         return
  //       }
  //       if (!isEmpty(c.children)) {
  //         c.children.forEach(findComment)
  //       }
  //     }
  //     newComments.forEach(findComment)
  //   }

  //   if (founded) {
  //     setComments(newComments)
  //   }
  // }

  const fetchCommentsBySlug = async (slug: string) => {
    try {
      const resComments = (
        await commentApi.getCommentsByPostSlug(slug as string)
      ).data.data
      setComments(resComments)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    let { slug } = router.query
    if (!slug) return

    fetchCommentsBySlug(Array.isArray(slug) ? slug[0] : slug)
  }, [router.query])

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        addComment: handleAddComment,
        updateComment: handleUpdateComment,
        commentToDelete,
        setCommentToDelete,
        deleteComment: handleDeleteComment,
        showModal,
        toggleDeleteModal: handleModalToggle,
      }}
    >
      {props.children}
    </CommentsContext.Provider>
  )
}
