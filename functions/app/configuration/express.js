const express = require('express');
const cors = require('cors')({origin: true});

module.exports = () => {

    const app = express();
    
    app.use(express.json());
    app.use(cors);

    // a basic check to confirm connectivity
    app.get('/', (req, res) => {
        res.status(200).json({'message': 'Server is up!'});
    });

    // the auth routes
    require('../routes/auth')(app);
    // the access request routes
    require('../routes/accessRequest')(app);
    // the disruptive routes
    require('../routes/disruptive')(app);

    return app;
}