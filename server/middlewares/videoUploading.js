
const dotenv = require('dotenv');


const multer = require('multer');

  dotenv.config();


const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

console.log("API Key:", process.env.CLOUDINARY_API_KEY_NEW);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);
  
const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (_req, file) => {
            try {
                let params;
                console.log(file.fieldname);
                

                if (file.fieldname == 'videoFile') {
                    console.log("imggggg");
                    console.log("API Key:", process.env.CLOUDINARY_API_KEY);

                    params = {
                        folder: 'movies/video',
                        resource_type: 'video',
                        allowed_formats: ['mp4', 'avi', 'mov', 'mkv'], 
                    };
                } else if (file.fieldname === 'imageFile') {
                    ""
                    params = {
                        folder: 'movies/images',
                        resource_type: 'image',
                        allowed_formats: ['png', 'jpg', 'jpeg'],
                    };
                }

                // console.log("Upload params:", params);
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

// console.log("gaa",upload)

module.exports = upload;




// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// // Ensure the environment variables are loaded properly
// require('dotenv').config();


// // Set up multer with CloudinaryStorage
// const upload = multer({
//     storage: new CloudinaryStorage({
//         cloudinary: cloudinary,
//         params: async (req, file) => {
//             try {
//                 // Check if `useNewAccount` flag is passed in the request body
//                 console.log("req.body.useNewAccount ",req.body.useNewAccount );
                
//                 const cloudinaryConfig = req.body.useNewAccount === 'true' ? {
//                     cloud_name: process.env.CLOUDINARY_CLOUD_NAME_NEW,
//                     api_key: process.env.CLOUDINARY_API_KEY_NEW,
//                     api_secret: process.env.CLOUDINARY_API_SECRET_NEW,
//                 } : {
//                     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//                     api_key: process.env.CLOUDINARY_API_KEY, 
//                     api_secret: process.env.CLOUDINARY_API_SECRET,
//                 };
                
//                 // Apply the selected Cloudinary configuration
//                 cloudinary.config(cloudinaryConfig);

//                 let params;

//                 // Check the file type and set the appropriate Cloudinary params
//                 console.log("params",params);
                
//                 if (file.fieldname === 'videoFile') { 
//                     params = {
//                         folder: 'movies/video',
//                         resource_type: 'video',
//                         allowed_formats: ['mp4', 'avi', 'mov', 'mkv'], 
//                     };
//                 } else if (file.fieldname === 'imageFile') {
//                     params = {
//                         folder: 'movies/images',
//                         resource_type: 'image',
//                         allowed_formats: ['png', 'jpg', 'jpeg'],
//                     };
//                 }

//                 console.log("Upload params:", params);
//                 return params;

//             } catch (error) {
//                 console.error('Error during Cloudinary file upload configuration:', error);
//                 throw new Error('Error configuring Cloudinary upload');
//             }
//         },
//     }),
// }).fields([
//     { name: 'videoFile', maxCount: 1 },
//     { name: 'imageFile', maxCount: 1 },
// ]);

// module.exports = upload;
 