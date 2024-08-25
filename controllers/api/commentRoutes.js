const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id,  // Link the comment to the logged-in user
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
