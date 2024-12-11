


const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            try {
                let params;

                if (file.fieldname === 'videoFile') {
                    params = {
                        folder: 'movies/video',
                        resource_type: 'video',
                        allowed_formats: ['mp4', 'avi', 'mov', 'mkv'], 
                    };
                } else if (file.fieldname === 'imageFile') {
                    params = {
                        folder: 'movies/images',
                        resource_type: 'image',
                        allowed_formats: ['png', 'jpg', 'jpeg'],
                    };
                }

                console.log("Upload params:", params);
                return params;

            } catch (error) {
                console.error('Error during Cloudinary file upload configuration:', error);
                throw new Error('Error configuring Cloudinary upload');
            }
        },
    }),
}).fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 },
]);

module.exports = upload;
