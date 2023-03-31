import { useState } from 'react'

export default function Popover(props: {
  children: React.ReactNode
  label: string
  position: string
}): JSX.Element {
  const [showPopover, setShowPopover] = useState(false)

  const togglePopover = (): void => {
    setShowPopover(!showPopover)
  }

  const hidePopover = (): void => {
    setShowPopover(false)
  }

  return (
    <div
      className={'min-[460px]:items-center relative flex flex-col items-end'}
      onMouseOver={togglePopover}
      onMouseLeave={hidePopover}
    >
      <div
        className={`bg-grayishBlue/80 absolute w-60 rounded-md p-2 text-center text-white
        ${showPopover ? 'visible' : 'hidden'}
        ${props.position == 'bottom' && 'top-10 md:top-8'}
        ${props.position == 'top' && 'bottom-6 w-auto'}`}
      >
        <p className="whitespace-pre text-sm">{props.label}</p>
      </div>

      {props.children}
    </div>
  )
}
