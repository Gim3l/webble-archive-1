import * as z from "zod"

export const CreateTeacherProfileInput = z.object({
  classroomName: z.string().min(2).max(20),
})
