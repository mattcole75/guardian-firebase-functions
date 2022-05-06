const admin = require('firebase-admin');

const authenticate = async (req, next) => {

    const { idtoken } = req.headers

    if (!idtoken)
        next({ status: 401, message: 'Unauthorised' }, null);

    // if (!idToken.startsWith('Bearer'))
    //     return res.status(401).send({ message: 'Unauthorised' });

    // const split = authorization.split('Bearer ')
    // if (split.length !== 2)
    //     return res.status(401).send({ message: 'Unauthorised' });

    // const token = split[1]

    try {
        const decodedToken = await admin.auth().verifyIdToken(idtoken);
        console.log("decodedToken", JSON.stringify(decodedToken));
        const res = { uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };
        
        next(null, {status: 200, data: res });
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        next({ status: 401, message: 'Unauthorised' }, null);
    }
}

module.exports = authenticate;