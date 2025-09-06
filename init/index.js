const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const geocoder = require("../utils/geocoder.js");   

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlyn";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  for (let obj of initData.data) {
    const geoData = await geocoder.geocode(obj.location);

    const listing = new Listing({
      ...obj,
      owner: "68b822806c09b2c69e031833",
      geometry: {
        type: "Point",
        coordinates: [geoData[0].longitude, geoData[0].latitude]
      }
    });

    await listing.save();
  }

  // initData.data = initData.data.map((obj) => ({...obj, owner: "68b822806c09b2c69e031833" }));
  // await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();