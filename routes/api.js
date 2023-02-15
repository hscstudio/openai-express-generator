const express = require('express');
const router = express.Router();
router.get('/posts', (req, res) => {
    res.json([
        {
            "id": 1,
            "title": "My Awesome Book",
            "author": "John Doe"
        }, 
        {
            "id": 2,
            "title": "Your Awesome Book",
            "author": "Jane Doe"
        }
    ])
});
module.exports = router;
