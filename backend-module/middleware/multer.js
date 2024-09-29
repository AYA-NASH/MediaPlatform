const multer = require('multer');
const path = require('path');
const fs = require('fs');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        let fileName;
        if (file.mimetype === 'video/mp4') {
            fileName = `video-${Date.now()}` + path.extname(file.originalname);
        }
        else {
            fileName = `image-${Date.now()}` + path.extname(file.originalname);
        }
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === "video/mp4") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: multerStorage, fileFilter: fileFilter });

module.exports = upload;
