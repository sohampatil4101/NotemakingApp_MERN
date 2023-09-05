const jwt = require('jsonwebtoken');
const JWT_SECRET = 'masknxanxlanla';

const fetchuser = (req, res, next) =>{
    // get user from the jwt token and add id to req body object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
    } catch (error) {
        res.send(401).send({error: "Please authenticate using valid token"})
        
    }
    next()
}
module.exports = fetchuser