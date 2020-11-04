const router = require('express').Router();
const path = require('path');
const express = require('express');

router.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "posts", req.params.id,"index.html"));
});

module.exports = router;