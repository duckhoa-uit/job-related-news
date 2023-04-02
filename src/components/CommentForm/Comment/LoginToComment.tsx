import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CommentAvatar from '../UI/CommentAvatar'
import CommentCard from '../UI/CommentCard'
export default function LoginToComment(): JSX.Element {
  const { user: signedInUser } = useAuth()
  const router = useRouter()
  const png = signedInUser ? signedInUser.photo : '/default-avatar.webp'

  return (
    <div className="mb-6">
      <CommentCard>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="hidden sm:block">
            <CommentAvatar src={png} large={true} />
          </div>
          <div className="flex w-full items-center gap-2">
            <Link
              href={{
                pathname: '/login',
                query: { returnUrl: router.asPath },
              }}
              className="font-medium italic text-teal-500 underline"
            >
              Login
            </Link>{' '}
            to comment
          </div>
        </div>
      </CommentCard>
    </div>
  )
}
