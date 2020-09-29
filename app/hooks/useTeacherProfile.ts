import getTeacherProfile from "app/users/queries/getTeacherProfile"
import { useQuery, useSession } from "blitz"

export const useTeacherProfile = () => {
  // We wouldn't have to useSession() here, but doing so improves perf on initial
  // load since we can skip the getCurrentUser() request.
  const session = useSession()
  const [teacherProfile] = useQuery(getTeacherProfile, null, { enabled: !!session.userId })
  return session.userId ? teacherProfile : null
}
