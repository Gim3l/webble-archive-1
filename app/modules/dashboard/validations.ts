import * as z from "zod"

export const JoinClassroomSchema = z.object({
  classroomCode: z.string().length(8),
})

export const CreateClassroomSchema = z.object({
  name: z.string().length(8),
})
