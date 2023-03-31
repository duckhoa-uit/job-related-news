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
  replyingTo?: string
  groupId?: string
  onSubmit?: () => void
}) => {
  // Comments Context
  const { allDataValue, handleAddComment } = useContext(CommentsContext)
  const [allData, setAllData] = allDataValue

  // Google Firebase Authentication API
  const auth = useAuth()
  const signedInUser = auth.user
  // Get username
  const username = signedInUser
    ? formatNoSpaces(signedInUser.name)
    : allData.demoUser

  // Read-only/Editable state of comment from current user
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Error Message Display State
  const [showError, setShowError] = useState(false)

  // Dyanmically display avatar of default demo user if no user logged in or logged in user's avatar if there is a user logged in
  const avatarImages = allData.users
  const png = signedInUser
    ? signedInUser.photo
    : avatarImages[allData.demoUser].png

  /**
   * Create a new comment id and comment object body
   * @param commentContent Text input from the user
   * @returns A unique comment id and a ready to use comment object
   */
  function createComment(commentContent: string) {
    // Get timestamp
    const timestamp = getTime()
    // Create new id
    const newId = `${username}-${timestamp}`
    // Create new Comment body
    const newCommentBody = {
      id: newId,
      content: commentContent,
      createdAt: timestamp,
      editedAt: timestamp,
      displayedDate: 'a few seconds ago',
      score: {},
      username: username,
      hasReplies: false,
    }

    return { newId, newCommentBody }
  }

  /**
   * Create a new reply id and reply comment object body
   * @param replyingTo The username of the comment's recipient
   * @param replyContent Text input from the user
   * @returns A unique reply id and a ready to use reply comment object
   */
  function createReply(replyingTo: string, replyContent: string) {
    // Get timestamp
    const timestamp = getTime()
    // Create new id
    const newId = `${username}-${timestamp}`
    // Create new reply body
    const newReplyBody = {
      id: newId,
      content: replyContent,
      createdAt: timestamp,
      editedAt: timestamp,
      displayedDate: 'a few seconds ago',
      score: {},
      replyingTo: replyingTo,
      username: username,
    }

    return { newId, newReplyBody }
  }

  /**
   * Submit a new comment after clicking the Send button
   */
  const handleClickSendButton = async () => {
    if (textareaRef.current !== null) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value
      if (stringOnlySpaces(textVal)) {
        setShowError(true)
        toast.error('Message is required')
      } else {
        // // Create new id and comment object
        // const { newId, newCommentBody } = createComment(textVal)
        // // Create deep copy of comments context state
        // let updatedComments = cloneDeep(allData)
        // // Append this to context
        // updatedComments.comments[newId] = newCommentBody
        // // Show Reset Button
        // updatedComments.showReset = true
        // // Update context
        // setAllData(updatedComments)

        // FIXME:
        await handleAddComment(textVal, null)
        // Clear textarea and error message
        textareaRef.current.value = ''
        setShowError(false)
      }
    }
  }

  /**
   * Submit a new comment reply after clicking the Reply button
   */
  const handleClickReplyButton = (): void => {
    if (
      textareaRef.current !== null &&
      props.groupId &&
      props.replyingTo &&
      props.onSubmit
    ) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value
      if (stringOnlySpaces(textVal)) {
        setShowError(true)
      } else {
        // Create new id and reply object
        const { newId, newReplyBody } = createReply(props.replyingTo, textVal)
        // Create deep copy of comments context state
        let updatedComments = cloneDeep(allData)
        // Access replies from context
        const groupId = props.groupId
        // Append this to context
        // Existing comment group exists
        console.log(groupId)
        if (updatedComments.replies[groupId]) {
          updatedComments.replies[groupId][newId] = newReplyBody
        } else {
          // No comment group exists, create one
          updatedComments.comments[groupId].hasReplies = true
          updatedComments.replies[groupId] = {}
          updatedComments.replies[groupId][newId] = newReplyBody
        }

        // Show Reset Button
        updatedComments.showReset = true
        // Update context
        setAllData(updatedComments)
        // Hide Input Field
        props.onSubmit()
        // Clear textarea
        textareaRef.current.value = ''
      }
    }
  }

  const DynamicButton = () => {
    return props.isReply ? (
      <ReplyButton handleClick={handleClickReplyButton} />
    ) : (
      <SendButton handleClick={handleClickSendButton} />
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
            <Textarea textareaRef={textareaRef} showError={showError} />
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
