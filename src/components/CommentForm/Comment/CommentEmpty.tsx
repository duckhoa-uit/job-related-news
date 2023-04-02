import CommentCard from '../UI/CommentCard'
export default function EmptyComments(): JSX.Element {
  return (
    <CommentCard>
      <h1 className="text-xl font-medium">No more comments!</h1>
      <div className="border-lightGray flex flex-row gap-2 border-b-2">
        <p className="text-grayishBlue pb-4 text-sm">
          Feel free to add a new comment above
        </p>
        <p className="animate-bounce">👆</p>
      </div>
      <p className="text-grayishBlue pt-4 text-sm">
        {`Also congratulations on reaching this boundary edge case! 🎉 Are you a tester? 😜 Or just curious?`}
      </p>
    </CommentCard>
  )
}
