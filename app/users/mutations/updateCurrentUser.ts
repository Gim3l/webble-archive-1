import { SessionContext } from "blitz"
import db, { UserUpdateArgs } from "db"

type UserUpdateInput = {
  data: UserUpdateArgs["data"]
}

export default async function updateCurrentUser(
  { data }: UserUpdateInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session?.authorize()

  const user = await db.user.update({ data, where: { id: ctx.session!.userId } })

  await ctx.session!.create({ userId: user.id, roles: [user.role] })

  return user
}
