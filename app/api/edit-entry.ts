import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const { id, title, content } = req.body
  try {
    if (!id || !title || !content) {
      return res.status(400).json({ message: "`id`,`title`, and `content` are all required" })
    }

    const results = await prisma.entries.update({
      where: { id: parseInt(id.toString()) },
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
