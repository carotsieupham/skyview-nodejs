const siteRouter = require('./site');
const weatherRouter = require('./weather');

function route(app) {
    app.use('/', siteRouter);
    app.use('/weather', weatherRouter);
}
module.exports = route;
