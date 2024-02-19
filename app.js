const { urlencoded } = require('body-parser');
const express = require('express') // Import Express.js module
const app = express();
var logger = require('./logger').createLogger();
const morgan = require('morgan');
app.use(urlencoded({ extended: true }))

app.use(logger)
app.use('/', (request, response, next) => {
    response.json({
        status: 'connected'
    })
    return true;
});
app.use(morgan('dev'))

// 404 error page
app.use((req, res, next) => {
    res.end(`
        <!DOCTYPE html>
        <html>
            <head lang="en">
                <meta charset="utf-8">
                <link rel="stylesheet" href="styles.css">
                <title>Error 404</title>
            </head>
            <body>
                <div class="home">
                    <h1 class="home__header">Error 404</h1>
                    <p>The page you are looking for may have:</p>
                    <ul>
                        <li>Been deleted</li>
                        <li>Been moved</li>
                        <li>Never existed</li>
                        <li>Be a typo</li>
                    </ul>
                    <a href="/">Click Here to Go Home</a>
                </div>
            </body>
        </html>
    `)
})

module.exports = app
