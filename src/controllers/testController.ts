import {Request, Response} from 'express'

export const testController = (req: Request, res: Response) => {
  return res.json({ok: true})
}
