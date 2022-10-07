const handleSaveError = (error, data, next) => {
    const { name, code } = error;
    error.status = (name === "MongoSeverError" && code === 11000) ? 409 : 400;
};

module.exports = handleSaveError;
