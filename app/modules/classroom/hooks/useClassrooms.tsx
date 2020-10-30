import { useCurrentProfile } from "app/hooks/useCurrentProfile"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useQuery } from "blitz"
import getClassrooms from "../queries/getClassrooms"

function useClassrooms() {
  const profile = useCurrentProfile()
  const user = useCurrentUser()

  return useQuery(getClassrooms, {
    where: {
      OR: [
        {
          TeacherProfileOnClassroom: {
            some: { teacherProfileId: profile?.id, teacherProfile: { user: { role: user?.role } } },
          },
        },
        {
          StudentProfileOnClassroom: {
            some: { studentProfileId: profile?.id, studentProfile: { user: { role: user?.role } } },
          },
        },
      ],
    },
    include: {
      TeacherProfileOnClassroom: {
        select: {
          teacherProfile: { select: { user: { select: { firstName: true, lastName: true } } } },
        },
      },
    },
  })
}

export default useClassrooms
