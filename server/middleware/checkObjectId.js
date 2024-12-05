const mongoose = require('mongoose');

/**
 * Middleware to validate MongoDB ObjectId
 * @param {string} idToCheck - The parameter name containing the ID to validate
 */
const checkObjectId = (idToCheck) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
        return res.status(400).json({ msg: 'Invalid ID' });
    }
    next();
};

module.exports = checkObjectId;