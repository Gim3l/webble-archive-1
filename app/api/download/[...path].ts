import { Client } from "minio"
import { getSessionContext } from "@blitzjs/server"
import path from "path"

export const minioClient = new Client({
  endPoint: "ewr1.vultrobjects.com",
  useSSL: true,
  accessKey: "ZF6ES7SY3085XF7OL6LI",
  secretKey: "UecuGHHpXukV9xF54WllP9qkWGGKrA34noFUAKSY",
})

const route = async (req, res) => {
  // const session = (await getSessionContext(req, res)).authorize(["student", "teacher"])
  const { path: s3_path } = req.query
  const stream = await minioClient.getObject(s3_path[0], [...s3_path.slice(1)].join("/"))

  // const fs_path = require('path')
  const ext = path.extname(s3_path.join("/")).split(".")[1]
  let contentType
  switch (ext) {
    case "doc":
      contentType = "application/msword"
      break
    case "docx":
      contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      break
    case "png":
      contentType = "image/png"
      break
    case "jpg":
      contentType = "image/jpg"
      break
    case "jpeg":
      contentType = "image/jpeg"
      break
    case "pdf":
      contentType = "application/pdf"
      break
    case "ppt":
      contentType = "application/vnd.ms-powerpoint"
      break
    case "pptx":
      contentType =
        "applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation"
      break
    case "xls":
      contentType = "application/vnd.ms-excel"
      break
    case "xlsx":
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      break
    default:
      contentType = null
      break
  }

  if (contentType) {
    res.setHeader("Content-Type", `${contentType}`)
  }

  return res.send(stream)
}

export default route
