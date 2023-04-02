import { CommentsContext } from '@/context/CommentContext'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import {
  ErrorButton,
  PrimaryButton,
  SecondaryButton,
} from '../UI/CommentButtons'

const TEXT = {
  DELETE_CONFIRMATION:
    "Are you sure you want to delete this comment? This will remove the comment and can't be undo.",
  BTN_NO: 'NO, CANCEL',
  BTN_YES: 'YES, DELETE',
}
export default function DeleteCommentDialog() {
  const [loading, setLoading] = useState(false)
  const { showModal, toggleDeleteModal, deleteComment } =
    useContext(CommentsContext)

  const handleDeleteComment = async () => {
    setLoading(true)

    await deleteComment()

    setLoading(false)
  }

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleDeleteModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete comment
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {TEXT.DELETE_CONFIRMATION}
                  </p>
                </div>

                <div className="mt-4 flex w-full flex-col items-center justify-center gap-2">
                  <SecondaryButton
                    label={TEXT.BTN_NO}
                    handleClick={toggleDeleteModal}
                  />
                  <ErrorButton
                    loading={loading}
                    loadingText="Deleting"
                    handleClick={handleDeleteComment}
                    label={TEXT.BTN_YES}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
