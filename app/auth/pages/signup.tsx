import React from "react"
import { useRouter, BlitzPage, Router, GetServerSideProps } from "blitz"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { getSessionContext } from "@blitzjs/server"

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSessionContext(context.req, context.res)
//   if (session.userId) {
//     if (typeof window === "undefined") {
//       context.res.writeHead(302, { Location: "/" })
//       context.res.end()
//     }
//     Router.push("/")
//   }
//   return {
//     props: {},
//   }
// }

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push("/onboarding")} />
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
