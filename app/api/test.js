import { getSessionContext } from "@blitzjs/server"
const testFunc = async (req, res) => {
  const session = await getSessionContext(req, res)
  session.authorize()

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ name: session.userId }))
}

export default testFunc
