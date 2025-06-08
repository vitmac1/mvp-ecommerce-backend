const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: 'uploads/', // pasta onde as imagens serão salvas
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // evita nomes duplicados
    }
});

const removeOldImage = (imageName) => {
    if (!imageName) return; // se não tiver nome, sai

    const imagePath = path.join(__dirname, '../uploads', imageName);

    try {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Imagem removida: ${imageName}`);
        }
    } catch (error) {
        console.error('Erro ao remover imagem antiga:', error);
    }
}

const upload = multer({ storage });

module.exports = {
    upload,
    removeOldImage
};
