const Router = require("express");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')
const User = require("../config/models/User");


router.patch(
    "/:id",
    authMiddleware,
    async function (req, res) {
        if (!req.body) return res.sendStatus(400);
        if (!req.params.id) return res.sendStatus(400);
        const id = req.params.id;
        const postData = {
            name:req.body.name,
            surname:req.body.surname,
            email:req.body.email,
        };
        console.log(postData);
        await User.findByIdAndUpdate(
            { _id: id },
            postData,
            { new: true },
            function (err, user) {
                if (err) return res.send(err);
                res.send(user);
            }
        );
    }
);

module.exports = router;
