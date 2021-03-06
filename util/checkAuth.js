const { AuthenticationEror } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');
module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        //Bearer
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (error) {
                throw new AuthenticationEror('Invalid/Expitred token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
}