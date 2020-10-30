import * as z from "zod"

export const CreateClassroomAssignmentInput = z.object({
  name: z.string().min(10).max(50),
  description: z.string().min(10).max(1000),
  dueDate: z.date(),
})
