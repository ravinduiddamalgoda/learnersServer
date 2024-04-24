const router = require("express").Router();
let Vehicle = require("../src/models/Vehicle");

router.route("/add").post(async (req, res) => {
    const { vehicleID, vehicleNO, vehicleType, transmissionType, fuelType, availability, studentCnt } = req.body;

    try {
        // Check if the vehicle number already exists in the database
        const existingVehicle = await Vehicle.findOne({ vehicleNO });
        if (existingVehicle) {
            return res.status(400).json({ error: 'Vehicle number already exists' });
        }

        // If the vehicle number is unique, proceed with creating the new vehicle
        const newVehicle = new Vehicle({
            vehicleID,
            vehicleNO,
            vehicleType,
            transmissionType,
            fuelType,
            availability: Boolean(availability), 
            studentCnt: Number(studentCnt) 
        });

        // Save the new vehicle to the database
        await newVehicle.save();
        
        // Send success response
        res.json("Vehicle Added");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.route("/").get((req, res) => {

    Vehicle.find().then((vehicles) => {
        res.json(vehicles)
}).catch((err) => {
    console.log(err);
})

})

router.route("/update/:id").put(async(req, res) => {
     let vehicleID = req.params.id;
     const {vehicleNO, vehicleType, transmissionType, fuelType, availability, studentCnt} = req.body;

     const updateVehicle = {
         vehicleNO,
         vehicleType,
         transmissionType,
         fuelType,
         availability,
         studentCnt
     }
     const update = await Vehicle.findByIdAndUpdate(vehicleID, updateVehicle)
     .then(() => {
        res.status(200).send({status: "Vehicle updated"})
     }).catch((err) => {
         console.log(err);
         res.status(500).send({status: "Error with updating data", error: err.message});
     })
})

     router.route("/delete/:id").delete(async(req, res) => {
         	let vehicleID = req.params.id;

            await Vehicle.findByIdAndDelete(vehicleID)
            .then(() => {
                res.status(200).send({status: "Vehicle deleted"});
            }).catch((err) => {
                console.log(err);
                res.status(500).send({status: "Error with deleting vehicle", error: err.message});
            })
     })
     
//to get informtion of particular vehicle

router.route("/get/:id").get(async (req, res) => {

    const { id } = req.params;
    const vehicle = await Vehicle.findById(id)
        .then((vehicle) => {
            res.status(200).send({ status: "Vehicle fetched", vehicle })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get vehicle", error: err.message });
        })
   
})



module.exports = router;