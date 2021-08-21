import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  try {
    if (!id) {
      return res.status(400).json({ message: "`id` required" })
    }
    if (typeof parseInt(id.toString()) !== "number") {
      return res.status(400).json({ message: "`id` must be a number" })
    }
    const results = await prisma.entries.delete({
      where: { id: parseInt(id.toString()) },
    })
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
