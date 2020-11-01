import formidable from "formidable"
import * as fs from "fs"
import { Client } from "minio"

export const config = {
  api: {
    bodyParser: false,
  },
}

export const minioClient = new Client({
  endPoint: "ewr1.vultrobjects.com",
  useSSL: true,
  accessKey: "ZF6ES7SY3085XF7OL6LI",
  secretKey: "UecuGHHpXukV9xF54WllP9qkWGGKrA34noFUAKSY",
})

const route = async (req, res) => {
  // configure minio client

  const form = new formidable.IncomingForm()
  form.uploadDir = "./"
  form.keepExtensions = true
  const { path } = req.query

  form.parse(req, (err, fields, files) => {
    // console.log(err, fields, files);
    console.log(files.files)
    const file = files.files

    minioClient
      .putObject(
        path[0],
        `${[...path.slice(1)].join("/")}/${file.name}`,
        fs.readFileSync(file.path)
        // "/" + path[1]
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    return res.send("success")
  })
}

export default route
