// middlewares/errorHandler.js
const CustomError = require("../utils/customErrorHandling");

const errorHandler = (err, req, res, next) => {
    console.log("Is custom error:", err instanceof CustomError);

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error(`Unexpected Error: ${err}`);
        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};

module.exports = errorHandler;
