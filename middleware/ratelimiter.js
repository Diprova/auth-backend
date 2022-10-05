const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: {
        message: 'Too many login attempts from this IP. Please try again later.'
    },
    handler: (res, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

})

module.exports = limiter