// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

import requestLogger from './logger.js';
import validateQueryParams from './validateQuery.js';
import authenticateToken from './auth.js'; // Optional

// Apply global middleware
app.use(requestLogger);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', validateQueryParams, authenticateToken, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    
    // Filter courses by department first
    let filteredCourses = courses.filter(course => course.department === dept);
    
    // Apply additional filters if provided
    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    
    if (minCredits) {
        const min = parseInt(minCredits);
        if (isNaN(min)) {
            return res.status(400).json({ error: 'minCredits must be a valid integer' });
        }
        filteredCourses = filteredCourses.filter(course => course.credits >= min);
    }
    
    if (maxCredits) {
        const max = parseInt(maxCredits);
        if (isNaN(max)) {
            return res.status(400).json({ error: 'maxCredits must be a valid integer' });
        }
        filteredCourses = filteredCourses.filter(course => course.credits <= max);
    }
    
    if (minCredits && maxCredits) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (min > max) {
            return res.status(400).json({ error: 'minCredits cannot be greater than maxCredits' });
        }
    }
    
    if (semester) {
        filteredCourses = filteredCourses.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
    }
    
    if (instructor) {
        filteredCourses = filteredCourses.filter(course => course.instructor.toLowerCase().includes(instructor.toLowerCase()));
    }
    
    // Return the filtered results
    res.json({
        results: filteredCourses,
        meta: {
            total: filteredCourses.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
