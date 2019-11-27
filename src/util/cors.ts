import { Request, Response, NextFunction } from 'express';

export const allowOrigins = (origins: { allowedOrigins: string[] }) => (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin
  if (origins.allowedOrigins.indexOf(origin as string) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
}