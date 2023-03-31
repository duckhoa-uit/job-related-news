import Image from 'next/future/image'
import styled from 'styled-components'

const Container = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`

const PreviewContainer = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`

const PreviewInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const DropzonePreview: React.FC<IDropzonePreviewProps> = ({
  src,
  file,
  onRemoveFile,
}) => {
  const handleRemove = () => {
    onRemoveFile(file)
  }
  return (
    <li className="xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6">
      <article
        tabIndex={0}
        className="hasImage focus:shadow-outline group relative h-full w-full cursor-pointer rounded-md bg-gray-100 text-transparent shadow-sm focus:outline-none"
      >
        <div className="relative h-full w-full ">
          <Image
            src={src}
            alt="upload preview"
            className="img-preview sticky rounded-md bg-fixed object-cover"
            fill
          />
        </div>

        <section className="absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md bg-gray-400 py-2 px-3 text-xs text-white opacity-0 group-hover:bg-gray-400/50 group-hover:opacity-100">
          <h1 className="flex-1 line-clamp-2">{file.name}</h1>
          <div className="flex">
            <span className="p-1">
              <i>
                <svg
                  className="pt- ml-auto h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                </svg>
              </i>
            </span>

            <p className="size p-1 text-xs"></p>
            <button
              type="button"
              onClick={handleRemove}
              className="delete ml-auto rounded-md p-1 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                className="pointer-events-none ml-auto h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  className="pointer-events-none"
                  d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                />
              </svg>
            </button>
          </div>
        </section>
      </article>
    </li>
  )
}

export default DropzonePreview

interface IDropzonePreviewProps {
  src: string
  file: File
  onRemoveFile: (file: File) => void
}
