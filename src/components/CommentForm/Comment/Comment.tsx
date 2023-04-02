import {
  ChevronDown,
  DeleteActiveIcon,
  DeleteInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
  EllipsisHorizontal,
} from '@/components/icons'
import { CommentsContext } from '@/context/CommentContext'
import { useAuth } from '@/hooks/useAuth'
import { Comment as IComment, UpdateCommentPayload } from '@/models/comment'
import { Menu, Transition } from '@headlessui/react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import cloneDeep from 'lodash/cloneDeep'
import { Fragment, useContext, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import CommentForm from '../CommentForm'
import CommentAvatar from '../UI/CommentAvatar'
import Badge from '../UI/CommentBadge'
import { ReplyCommentBtn, UpdateButton } from '../UI/CommentButtons'
import CommentCard from '../UI/CommentCard'
import Textarea from '../UI/CommentInput'
import { getTime, stringOnlySpaces } from '../utils'

export interface CommentProps {
  comment: IComment
}
export default function Comment(props: CommentProps): JSX.Element {
  const [updating, setUpdating] = useState(false)
  const { comment } = props

  const { user } = useAuth()
  const isCurrentUser = comment.authorId === user?.id

  const { setCommentToDelete, toggleDeleteModal, updateComment } =
    useContext(CommentsContext)

  // Read-only/Editable state of comment from current user
  const [readOnly, setReadOnly] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
  const handleUpdateComment = async () => {
    // Update the read-only comment value with the new value updated in the textarea
    if (textareaRef.current !== null) {
      let textVal = textareaRef.current.value
      if (stringOnlySpaces(textVal)) {
        toast.error('Message is required')
      } else {
        setUpdating(true)
        const payload: UpdateCommentPayload = {
          message: textVal,
        }
        await updateComment(comment.id, payload)

        setUpdating(false)
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
    toggleDeleteModal()

    const newCommentToDelete = {
      parentId: comment.parentId,
      commentId: comment.id,
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
    if (!user) return <></>

    return (
      <>
        {isCurrentUser ? (
          <Menu
            as="div"
            className="relative inline-block text-left hover:bg-gray-100"
          >
            <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-1 text-sm font-medium text-black  hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <EllipsisHorizontal className="h-5 w-5  " />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={toggleReadOnly}
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                      >
                        {active ? (
                          <EditActiveIcon
                            className="mr-2 h-5 w-5 opacity-95"
                            aria-hidden="true"
                          />
                        ) : (
                          <EditInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleClickDeleteButton}
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-red-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                      >
                        {active ? (
                          <DeleteActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <DeleteInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <ReplyCommentBtn handleClick={handleReplyButtonToggle} />
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
              <div className="hidden md:block">
                <CardActions />
              </div>
            </div>

            <div id="comment">
              {isCurrentUser && !readOnly ? (
                <div className="flex flex-col gap-4">
                  <Textarea
                    content={comment.message}
                    textareaRef={textareaRef}
                  />
                  <div className="flex justify-end">
                    <UpdateButton
                      loading={updating}
                      handleClick={handleUpdateComment}
                    />
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
          parentId={comment.id}
          cbAfterSubmit={handleHideReplyInput}
        />
      )}

      {Array.isArray(comment.children) && (
        <div className="flex w-full max-w-3xl flex-row">
          <Divider />
          <div className="flex w-full flex-col gap-4">
            {comment.children &&
              (comment.children || []).map((cmt) => (
                <Comment key={cmt.id} comment={cmt} />
              ))}
          </div>
        </div>
      )}
    </>
  )
}
