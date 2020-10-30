import { Ctx } from "blitz"
import db, { ResourceFolderDeleteManyArgs } from "db"

type DeleteResourceFolderInput = {
  where: ResourceFolderDeleteManyArgs["where"]
}

export default async function deleteResourceFolder({ where }: DeleteResourceFolderInput, ctx: Ctx) {
  ctx.session.authorize("teacher")

  return db.resourceFolder.deleteMany({ where })
}
