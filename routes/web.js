const express = require('express');
const router = express.Router();
router.get("/posts", (req, res) => {
    res.render('posts', { title: 'ExpressJS', layout: 'layout' });
});
module.exports = router;
