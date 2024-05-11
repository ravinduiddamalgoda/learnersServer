const router = require("express").Router();
let Payment = require("../models/Payment");
const upload = require("../utils/upload");

async function findID(accNo) {
    const existingAccount = await Payment.findOne({
        paymentID: accNo,
    });
    if(!existingAccount)
        return true
      else
        return false
  }
  
  function generateID() {
    let chars = "1234567890";
    let accID = "PT";
    for (let i = 0; i < 6; i++) {
      accID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    const existingAccNO = findID(accID);
    if (!existingAccNO) {
      return generateID();
    } else {
      return accID;
    }
  }



  router.post('/revenue/add', upload.single('remarks'), async (req, res) => {
    const { paymentType, studentName, Amount } = req.body;
    const file = req.file ? req.file.path : '';
    const RID = generateID();
    try {
        const newPayment = new Payment({
            paymentID: RID,
            paymentType,
            studentName,
            remarks: file,
            Amount
        });

        await newPayment.save();
        res.status(201).json("Payment Added");
    } catch (err) {
        console.error("Failed to add payment:", err);
        res.status(400).json('Error: ' + err);
    }
    });

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

router.route("/revenueByUser/:username").get(async (req, res) => {
    const { username } = req.params;
    try {
        const payments = await Payment.find({ studentName: username });
        const totalRevenue = payments.reduce((acc, payment) => acc + payment.Amount, 0);
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
