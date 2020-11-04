import { Client } from "minio"
import { getSessionContext } from "@blitzjs/server"
import fs from "fs"
import path from "path"

export const minioClient = new Client({
  endPoint: "ewr1.vultrobjects.com",
  useSSL: true,
  accessKey: "ZF6ES7SY3085XF7OL6LI",
  secretKey: "UecuGHHpXukV9xF54WllP9qkWGGKrA34noFUAKSY",
})

const route = async (req, res) => {
  // const session = (await getSessionContext(req, res)).authorize(["student", "teacher"])
  const { path } = req.query
  try {
    await minioClient.fGetObject(
      path[0],
      [...path.slice(1)].join("/"),
      path.join(__dirname, "/tmp/" + [...path.slice(1)].join("/"))
    )
  } catch (err) {
    console.log(err)
  }

  res.setHeader("Content-Type", "application/pdf")

  const fileBuffer = fs.readFileSync(
    path.join(__dirname, "/tmp/" + [...path.slice(1)].join("/")),
    "utf8"
  )
  return res.end(fileBuffer)
}

export default route
