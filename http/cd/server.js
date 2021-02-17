const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');

// Filter only XHR requests
// This needs 'X-Requested-With': 'XMLHttpRequest' set
// by calling clients.
const filter = function (pathname, req) {
    return req.xhr === true;
};

// For all angular routes, send back index.html
// For all paths without extention viz
app.get([/^(.(?!.*\.(\w+)$))*$/gm], function (req, res, next) {
    if (filter(req.path, req)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, '../../dist/elderscroll-api/index.html'));
    }
});

app.use(compression());
// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, '../../dist/elderscroll-api/')));
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
