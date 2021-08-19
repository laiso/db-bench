import { NextApiHandler } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler: NextApiHandler = async (_, res) => {
  try {
    const results = await prisma.entries.findMany({
      orderBy: [{id: 'desc'}],
      take: 10,
    })
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
