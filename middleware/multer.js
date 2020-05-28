const multer = require('multer');
const path = require('path');

const uploader = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => cb(null, file.originalname),
        destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads'))
    }),
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Sólo se admiten estos tipos de archivos: " + filetypes);
    },
}).single('image');
module.exports = uploader;