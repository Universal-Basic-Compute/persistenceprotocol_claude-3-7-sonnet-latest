import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    status: 'ok',
    version: process.env.NEXT_PUBLIC_VERSION || '1.0.0',
    timestamp: new Date().toISOString()
  });
}
