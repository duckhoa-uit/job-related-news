interface AvatarProps {
  src: string
  large?: boolean
}

export default function CommentAvatar(props: AvatarProps): JSX.Element {
  const dimension: number = props.large ? 50 : 32
  return (
    // Use webp for browsers that support it (Chrome, Firefox, Edge)
    // Fall back on png for browsers that don't support (Safari, IE)
    <picture>
      {/* <source srcSet={props.src} type={'image/webp'} /> */}
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
