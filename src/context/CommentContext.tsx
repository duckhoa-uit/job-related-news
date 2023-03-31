import { createContext, ReactNode, useEffect, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { useRouter } from 'next/router'
import { commentApi } from '@/api'
import { CreateCommentPayload } from '@/models/comment'
import toast from 'react-hot-toast'

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

export const CommentsContext = createContext({})

export const CommentsProvider = (props: { children: ReactNode }) => {
  const [demoUser, setDemoUser] = useState(INITIAL_JSON.demoUser)
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
  const [comments, setComments] = useState([])

  // Delete Comment Modal
  const [showModal, setShowModal] = useState(false)
  const handleModalToggle = () => {
    setShowModal(!showModal)
  }
  const [commentToDelete, setCommentToDelete] = useState({
    groupId: '',
    commentId: '',
  })

  /**
   * Delete comment and their child replies, if they exist
   */
  const handleDeleteComment = () => {
    // Create deep copy of the comments context state
    let updatedComments = cloneDeep(allData)

    // Determine if this is a parent comment or reply
    const { groupId, commentId } = commentToDelete
    const isParent = groupId === commentId

    // Delete comment and child replies
    if (isParent) {
      // If comment has replies, delete comment's replies as well
      if (updatedComments.comments[groupId].hasReplies) {
        delete updatedComments.replies[groupId]
      }
      // Delete main comment
      delete updatedComments.comments[groupId]
    }
    // Delete single reply
    else {
      delete updatedComments.replies[groupId][commentId]
    }
    // Show Reset Button
    updatedComments.showReset = true
    // Update context state
    setAllData(updatedComments)
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
      await commentApi.create(payload)
      await fetchCommentsBySlug(router.query.slug as string)
      toast.success('Your comment has been added.')
    } catch (error: any) {
      console.log(
        '🚀 ~ file: CommentContext.tsx:158 ~ handleAddComment ~ error:',
        error
      )
      toast.error(error.message)
    }
  }

  const fetchCommentsBySlug = async (slug: string) => {
    try {
      const resComments = (
        await commentApi.getCommentsByPostSlug(slug as string)
      ).data.data
      setComments(resComments)
    } catch (error: any) {
      toast.error(error.message)
      console.log('🚀 ~ file: CommentContext.tsx:162 ~ ; ~ error:', error)
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
        demoUserValue: [demoUser, setDemoUser],
        allDataValue: [allData, setAllData],
        modalValue: [showModal, handleModalToggle, handleDeleteComment],
        commentToDeleteValue: [commentToDelete, setCommentToDelete],
        comments,
        setComments,
        handleAddComment,
      }}
    >
      {props.children}
    </CommentsContext.Provider>
  )
}
