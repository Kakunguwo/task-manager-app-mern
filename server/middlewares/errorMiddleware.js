//Not found

export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    error.code = 404;
    next(error);
};


//Error handler
export const errorHandler = (error, req, res, next) => {
    if(res.headersSent){
        return next(error);
    }

    res.status(error.code || 500).json({
        message: error.message || "An unknown error occured",
    })
}