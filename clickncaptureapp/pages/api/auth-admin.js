export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    
    // Use environment variable if available, fallback to hardcoded password for development
    const adminPassword = process.env.ADMIN_PASSWORD || 'password321';
    
    if (password === adminPassword) {
      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}