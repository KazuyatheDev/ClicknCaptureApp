import { getCameras } from '../../lib/storage';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const cameras = await getCameras();
      res.status(200).json(cameras);
    } catch (error) {
      console.error('Error fetching cameras:', error);
      res.status(500).json({ error: 'Failed to fetch cameras' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}