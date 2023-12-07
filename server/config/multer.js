const multer = require("multer");
const path = require('path')


const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + fileExtension);
    },
});
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        return cb(new Error('Only upload files with jpg, jpeg and png format.'));
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;