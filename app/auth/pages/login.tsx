import React from "react"
import { useRouter, BlitzPage, GetServerSideProps, Router } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { getSessionContext } from "@blitzjs/server"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSessionContext(context.req, context.res)
  if (session.userId) {
    if (typeof window === "undefined") {
      context.res.writeHead(302, { Location: "/" })
      context.res.end()
    }
    Router.push("/")
  }
  return {
    props: {},
  }
}

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm onSuccess={() => router.push("/")} />
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
