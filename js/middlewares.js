const authPage = (permission) => {
    return (req, res, next) => {
        const userRole = req.body.userType;
        if(permission == userRole) {
            next();
        }
        else {
            return res.send("Invalid page for user.");
        }
    }
};

module.exports = {authPage};