    const jwt = require('jsonwebtoken');


    const Auth = (req, res, next) => {
        
        const auth = req.headers['authorization'];

        if (!auth) {
            return res.status(403).json({ message: "JWT Token Is Required" })
        }

        try {
            const decoded = jwt.verify(auth,  process.env.JWT_SECRET);
            req.user = decoded
            next();
        } catch (error) {
            return res.status(403).json({ message: "JWT Token Is Wrong", error })
        }
    }

    module.exports = Auth