const { default: mongoose } = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// post middleware
fileSchema.post("save", async function (doc) {
  try {
    // console.log(doc);
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      // port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // send email

    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: doc.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello whomimohshukla</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
