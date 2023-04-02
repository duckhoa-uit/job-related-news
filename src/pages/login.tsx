import Head from 'next/head'

import { authApi } from '../api'
import TextField from '@/components/form-controls/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { LoginParams } from '../context/types'
import { ErrorResponse } from '@/models'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import { useState } from 'react'

interface FormInputs {
  email: string
  password: string
}

const defaultValues: FormInputs = {
  email: '',
  password: '',
}

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const formMethods = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (values: FormInputs) => {
    setLoading(true)

    const payload: LoginParams = {
      email: values.email,
      password: values.password,
    }
    await login(payload, (error) => toast.error(error.message))

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <FormProvider {...formMethods}>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formMethods.handleSubmit(onSubmit)}
              >
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
                  className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  Sign in
                </button> */}
                <PrimaryButton
                  text="Sign in"
                  type="submit"
                  loading={loading}
                  loadingText="Signing"
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <Link
                    href={{
                      pathname: '/sign-up',
                      query: router.query,
                    }}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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
LoginPage.guestGuard = true
export default LoginPage
