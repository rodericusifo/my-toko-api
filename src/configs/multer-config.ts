import multer from 'multer';
import path from 'path';

// Multer File upload settings
const DIR = path.join(__dirname, 'public');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, DIR);
    },
    filename: (_req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});

// Multer Mime Type Validation
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

export { upload };
