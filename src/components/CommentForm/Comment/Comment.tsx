import { useContext, useState, useRef } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import {
  formatNoSpaces,
  getTime,
  stringifyTime,
  stringOnlySpaces,
} from '../utils'
import { CommentsContext } from '@/context/CommentContext'
import CommentCard from '../UI/CommentCard'
import CommentAvatar from '../UI/CommentAvatar'
import Badge from '../UI/CommentBadge'
import Textarea from '../UI/CommentInput'
import Popover from '../UI/CommentPopover'
import { Reply, Edit, Delete, UpdateButton } from '../UI/CommentButtons'
import CommentForm from '../CommentForm'
import { Comment as IComment } from '@/models/comment'
import { useAuth } from '@/hooks/useAuth'
import { formatDistanceToNow, parseISO } from 'date-fns'

export interface CommentProps {
  // commentId: string
  // groupId: string
  // content: string
  // score: { [s: string]: number }
  // replyingTo?: string
  // hasReplies: boolean
  // avatarPng: string
  // avatarWebp: string
  // username: string
  // createdAt: number
  // editedAt: number
  // displayedDate: string
  // currentUser: string

  comment: IComment
}
export default function Comment(props: CommentProps): JSX.Element {
  const { comment } = props
  console.log('🚀 ~ file: Comment.tsx:39 ~ Comment ~ comment:', props)

  // Determine if the author of the current comment is the current user logged in
  const { user } = useAuth()
  const isCurrentUser = comment.authorId === user?.id

  // Comments state and Delete comment modal state
  const { allDataValue, modalValue, commentToDeleteValue } =
    useContext(CommentsContext)
  const [allData, setAllData] = allDataValue
  const [showModal, handleModalToggle] = modalValue
  const [commentToDelete, setCommentToDelete] = commentToDeleteValue

  // Read-only/Editable state of comment from current user
  const [readOnly, setReadOnly] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Error Message Display State
  const [showError, setShowError] = useState(false)

  // Toggle for displaying a new reply input under comment
  const [showReplyInput, setShowReplyInput] = useState(false)

  /**
   * Toggle between a read-only view and edit-view of a comment written by the current user.
   * Note: this only applies to comments written by the current user.
   */
  const toggleReadOnly = () => {
    setReadOnly(!readOnly)
  }

  /**
   * Toggle the editable textarea reply under a read-only comment.
   */
  const handleReplyButtonToggle = () => {
    setShowReplyInput(!showReplyInput)
  }

  /**
   * Hide the editable textarea reply under a read-only comment.
   */
  const handleHideReplyInput = () => {
    setShowReplyInput(false)
  }

  /**
   * Submit an update to a comment written by the current user.
   * Note: this only applies to comments written by the current user.
   */
  const handleUpdateComment = () => {
    // Update the read-only comment value with the new value updated in the textarea
    if (textareaRef.current !== null) {
      let textVal = textareaRef.current.value
      if (stringOnlySpaces(textVal)) {
        setShowError(true)
      } else {
        // Create deep copy of the comments context state
        let updatedComments = cloneDeep(allData)

        // Determine if this is a parent comment or reply
        const isParent = !comment.parentId
        // Update comment content value (and timestamp if content changed)
        if (isParent) {
          updatedComments.comments[props.groupId].content = textVal
          if (allData.comments[props.groupId].content !== textVal) {
            updatedComments.comments[props.groupId].editedAt = getTime()
          }
        } else {
          updatedComments.replies[props.groupId][props.commentId].content =
            textVal
          if (
            allData.replies[props.groupId][props.commentId].content !== textVal
          ) {
            updatedComments.replies[props.groupId][props.commentId].editedAt =
              getTime()
          }
        }

        // Show Reset Button
        updatedComments.showReset = true
        // Update context state
        setAllData(updatedComments)
        // Remove error message
        setShowError(false)
        // Change the comment card from edit-view to read-only
        toggleReadOnly()
      }
    }
  }

  /**
   * Show the Delete Modal and update context with the current comment's groupId and commentId
   */
  const handleClickDeleteButton = () => {
    // Show Delete Modal
    handleModalToggle()

    // Pass the current comment's groupId and commentId to context state
    const newCommentToDelete = {
      groupId: props.groupId,
      commentId: props.commentId,
    }
    setCommentToDelete(newCommentToDelete)
  }

  function CardHeader(): JSX.Element {
    // Check if comment has been edited
    const isEdited = comment.createdAt !== comment.updatedAt

    const formattedCreatedAt = formatDistanceToNow(parseISO(comment.createdAt))
    let formattedEditedAt = formatDistanceToNow(parseISO(comment.updatedAt))

    return (
      <div className="flex flex-row items-center gap-4">
        <div>
          <CommentAvatar src={comment.author.photo} />
        </div>
        <h1 className="font-medium text-[#324152] dark:text-white">
          {comment.author.name}
        </h1>
        {isCurrentUser && <Badge />}

        <div className="min-[400px]:text-base flex flex-row items-center justify-start text-sm">
          <p>{formattedCreatedAt}</p>

          {/* TODO: add edited text */}
          {/* <Popover position="top" label={`Edited ${formattedEditedAt}`}>
            {isEdited ? (
              <div className="italics hover:text-moderateBlue dark:hover:text-lightGrayishBlue text-xs hover:underline">
                <p className="sm:hidden">*</p>
                <p className="hidden pl-1 sm:block">(Edited)</p>
              </div>
            ) : (
              <></>
            )}
          </Popover> */}
        </div>
      </div>
    )
  }

  function CardActions(): JSX.Element {
    return (
      <>
        {isCurrentUser ? (
          <div className="flex flex-row gap-4">
            <Delete handleClick={handleClickDeleteButton} />
            <Edit handleClick={toggleReadOnly} readOnly={readOnly} />
          </div>
        ) : (
          <Reply handleClick={handleReplyButtonToggle} />
        )}
      </>
    )
  }

  function CardFooterMobile(): JSX.Element {
    return (
      <div className="flex flex-row justify-between md:hidden">
        <CardActions />
      </div>
    )
  }

  function ReplyingTo(props: { username: string }): JSX.Element {
    return (
      <div className="text-moderateBlue dark:text-darkModeModerateBlue mr-1 inline-block font-medium">
        @{props.username}
      </div>
    )
  }

  function Divider(): JSX.Element {
    return (
      <div className="ml-0 mr-4 w-1 border-r-[1px] border-slate-100 dark:bg-slate-200 sm:mx-8"></div>
    )
  }

  return (
    <>
      <CommentCard>
        <div className="flex h-full flex-col justify-between sm:flex-row sm:justify-start sm:gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-row justify-between">
              <CardHeader />
              {/* TODO: need to added */}
              {/* <div className="hidden md:block">
                <CardActions />
              </div> */}
            </div>

            <div id="comment">
              {isCurrentUser && !readOnly ? (
                <div className="flex flex-col gap-4">
                  <Textarea
                    content={comment.message}
                    textareaRef={textareaRef}
                    showError={showError}
                    currentUser={true}
                  />
                  <div className="flex justify-end">
                    <UpdateButton handleClick={handleUpdateComment} />
                  </div>
                </div>
              ) : (
                <>{comment.message}</>
              )}
            </div>

            <CardFooterMobile />
          </div>
        </div>
      </CommentCard>
      {showReplyInput && (
        <CommentForm
          isReply={true}
          // replyingTo={props.username}
          // groupId={props.groupId}
          onSubmit={handleHideReplyInput}
        />
      )}

      <div className="flex w-full max-w-3xl flex-row">
        <Divider />
        <div className="flex w-full flex-col gap-4">
          {comment.children &&
            (comment.children || []).map((cmt) => (
              <Comment key={cmt.id} comment={cmt} />
            ))}
        </div>
      </div>
    </>
  )
}
