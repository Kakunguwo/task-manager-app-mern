import jwt from "jsonwebtoken";
import HttpError from "../models/errorModel.js";

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    if(authorizationHeader && authorizationHeader.startsWith("Bearer ")){
        const token = authorizationHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if(err){
                return next(HttpError("Invalid token", 422));
            }

            req.user = info;
            next();
        })
    } else {
        return next(HttpError("Unauthorized, no token", 421));
    }
}

export default authMiddleware;