export default function handler(req, res) {
  console.log('Health check called:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
  });

  return res.status(200).json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.url,
  });
}
