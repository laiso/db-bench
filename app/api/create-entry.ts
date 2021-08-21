import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const { title, content } = req.body
  try {
    if (!title || !content) {
      return res.status(400).json({ message: "`title` and `content` are both required" })
    }

    const results = await prisma.entries.create({
      data: {
        title,
        content,
      },
    })

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
