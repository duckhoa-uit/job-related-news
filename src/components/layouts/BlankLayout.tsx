import { BlankLayoutProps } from './types'

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <div className="h-screen">
      <div className="relative min-h-screen overflow-hidden">{children}</div>
    </div>
  )
}

export default BlankLayout
