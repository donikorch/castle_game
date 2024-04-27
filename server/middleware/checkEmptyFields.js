 
function checkEmptyFields(req, res, next) {
    if (req.body) {
        for (let key in req.body) {
            if (req.body[key] === '') {
                return res.status(400).json({ error: `${key} cannot be empty` });
            }
        }
    }
    next();
}

module.exports = checkEmptyFields;