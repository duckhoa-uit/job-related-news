import { categoryApi, mediaApi } from '@/api'
import { postApi } from '@/api/post-api'
import Dropzone from '@/components/form-controls/Dropzone'
import SelectField from '@/components/form-controls/SelectField'
import TextField from '@/components/form-controls/TextField'
import { LoadingDots } from '@/components/LoadingDots'
import RichTextEditor from '@/components/RichTextEditor'
import { SimpleLayout } from '@/components/SimpleLayout'
import { OptionItem } from '@/models/common'
import { CreatePostPayload } from '@/models/post'
import { slugify } from '@/utils'
import { OutputData } from '@editorjs/editorjs'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { Rings } from 'react-loader-spinner'
interface FormInputs {
  title: string
  description: string
  categoryId: string
  cover: File
  content: string
}

const defaultValues = {
  title: '',
  description: '',
  categoryId: '',
  cover: undefined,
  content: undefined,
}

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  categoryId: yup.string().required(),
  cover: yup.mixed().test('fileSize', 'The file is too large', (value: any) => {
    console.log('🚀 ~ file: create.tsx:32 ~ file:yup.mixed ~ value:', value)
    const file = Array.isArray(value) ? value[0] : value
    if (!(file instanceof File)) return true // attachment is optional

    return file.size <= 10000000
  }),
})

export default function CreateArticle() {
  const router = useRouter()
  const [data, setData] = useState<OutputData>()
  const [categoryOpts, setCategoryOpts] = useState<OptionItem[]>([])

  const formMethods = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const watchedTitle = formMethods.watch('title')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await categoryApi.getAll()
        setCategoryOpts(
          res.data.map((cat) => ({
            label: cat.title,
            value: cat.slug,
          }))
        )
      } catch (error) {
        console.log('🚀 ~ file: create.tsx:62 ~ ; ~ error:', error)
        toast.error(error.message)
      }
    })()
  }, [])

  const onSubmit = async (values: FormInputs) => {
    try {
      const coverImg = (
        await mediaApi.uploadFiles(
          Array.isArray(values.cover) ? values.cover : [values.cover]
        )
      ).data
      const payload: CreatePostPayload = {
        title: values.title,
        description: values.description,
        slug: slugify(values.title),
        categoryId: values.categoryId,
        content: data,
        cover: coverImg[0].secure_url,
        published: true,
      }
      const res = (await postApi.create(payload)).data
      console.log('🚀 ~ file: create.tsx:92 ~ onSubmit ~ res:', res)
      toast.success('Post created successful.')
      router.push('/articles/' + res.slug)
    } catch (error) {
      toast.error(error.message)
      console.log('🚀 ~ file: create.tsx:93 ~ onSubmit ~ error:', error)
    }
  }
  return (
    <>
      <Head>
        <title>{watchedTitle ?? 'Add Post'}</title>
      </Head>

      <SimpleLayout title={'Add Post'}>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="space-y-12">
              <div className="pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <TextField name="title" label="Title" />

                  <TextField name="description" label="Short Description" />

                  <div className="col-span-full">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-100"
                    >
                      Content
                    </label>
                    <div className="mt-2 rounded-md border">
                      <RichTextEditor
                        data={data}
                        onChange={setData}
                        holder="editorjs-container"
                      />
                    </div>
                  </div>

                  <SelectField
                    label="Category"
                    name="categoryId"
                    placeholder="Select a category..."
                    options={categoryOpts}
                  />

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-100"
                    >
                      Cover photo
                    </label>
                    <Dropzone name="cover" multiple={false} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start gap-x-6">
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 py-3 px-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
              <button
                disabled
                className="mt-8 w-40 rounded-full bg-black px-4 pt-2 pb-3 font-medium text-white hover:bg-black/80"
              >
                <span className="pt-4">
                  <LoadingDots color="white" style="large" />
                </span>
              </button>
            </div>

            <div className="flex h-[250px] max-w-[670px] items-center justify-center">
              <Rings
                height="100"
                width="100"
                color="black"
                radius="6"
                visible={true}
                ariaLabel="rings-loading"
              />
            </div>
          </form>
        </FormProvider>
      </SimpleLayout>
    </>
  )
}
