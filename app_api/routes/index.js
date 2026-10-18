const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Middleware to authenticate JSON Web Tokens
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('Authorization header required but not present.');
    return res.sendStatus(401);
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('Invalid Authorization header format.');
    return res.sendStatus(401);
  }

  const token = parts[1];

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.auth = verified;
    next();
  } catch (err) {
    console.log('Token validation error.');
    return res.sendStatus(401);
  }
}

// Authentication endpoints
router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

// Trip collection
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

// Individual trip
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;