function authenticateToken(req, res, next) {
    const validToken = 'xyz123'; // In a real app, this would be more secure
    const token = req.query.token;
    
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }
    
    if (token !== validToken) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    
    next();
}

export default authenticateToken;