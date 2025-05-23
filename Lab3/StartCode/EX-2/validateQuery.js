function validateQueryParams(req, res, next) {
    const { minCredits, maxCredits } = req.query;
    
    if (minCredits) {
        const min = parseInt(minCredits);
        if (isNaN(min)) {
            return res.status(400).json({ error: 'minCredits must be a valid integer' });
        }
    }
    
    if (maxCredits) {
        const max = parseInt(maxCredits);
        if (isNaN(max)) {
            return res.status(400).json({ error: 'maxCredits must be a valid integer' });
        }
    }
    
    if (minCredits && maxCredits) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (min > max) {
            return res.status(400).json({ 
                error: 'minCredits cannot be greater than maxCredits' 
            });
        }
    }
    
    next();
}

export default validateQueryParams;