'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.handleNotFoundRoute = void 0
const handleNotFoundRoute = (req, res) => {
  const responseMessage = res.status(404).json({
    success: false,
    message: 'Bad Request',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Page Not Found',
      },
    ],
  })
  return responseMessage
}
exports.handleNotFoundRoute = handleNotFoundRoute
