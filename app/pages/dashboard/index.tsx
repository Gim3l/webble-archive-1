import DashboardLayout from "app/layouts/DashboardLayout"
import React, { Suspense } from "react"
import { getSessionContext } from "@blitzjs/server"
import { AuthorizationError, BlitzPage, GetServerSideProps } from "blitz"
import ClassroomList from "app/components/ClassroomList"
import { Heading } from "bumbag/Heading/"
import { Box } from "bumbag/Box"
import { Text } from "bumbag/Text"

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSessionContext(context.req, context.res)

//   // if (!(session.roles.includes("tutor") || session.roles.includes("student"))) {
//   try {
//     session!.authorize(["teacher", "student"])
//   } catch (err) {
//     if (err instanceof AuthorizationError) {
//       context.res.writeHead(302, { Location: "/onboarding" })
//       context.res.end()
//     }
//   }

//   return {
//     props: {},
//   }
// }

const DashboardPage: BlitzPage = () => {
  return (
    <div>
      <Box marginBottom="major-5">
        <Heading use="h4" color="#000">
          Classrooms
        </Heading>
        <Text use="strong">9 Classrooms Discovered</Text>
      </Box>
      <Suspense fallback="Loading...">
        <ClassroomList></ClassroomList>
      </Suspense>
    </div>
  )
}

DashboardPage.getLayout = (page) => (
  <DashboardLayout title="Dashboard" heading="Dashboard" noSideBar>
    {page}
  </DashboardLayout>
)

export default DashboardPage
