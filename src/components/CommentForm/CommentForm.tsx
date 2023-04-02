import { useRef, useState, useContext, useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import CommentCard from './UI/CommentCard'
import CommentAvatar from './UI/CommentAvatar'
import { ReplyButton, SendButton } from './UI/CommentButtons'
import Textarea from './UI/CommentInput'
import { formatNoSpaces, getTime, stringOnlySpaces } from './utils'
import { CommentsContext } from '@/context/CommentContext'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

export interface CommentInputProps {
  avatarPng: string
  avatarWebp: string
  username: string
}

const CommentForm = (props: {
  isReply: boolean
  parentId?: string
  cbAfterSubmit?: () => void
}) => {
  // Comments Context
  const { addComment, setComments, comments } = useContext(CommentsContext)
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const signedInUser = auth.user

  // Read-only/Editable state of comment from current user
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Dyanmically display avatar of default demo user if no user logged in or logged in user's avatar if there is a user logged in
  const png = signedInUser ? signedInUser.photo : '/default-avatar.webp'

  /**
   * Submit a new comment after clicking the Send button
   */
  const handleClickSendButton = async () => {
    if (textareaRef.current !== null) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value
      if (stringOnlySpaces(textVal)) {
        toast.error('Message is required')
      } else {
        setLoading(true)
        await addComment(textVal, null)
        // Clear textarea and error message
        textareaRef.current.value = ''

        setLoading(false)
      }
    }
  }

  /**
   * Submit a new comment reply after clicking the Reply button
   */
  const handleClickReplyButton = async () => {
    if (textareaRef.current !== null && props.parentId) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value
      if (stringOnlySpaces(textVal)) {
        toast.error('Message is required')
      } else {
        setLoading(true)

        await addComment(textVal, props.parentId)

        // Hide Input Field
        props.cbAfterSubmit?.()
        // Clear textarea
        textareaRef.current.value = ''
        setLoading(false)
      }
    }
  }

  const DynamicButton = () => {
    return props.isReply ? (
      <ReplyButton loading={loading} handleClick={handleClickReplyButton} />
    ) : (
      <SendButton loading={loading} handleClick={handleClickSendButton} />
    )
  }

  function ReplyCardFooter() {
    return (
      <div className={`flex flex-row items-center justify-between sm:hidden`}>
        <CommentAvatar src={png} />
        <DynamicButton />
      </div>
    )
  }

  // When the textarea is triggered/becomes editable, auto-focus the textarea
  useEffect(() => {
    if (textareaRef.current !== null && props.isReply) {
      textareaRef.current.focus()
    }
  }, [])

  return (
    <div className="-mt-3 mb-6">
      <CommentCard>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="hidden sm:block">
            <CommentAvatar src={png} large={true} />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Textarea textareaRef={textareaRef} />
          </div>
          <div className="hidden sm:block">
            <DynamicButton />
          </div>

          <ReplyCardFooter />
        </div>
      </CommentCard>
    </div>
  )
}

export default CommentForm
