const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const removeOldImage = (imageName) => {
    if (!imageName) return; // se não tiver nome, sai

    const imagePath = path.join(uploadDir, imageName);

    try {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Imagem removida: ${imageName}`);
        }
    } catch (error) {
        console.error("Erro ao remover imagem antiga:", error);
    }
};

const upload = multer({ storage });

module.exports = {
    upload,
    removeOldImage,
};
