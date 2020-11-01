import { Client } from "minio"
import { getSessionContext } from "@blitzjs/server"
export const minioClient = new Client({
  endPoint: "ewr1.vultrobjects.com",
  useSSL: true,
  accessKey: "ZF6ES7SY3085XF7OL6LI",
  secretKey: "UecuGHHpXukV9xF54WllP9qkWGGKrA34noFUAKSY",
})

const route = async (req, res) => {
  const session = (await getSessionContext(req, res)).authorize(["student", "teacher"])

  const { path } = req.query
  //   const url = await minioClient.presignedUrl("GET", path[0], [...path.slice(1)].join("/"))
  const stream = await minioClient.getObject(path[0], [...path.slice(1)].join("/"))
  //   console.log(url)
  return res.send(stream)
}

export default route
