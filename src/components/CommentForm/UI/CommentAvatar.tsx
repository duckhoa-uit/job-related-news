interface AvatarProps {
  src: string
  large?: boolean
}

export default function CommentAvatar(props: AvatarProps): JSX.Element {
  const dimension: number = props.large ? 50 : 32
  return (
    <picture>
      <img
        src={props.src}
        alt={`User avatar image`}
        height={dimension}
        width={dimension}
        className={'rounded-full'}
        referrerPolicy={'no-referrer'}
      />
    </picture>
  )
}
