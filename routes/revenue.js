const router = require("express").Router();
let Payment = require("../src/models/Payment");

router.route("/add").post((req, res) => {

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

module.exports = router;
