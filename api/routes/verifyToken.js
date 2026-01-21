const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  const authHeader = request.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; //Just give me the second element , which is  the token from Bearer token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) response.status(403).json("Token not valid!");
      request.user = user;
      next();
    });
  } else {
    return response.status(401).json("You are not authorized!");
  }
};

const verifyTokenAndAuthorization = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
      next();
    } else {
      response.status(403).json("Not Allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (request, response, next) => {
    verifyToken(request, response, () => {
      if (request.user.isAdmin) {
        next();
      } else {
        response.status(403).json("Not Allowed to do that!");
      }
    });
  };

module.exports = { verifyToken, verifyTokenAndAuthorization ,verifyTokenAndAdmin};
