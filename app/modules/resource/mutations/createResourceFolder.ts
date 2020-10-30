import { Ctx } from "blitz"
import db, { ResourceFolderCreateArgs } from "db"

type CreateResourceFolderInput = {
  data: ResourceFolderCreateArgs["data"]
}

export default async function createResourceFolder({ data }: CreateResourceFolderInput, ctx: Ctx) {
  ctx.session.authorize("teacher")
  return db.resourceFolder.create({ data })
}
