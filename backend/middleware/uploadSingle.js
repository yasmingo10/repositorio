const multer = require('multer');
const fs = require('fs');
const { v4:uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/uploads/')
    },
    filename: (req, file, callBack) =>{
        const file_id = uuidv4();
        const file_ext = file.originalname.split('.').pop();
        callBack(null, `${file_id}.${file_ext}`);
    }
});

const upload = multer({storage: storage});
const allowedTypes = ['image/jpeg', 'image/png', 'application.pdf', 'image/jpg'];
const  maxSize = 5 * 1024 * 1024;
const errors = [];
const uploadSingle = (req, res, next) =>{
    upload.single('uploaded_file')(req, res, (err)=>{
        if (err) {
            return res.status(400).json({error: err.message});
        }

        const file = req.file;

        if (!allowedTypes.includes(file.mimetype)) {
            errors.push(`Tipo de arquivo inválido ${file.originalname}`);
        }
        if (file.size > maxSize) {
            errors.push(`Arquivo ultrapassa o tamanho máximo: ${file.originalname}`);
        }

        if (errors.length > 0) {
            fs.unlinkSync(file.path);
            return res.status(400).json({ error: errors });
        }

        req.upload = file;
        req.upload.customPath = `uploads/${file.filename}`;
        next();
    });
};

module.exports = uploadSingle;