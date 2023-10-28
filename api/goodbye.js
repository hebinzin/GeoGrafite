const { IncomingMessage, ServerResponse } = require('http');
module.exports = (req, res) => {
  const { name = 'World' } = req.query
  res.status(200).json({ message: `Goodbye ${name}!` })
}