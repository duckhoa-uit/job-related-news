import { useCallback } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import DropzonePreview from './DropzonePreview'
import { ErrorMessage } from '@hookform/error-message'

export interface FileProp {
  name: string
  type: string
  size: number
  mode: 'update' | 'append'
}
const Dropzone: React.FC<IDropzoneProps> = ({
  name,
  placeholder,
  accept,
  mode = 'update',
  maxFiles,
  maxSize,
  ...rest
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const files: File[] = watch(name)

  const onDrop = useCallback(
    (droppedFiles) => {
      /*
         This is where the magic is happening.
         Depending upon the mode we are replacing old files with new one,
         or appending new files into the old ones, and also filtering out the duplicate files.
      */
      let newFiles =
        mode === 'update' ? droppedFiles : [...(files || []), ...droppedFiles]
      if (mode === 'append') {
        newFiles = newFiles.reduce((prev: File[], file: File) => {
          const fo = Object.entries(file)
          if (
            prev.find((e: File) => {
              const eo = Object.entries(e)
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1]
              )
            })
          ) {
            return prev
          } else {
            return [...prev, file]
          }
        }, [])
      }
      // End Magic.
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, name, mode, files]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  })
  const handleRemoveFile = useCallback(
    (file: FileProp) => {
      const uploadedFiles = [...files]
      const filtered = uploadedFiles.filter(
        (i: FileProp) => i.name !== file.name
      )
      setValue(name, filtered, { shouldValidate: true })
    },
    [files]
  )
  return (
    <>
      <div
        {...getRootProps()}
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-gray-600"
      >
        <input {...register(name)} id={name} {...getInputProps()} {...rest} />
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white px-1 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-indigo-200"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-zinc-600 dark:text-zinc-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="text-red-600">{message}</span>
        )}
      />

      {!!files?.length && (
        <ul className="-m-1 mt-3 flex flex-1 flex-wrap">
          {files.map((file, idx) => {
            return (
              <DropzonePreview
                file={file}
                src={URL.createObjectURL(file)}
                onRemoveFile={handleRemoveFile}
                key={idx}
              />
            )
          })}
        </ul>
      )}
    </>
  )
}

export default Dropzone

interface IDropzoneProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'accept'
  > {
  name: string
  placeholder?: string
  mode?: 'update' | 'append'
  maxFiles?: number
  maxSize?: number
  accept?: Accept
}
