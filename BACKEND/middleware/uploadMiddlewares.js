import multer from 'multer'
import path from 'path'
import fs from 'fs'

// FIX: folder was spelled "uplaods/" — now correctly "uploads/"
const uploadsDir = "uploads/"
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}-${file.fieldname}${ext}`)
    },
});

const fileFilter = (req, file, cb) => {
    // FIX: "iamge/jpeg" was a typo — corrected to "image/jpeg"
    // FIX: was checking file.mimtype (typo) — corrected to file.mimetype
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only .jpeg, .jpg, .png formats are allowed"), false)
    }
}

const upload = multer({ storage, fileFilter })
export default upload
