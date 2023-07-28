'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const cors_1 = __importDefault(require('cors'))
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
)
const routes_1 = require('./app/routes')
const handleNotFoundRoute_1 = require('./errors/handleNotFoundRoute')
const app = (0, express_1.default)()
// Middleware
app.use((0, cors_1.default)())
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
// Routes
app.get('/', (req, res) => {
  res.send('initial setup completed')
})
// handling all main routes in separate folder to not to polute app.ts
app.use('/api/v1', routes_1.mainRoutes.routers)
// Error handling middleware
app.use((err, req, res, next) => {
  ;(0, globalErrorHandler_1.default)(err, req, res, next)
})
// handle page not found
app.use(handleNotFoundRoute_1.handleNotFoundRoute)
exports.default = app
