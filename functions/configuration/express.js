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
    require('../routes/request')(app);

    return app;
}