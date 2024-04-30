const { Router } = require("express");
const multer = require("multer");
const path = require("path")
const router = Router();
const Blog = require("../models/blog")
const Comment = require("../models/comment")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage })

router.get("/add-new", (req, res) => {
    return res.render("addBlog")
})

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
    return res.render("blog", {
        user: req.user,
        blog,
        Comments: comments,
    })
})
router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
        body,
    })
    res.redirect(`/blogs/${blog._id}`)
})


router.post("/comment/:blogId", async (req, res) => {
    await Comment.create({
        blogId: req.params.blogId,
        content: req.body.content,
        createdBy: req.user._id,
    })
    return res.redirect(`/blogs/${req.params.blogId}`);
})
module.exports = router;