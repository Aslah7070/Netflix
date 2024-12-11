


// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Cloudinary storage setup for video uploads
// const videoStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "product-videos",  // Cloudinary folder for videos
//     resource_type: "video",    // Make sure resource_type is set to "video"
//     allowed_formats: ["mp4", "avi", "mov", "mkv"],  // Allowed video formats
//   },
// });

// // Set up multer upload for video
// const uploadVideo = multer({ storage: videoStorage });

// // Cloudinary storage setup for image uploads (if needed)
// const imageStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "product-images", // Cloudinary folder for images
//     allowed_formats: ["jpg", "jpeg", "png"], // Allowed image formats
//   },
// });

// // Set up multer upload for image
// const uploadImage = multer({ storage: imageStorage });

// module.exports = { uploadVideo, uploadImage };



// const multer = require('multer');

// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const { param } = require('../routes/auth.routes');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// const videoStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'movies/video',
//         resource_type: 'video', // For audio files
//         allowed_formats: ["mp4", "avi", "mov", "mkv"],
//     },
// });



// const imageStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'movies/images',
//         resource_type: 'image', 
//         allowed_formats: ['png', 'jpg', 'jpeg'],
//     },
// });


// // Configure multer with Cloudinary storage
// const upload = multer({
   
//     storage: new CloudinaryStorage({
        
//         cloudinary: cloudinary,
//         params: async (req, file) => {
//             try {
//                 // console.log("hadbde",file)
//             if (file.fieldname === 'videoFile') {
//                 return {
                    
                    
//                     folder: 'movies/video',
//                     resource_type: 'video',
//                     allowed_formats: ['mp4", "avi", "mov", "mkv'],

//                 };
                
//             }
//             console.log("hadbds")
//             if (file.fieldname === 'imageFile') {
//                 return {
//                     folder: 'movies/images',
//                     resource_type: 'image',
//                     allowed_formats: ['png', 'jpg', 'jpeg'],
//                 };
                
//             }
            
//         }catch(error){
//             console.error('Error during Cloudinary file upload configuration:', error);
//             throw new Error('Error configuring Cloudinary upload');
//         }
//         },
//     fun:()=>{
//         console.log("dd",this.params);
        
//     }
    
    
//     }



// )

//     ,
// }).fields([
//     { name: 'videoFile', maxCount: 1 },
//     { name: 'imageFile', maxCount: 1 },
// ]);


// module.exports = upload;



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
                        allowed_formats: ['mp4', 'avi', 'mov', 'mkv'], // Corrected allowed formats
                    };
                } else if (file.fieldname === 'imageFile') {
                    params = {
                        folder: 'movies/images',
                        resource_type: 'image',
                        allowed_formats: ['png', 'jpg', 'jpeg'],
                    };
                }

                console.log("Upload params:", params); // Debugging log
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
