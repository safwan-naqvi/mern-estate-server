import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(`Verifying token ${JSON.stringify(req.cookies)}`);

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(`verify token error: ${err}`);
      return next(errorHandler(403, "Forbidden"));
    }

    req.user = user;
    next();
  });
};
