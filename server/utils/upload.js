const multer = require("multer")
const path = require("path")

const Storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
const UploadSingle = multer({ storage: Storage }).single("hero")
const Upload = multer({ storage: Storage }).fields([
    { name: "hero", maxCount: 1 },
    { name: "screenshots-web-main", maxCount: 1 },
    { name: "screenshots-web-other", maxCount: 5 },
    { name: "screenshots-mobile-main", maxCount: 1 },
    { name: "screenshots-mobile-other", maxCount: 5 },
    { name: "sections-web-hero", maxCount: 1 },
    { name: "sections-mobile-hero", maxCount: 1 },
])
module.exports = { Upload, UploadSingle }