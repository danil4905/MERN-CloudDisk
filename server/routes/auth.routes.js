const Router = require("express");
const User = require("../config/models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();
const fileService = require("../services/fileService");
const File = require("../config/models/File");

router.post(
    "/registration",
    [
        check("email", "Uncorrect email !").isEmail(),
        check(
            "password",
            "Password must be longer then 3 and less then 12"
        ).isLength({min: 3, max: 12}),
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors});
            }
            const {email, name, surname, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) {
                return res
                    .status(400)
                    .json({message: `User with email ${email} already exist!`});
            }
            const hashPassword = await bcrypt.hash(password, 4);
            const user = new User({email, name, surname, password: hashPassword});
            await user.save();
            await fileService.createDir(req, new File({user: user.id, name: ""}));
            return res.json({message: "User was created!"});
        } catch (error) {
            console.log(error);
        }
    }
);

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {
            expiresIn: "1h",
        });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
                name: user.name,
                surname: user.surname
            },
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/auth", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id});
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {
            expiresIn: "1h",
        });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
                name: user.name,
                surname: user.surname,
            },
        });
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"});
    }
});

module.exports = router;
