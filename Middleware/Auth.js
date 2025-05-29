    const jwt = require('jsonwebtoken');


    const Auth = (req, res, next) => {
        
        const auth = req.headers['authorization'];

        if (!auth || !auth.startsWith("Bearer ")) {
            return res.status(403).json({ message: "JWT Token Is Required" })
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(auth,  process.env.JWT_SECRET);
            req.user = decoded
            next();
        } catch (error) {
            return res.status(403).json({ message: "JWT Token Is Wrong", error })
        }
    }

    module.exports = Auth