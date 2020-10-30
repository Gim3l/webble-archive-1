import db, { FileCreateArgs } from "db"
import { Ctx } from "blitz"

type CreateResourceFolderInput = {
  data: FileCreateArgs["data"]
}

export default async function createResourceFile({ data }: CreateResourceFolderInput, ctx: Ctx) {
  ctx.session.authorize("teacher")

  return db.file.create({ data })
}
