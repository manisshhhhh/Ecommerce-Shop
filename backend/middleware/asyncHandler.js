const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;

// rather then using a third party asyncHandler we make our custum asyncHandler 