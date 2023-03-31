import Comment from './Comment'
import { RawImage, RawReply } from './types'

interface RepliesInterface {
  rawData: { [s: string]: RawReply } | ArrayLike<RawReply>
  userAvatars: { [x: string]: RawImage }
  currentUser: string
  groupId: string
}

export default function CommentReplies(props: RepliesInterface): JSX.Element {
  // Get array of all replies for this specific comment
  const replies: RawReply[] = Object.values(props.rawData)

  function Divider(): JSX.Element {
    return (
      <div className="dark:border-darkModeCard ml-0 mr-4 w-1 border-r-2 sm:mx-8"></div>
    )
  }

  return (
    <div className="flex w-full max-w-3xl flex-row">
      <Divider />
      <div className="flex w-full flex-col gap-4">
        {replies.map((reply) => {
          const avatarImages = props.userAvatars[reply.username]
          const png = avatarImages.png
          const webp = avatarImages.webp

          return (
            <Comment
              key={reply.id}
              commentId={reply.id}
              groupId={props.groupId}
              currentUser={props.currentUser}
              content={reply.content}
              avatarPng={png}
              avatarWebp={webp}
              createdAt={reply.createdAt}
              editedAt={reply.editedAt}
              displayedDate={reply.displayedDate}
              score={reply.score}
              replyingTo={reply.replyingTo}
              username={reply.username}
              hasReplies={false}
            />
          )
        })}
      </div>
    </div>
  )
}
