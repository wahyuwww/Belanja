const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`
    cb(null, nameFormat)
  }
})
const limits = {
  fileSize: 3 * 1000 * 1000
}
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  if (extname) {
    cb(null, true)
  } else {
    cb(new Error('data not found', []))
  }
}
const upload = multer({
  storage,
  limits,
  fileFilter
})

const uploadImg = {
  singleUpload: (req, res, next) => {
    const singleUpload = upload.single('image')
    singleUpload(req, res, (err) => {
      if (err) {
        res.json({
          msg: err
        })
      } else {
        try {
          req.body.image = req.file.filename
        } catch {
          console.log(err)
        } finally {
          next()
        }
      }
    })
  },
  multipleUpload: (req, res, next) => {
    const multipleUpload = upload.array('image', 4)
    multipleUpload(req, res, (err) => {
      if (err) {
        res.json({
          msg: err
        })
      } else {
        try {
          const image = req.files.map((file) => {
            return file.filename
          })
          req.body.image = image.join(',')
          // console.log(req.files.filename)
        } catch {
          console.log(err)
        } finally {
          next()
        }
      }
    })
  }
}

module.exports = uploadImg
