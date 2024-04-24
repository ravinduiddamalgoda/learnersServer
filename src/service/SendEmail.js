const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'recruitnsbm@gmail.com',
      pass: 'sllkozacqwzyfxwb'
    }
  });


async function sendmail ( mail , subject , text ) {

    var mailOptions = {
        from: 'recruitnsbm@gmail.com',
        to: mail,
        subject: subject,
        text: text
      };
  // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: 'recruitnsbm@gmail.com', // sender address
//     to: mail, // list of receivers
//     subject: subject,
//     text: text, // plain text body
//   });
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
}

// main().catch(console.error);
module.exports ={
    sendmail
}