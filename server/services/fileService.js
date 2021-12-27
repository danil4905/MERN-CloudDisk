const fs = require("fs");
const File = require("../config/models/File");
const config = require("config");

class FileService {
  createDir(file) {
    const filePath = `${config.get("filePath")}/${file.user}/${file.path}`;
    console.log(filePath);
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (e) {
        console.log(e);
        return reject({ message: "File error" });
      }
    });
  }
  deleteFile(file) {
    const path = this.getPath(file);
    console.log(path);
    if (file.type === "dir") {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path + "/" + file.name);
    }
  }

  getPath(file) {
    console.log("Create path");
    return config.get("filePath") + "/" + file.user + "/" + file.path;
  }
}

module.exports = new FileService();
