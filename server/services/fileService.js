const fs = require("fs");
const File = require("../config/models/File");
const config = require("config");

class FileService {
    createDir(req, file) {
        const filePath = this.getPath(req, file)
        console.log(filePath);
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({message: "File was created"});
                } else {
                    return reject({message: "File already exist"});
                }
            } catch (e) {
                console.log(e);
                return reject({message: "File error"});
            }
        });
    }

    deleteFile(req, file) {
        const path = this.getPath(req, file);
        if (file.type === "dir") {
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }

    getPath(req, file) {
        return req.filePath + '\\' + file.user + '\\' + file.path;
    }
    getStaticPath(req) {
        return req.staticPath;
    }
}

module.exports = new FileService();
