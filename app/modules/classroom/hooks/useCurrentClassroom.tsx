import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useParam, useQuery } from "blitz"
import { useEffect } from "react"
import getClassroom from "../queries/getClassroom"

function useCurrentClassroom() {
  const classroomId = useParam("classroomId", "number")
  useEffect(() => {
    console.log(classroomId, "Classroom ID")
  }, [classroomId])
  const user = useCurrentUser()
  const [classroom] = useQuery(
    getClassroom,
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
              every: {
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

  return !!classroom?.id ? classroom : null
}

export default useCurrentClassroom
