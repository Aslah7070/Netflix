const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        console.log("dd");
        
        return {
            folder: 'profile_pics', 
            resource_type: 'image',
            allowed_formats: ['png', 'jpg', 'jpeg'], 
        };
    },
});

const uploadProfileImages = multer({
    storage: storage,
}).array('imageFile',5);  
 
module.exports = uploadProfileImages;
