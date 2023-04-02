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
import { useState } from 'react'
import PrimaryButton from '@/components/buttons/PrimaryButton'

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
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
})

const SignUpPage = () => {
  const router = useRouter()
  const formMethods = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: FormInputs) => {
    try {
      setLoading(true)
      const payload: RegisterParams = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      await authApi.register(payload)
      toast.success('Created account successful.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
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
                {/* <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button> */}
                <PrimaryButton
                  loading={loading}
                  loadingText="Signing up"
                  type="submit"
                  text="Sign up"
                />
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
