import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useParam, useQuery } from "blitz"
import { useEffect } from "react"
import getClassrooms from "../queries/getClassrooms"

function useCurrentClassroom() {
  const classroomId = useParam("classroomId", "number")
  useEffect(() => {
    console.log(classroomId, "Classroom ID")
  }, [classroomId])
  const user = useCurrentUser()
  const [classrooms] = useQuery(
    getClassrooms,
    {
      where: {
        id: classroomId,
        OR: [
          {
            StudentProfileOnClassroom: {
              some: {
                studentProfile: {
                  user: { AND: [{ role: { equals: "student" }, id: user?.id }] },
                },
              },
            },
          },
          {
            TeacherProfileOnClassroom: {
              some: {
                teacherProfile: {
                  user: { AND: [{ role: { equals: "teacher" }, id: user?.id }] },
                },
              },
            },
          },
        ],
      },
    },
    { enabled: !!user }
  )

  return !!classrooms?.length ? classrooms[0] : null
}

export default useCurrentClassroom
