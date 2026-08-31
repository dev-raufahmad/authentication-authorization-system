const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    filename: (req, file, cb) => {

        const extension = path.extname(file.originalname);
        const { email } = req.body;

        cb(null, email + extension);
    },

    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, "../public"));
    }

});

module.exports = multer({ storage });