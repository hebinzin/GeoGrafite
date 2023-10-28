const { VercelRequest, VercelResponse } = require('@vercel/node');

module.exports = (req, res) => {
  const { name = 'World' } = req.query;
  return res.json({
    message: `Hello, ${name}!`,
  });
};