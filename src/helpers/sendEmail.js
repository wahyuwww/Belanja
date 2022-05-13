const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const text = require('../helpers/textEmail')

const sendMail = async (email) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'wahyu.purwanto258@gmail.com', // generated ethereal user
        pass: 'purwanto2508' // generated ethereal password
      }
    })
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: '24h'
    })
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Saya Wahyu" <wahyu.purwanto258@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      html: text(token) // html body
    })
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendMail
}
