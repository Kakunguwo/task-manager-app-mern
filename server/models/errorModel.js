const HttpError = (message, errorCode) => {
    const error = new Error(message);
    error.code = errorCode
    return error
};

export default HttpError;