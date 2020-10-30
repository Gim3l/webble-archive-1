import formidable from "formidable"
import { Client } from "minio"
import * as fs from "fs"

export const config = {
  api: {
    bodyParser: false,
  },
}

const route = async (req, res) => {
  // configure minio client
  const minioClient = new Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  })

  const form = new formidable.IncomingForm()
  form.uploadDir = "./"
  form.keepExtensions = true
  const { classroomId } = req.query

  form.parse(req, (err, fields, files) => {
    // console.log(err, fields, files);
    console.log(files.files)
    const file = files.files

    minioClient
      .putObject(
        "resources",
        `${classroomId}/${file.name}`,
        fs.readFileSync(file.path),
        "/" + classroomId
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    return res.send("success")
  })
}

export default route
