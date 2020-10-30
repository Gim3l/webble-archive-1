import { Ctx } from "blitz"
import db, { ResourceFolderUpdateArgs } from "db"

type UpdateResourceFolderInput = {
  data: ResourceFolderUpdateArgs["data"]
  where: ResourceFolderUpdateArgs["where"]
}

export default async function updateResourceFolder(
  { data, where }: UpdateResourceFolderInput,
  ctx: Ctx
) {
  ctx.session?.authorize(["teacher"])
  return db.resourceFolder.update({ data, where })
}
