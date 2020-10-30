import * as z from "zod"

export const CreateTeacherProfileInput = z.object({
  classroomName: z.string().min(2).max(20),
})

export const CreateStudentProfileInput = z.object({
  classroomCode: z.string().length(7).optional(),
})
