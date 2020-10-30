import { Ctx } from "blitz"
import db, { FindManyResourceFolderArgs } from "db"

export type GetClassroomFoldersInput = {
  where: FindManyResourceFolderArgs["where"]
  include: FindManyResourceFolderArgs["include"]
}

export default async function getClassroomFolders(
  { where, include }: GetClassroomFoldersInput,
  ctx: Ctx
) {
  ctx.session.authorize(["teacher", "student"])
  return db.resourceFolder.findMany({
    where,
    include,
  })
}
