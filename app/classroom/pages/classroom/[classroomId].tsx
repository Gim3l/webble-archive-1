import useCurrentClassroom from "app/classroom/hooks/useClassroom"
import DashboardLayout from "app/layouts/DashboardLayout"
import { GetServerSideProps } from "blitz"
import React, { Suspense } from "react"
import { getSessionContext } from "@blitzjs/server"

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSessionContext(context.req, context.res)

//   session!.authorize(["teacher", "student"])

//   return {
//     props: {},
//   }
// }

const Classroom = () => {
  const classroom = useCurrentClassroom()

  return <>{JSON.stringify(classroom)}</>
}

function ClassroomDashboardPage() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <Classroom></Classroom>
      </Suspense>
    </div>
  )
}

ClassroomDashboardPage.getLayout = (page) => (
  <DashboardLayout heading="Classroom Dashboard" title="Classroom Dashboard">
    {page}
  </DashboardLayout>
)

export default ClassroomDashboardPage
