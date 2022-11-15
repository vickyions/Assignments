const router = require('express').Router();
const Blog = require('../models/Blog');
const PostsPerPage = 5;
// Your routing code goes here

router.get('/', async (req, res) => {
    try {
        const { page = 1, search = '' } = req.query;
        let findQuery =
            search !== ''
                ? {
                      $or: [
                          { topic: { $regex: search } },
                          { posted_by: { $regex: search } },
                          { description: { $regex: search } },
                      ],
                  }
                : {};

        const result = await Blog.find(findQuery)
            .skip((page - 1) * PostsPerPage)
            .limit(PostsPerPage);

        res.status(200).json({
            status: 'success',
            result,
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { topic, description, posted_by, posted_at } = req.body;
        if (
            topic === undefined ||
            description === undefined ||
            posted_by === undefined ||
            posted_at === ''
        ) {
            throw new Error('missing fields', {
                cause: 'provide mandatory fields',
            });
        } else {
            const result = await Blog.create(req.body);
            res.status(200).json({
                status: 'success',
                result,
            });
        }
    } catch (err) {
        if (err.message === 'missing fields') {
            res.status(400).json({
                status: 'failed',
                message: err.cause,
            });
        } else {
            res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (blog) {
            res.status(200).json({
                status: 'success',
                result: blog,
            });
        } else {
            throw new Error('wrong id', { cause: 'provide a correct blog id' });
        }
    } catch (err) {
        if (err.message === 'wrong id') {
            res.status(400).json({
                status: 'failed',
                message: err.cause,
            });
        } else {
            res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        }
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (blog) {
            const result = await Blog.findByIdAndUpdate(id, {$set:req.body});
            res.status(200).json({
                status: 'success',
                result: await Blog.findById(id),
            });
        } else {
            throw new Error('wrong id', { cause: 'provide a correct blog id' });
        }
    } catch (err) {
        if (err.message === 'wrong id') {
            res.status(400).json({
                status: 'failed',
                message: err.cause,
            });
        } else {
            res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (blog) {
            await Blog.findByIdAndDelete(id);
            res.status(200).json({
                status: 'success',
                result: blog,
            });
        } else {
            throw new Error('wrong id', { cause: 'provide a correct blog id' });
        }
    } catch (err) {
        if (err.message === 'wrong id') {
            res.status(400).json({
                status: 'failed',
                message: err.cause,
            });
        } else {
            res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        }
    }
});

module.exports = router;
