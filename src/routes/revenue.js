const express = require("express");
const router = require("express").Router();
let Payment = require("../models/Payment");
const nodemailer = require("nodemailer");

router.route("revenue/add").post((req, res) => {

    const paymentID = req.body.paymentID;
    const paymentType = req.body.paymentType;
    const dateTime = Date(req.body.dateTime);
    const studentName = req.body.studentName;
    const remarks = req.body.remarks;
    const Amount = Number(req.body.Amount);
    

    const newPayment = new Payment({
        paymentID,
        paymentType,
        dateTime,
        studentName,
        remarks,
        Amount  
        
    })

    newPayment.save().then(() => {
        res.json("Payment Added")
    }).catch((err) => {
        console.log(err);
    })  

})

// Route to fetch all payments
router.route("/payments").get((req, res) => {
    Payment.find()
        .then(payments => res.json(payments))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to calculate revenue for a given date range
router.route("/revenue").post(async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
        const payments = await Payment.find({
            dateTime: { $gte: startDate, $lte: endDate }
        });
        const totalRevenue = payments.reduce((acc, payment) => acc + payment.Amount, 0);
        res.json({ totalRevenue });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'divyanipiyathilaka15@gmail.com', // Your email
      pass: 'feom uzst hzah yecz'  // Your password
    }
  });

  router.route("/send-email").post(async (req, res) => {
    const { to, subject, html } = req.body;
  
    try {
      // Send email
      await transporter.sendMail({
        from: 'divyanipiyathilaka15@gmail.com', // Sender email
        to,
        subject,
        html
      });
  
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

module.exports = router;
