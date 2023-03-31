import { CommentsContext } from '@/context/CommentContext'
import { Comment } from '@/models/comment'
import { useContext } from 'react'
import CommentComp from './Comment'
import CommentReplies from './CommentReplies'
import { RawComment, RawImage } from './types'
// import { Comment, CommentReplies, RawComment, RawImage } from './'

export default function Comments(props: { comments: Comment[] }): JSX.Element {
  // Comments Context
  // const { allDataValue } = useContext(CommentsContext)
  // const [allData, setAllData] = allDataValue

  // Images
  // const userAvatars: { [x: string]: RawImage } = allData.users
  // // Comments
  // const parentComments: RawComment[] = Object.values(allData.comments)
  // // Replies
  // const childReplies = allData.replies

  return (
    <>
      {(Array.isArray(props.comments) ? props.comments : []).map(
        (entry: Comment) => {
          console.log('🚀 ~ file: Comments.tsx:42 ~ Comments ~ entry:', entry)

          return (
            <div key={`group-${entry.id}`} className="flex flex-col gap-4">
              {/* Parent Comment */}
              <CommentComp comment={entry} />
              {/* Child Replies */}
              {/* {entry.hasReplies && (
              <CommentReplies
                rawData={childReplies[entry.id]}
                userAvatars={userAvatars}
                currentUser={props.currentUser}
                groupId={entry.id}
              />
            )} */}
            </div>
          )
        }
      )}
    </>
  )
}
