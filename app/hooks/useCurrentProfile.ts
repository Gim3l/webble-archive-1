import { StudentProfile, TeacherProfile } from "@prisma/client"
import getCurrentProfile from "app/users/queries/getCurrentProfile"
import { useQuery, useSession } from "blitz"
import { useCurrentUser } from "./useCurrentUser"

export const useCurrentProfile = (): TeacherProfile | StudentProfile | null => {
  // We wouldn't have to useSession() here, but doing so improves perf on initial
  // load since we can skip the getCurrentUser() request.
  const session = useSession()

  // if (!user) return null

  const [profile] = useQuery(getCurrentProfile, null, { enabled: session?.userId })
  return session?.roles.includes("teacher") ? profile?.teacher : profile?.student
}
