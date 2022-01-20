const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const userRouter = require("./routes/user.router");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = process.env.PORT || config.get("serverPORT");
const corsMiddleware = require("./middleware/cors.middleware");
const filePathMiddleware = require("./middleware/filepath.middleware");
const path = require('path');

process.env.PWD = process.cwd();

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(process.env.PWD, 'files')))
app.use(express.json());

app.use(express.static(path.join(__dirname, 'static')));
console.log(path.join(__dirname, 'static'))
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);
app.use("/api/users", userRouter);
app.get('/static/:filename',(req,res) => {
    let pathAll = path.join(__dirname, 'static');
    res.sendFile(pathAll + "\\" + req.params.filename);
})
const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log("Server started on port: ", PORT);
        });
    } catch (error) {
        console.log(error);
    }
};
start();
