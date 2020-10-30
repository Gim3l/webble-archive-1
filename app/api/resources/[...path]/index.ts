import { Client } from "minio"

const route = (req, res) => {
  const minioClient = new Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  })
  const { path } = req.query
  if (req.method === "GET") {
    const prefix = path.slice(1).join("/")
    console.log(path[0])

    const dataStream = minioClient.listObjectsV2("resources", path[0] + "/" + prefix, false, "")
    dataStream.on("data", function (obj) {
      console.log(obj)
      console.log(prefix)
    })
    dataStream.on("error", (err) => console.log(err))

    res.send("hello")
  }
}

export default route
