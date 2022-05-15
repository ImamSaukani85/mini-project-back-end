const middleware = require('../middleware')
const controller = require('../controller/authcontroller');

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
            )
            next();
    })

    app.post('/api/auth/register', middleware.isUserExist, controller.register)
    app.post('/api/auth/login', controller.login)
}