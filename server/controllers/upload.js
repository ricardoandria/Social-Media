import express from "express";

const uploadController = express.Router()


import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage
    //
})

uploadController.post('/image',  upload.single('image'), (req, res) => {
    try {
        return res.status(201).json({ msg: "Successfully uploaded file" })
    } catch (error) {
        console.error(error.message);
    }
})

export default uploadController;