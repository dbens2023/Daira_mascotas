
const multer = require('multer');

module.exports = function uploadFileImg() {
    const storage = multer.diskStorage({
        destination: './public/files',
        filename: (req, file, cb) => {
            const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, Date.now() + extension);
        }
    });

    const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }).single('file');

    return async (req, res, next) => {
        try {
            await new Promise((resolve, reject) => {
                upload(req, res, (err) => {
                    if (err || !req.file) {
                        console.error('Error al cargar el archivo:' + err);
                        reject(err);
                    } else {
                        console.log("data Img: ", req.file);
                        resolve();
                    }
                });
            });
            next();
        } catch (error) {
            return res.status(500).json('Error servidor.' + error.message);
        }
    };
};