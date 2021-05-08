const authPage = (permission) => {
    return (req, res, next) => {
        console.log("session: " + JSON.stringify(req.session));
        const userRole = req.session.answer;
        console.log(userRole);
        console.log("Middleware: " + userRole + " - " + "Permission: " + permission);
        if(permission == userRole) {
            next();
        }
        else {
            return res.send("Invalid page for user.");
        }
    }
};

module.exports = {authPage};