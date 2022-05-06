// Description: The App configuration entry point set up
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const express = require('express');
const cors = require('cors')({origin: true});

module.exports = () => {

    const app = express();
    
    app.use(express.json());
    app.use(cors);

    app.get('/', (req, res) => {
        res.status(200).json({'message': 'Server is up!'});
    });

    require('../routes/auth')(app);

    return app;
}