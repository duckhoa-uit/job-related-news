import Head from 'next/head'

import { authApi } from '@/api'
import TextField from '@/components/form-controls/TextField'
import { RegisterParams } from '../context/types'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import toast from 'react-hot-toast'

interface FormInputs {
  name: string
  email: string
  password: string
}

const defaultValues: FormInputs = {
  name: '',
  email: '',
  password: '',
}

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

const SignUpPage = () => {
  const router = useRouter()
  const formMethods = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (values: FormInputs) => {
    try {
      const payload: RegisterParams = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      const res = await authApi.register(payload)
      console.log('🚀 ~ file: sign-up.tsx:44 ~ onSubmit ~ res:', res)
      toast.success('Created account successful.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        {/* <meta
          name="description"
          content="Things I’ve made trying to put my dent in the universe."
        /> */}
      </Head>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 shadow-2xl shadow-gray-900/10 sm:px-6 lg:px-8">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign up
            </h1>
            <FormProvider {...formMethods}>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formMethods.handleSubmit(onSubmit)}
              >
                <TextField
                  name="name"
                  label="Full name"
                  placeholder="eg. Duc Khoa"
                />
                <TextField
                  name="email"
                  label="Email"
                  placeholder="eg. duckhoa.dev@gmail.com"
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="********"
                />
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>{' '}
                  </span>
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    href={{
                      pathname: '/login',
                      query: router.query,
                    }}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  )
}
SignUpPage.guestGuard = true
export default SignUpPage
