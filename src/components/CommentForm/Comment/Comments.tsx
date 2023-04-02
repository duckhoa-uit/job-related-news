import { Comment } from '@/models/comment'
import CommentComp from './Comment'
import DeleteCommentDialog from './DeleteCommentDialog'

export default function Comments(props: { comments: Comment[] }): JSX.Element {
  return (
    <>
      {(Array.isArray(props.comments) ? props.comments : []).map(
        (entry: Comment) => {
          return (
            <div key={`group-${entry.id}`} className="flex flex-col gap-4">
              <CommentComp comment={entry} />
            </div>
          )
        }
      )}
      <DeleteCommentDialog />
    </>
  )
}
