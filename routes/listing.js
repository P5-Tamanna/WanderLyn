const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index Route & Create Route
router
    .route("/")
    // .get(wrapAsync(listingController.index))
    .get(async (req, res) => {
        const { location } = req.query;  // get ?location= value from search bar
        let listings;

        if (location) {
            listings = await Listing.find({ location: new RegExp(location, "i") }); 
            // case-insensitive search
        } else {
            listings = await Listing.find({});
        }

        res.render("listings/index.ejs", { allListings: listings });
        })
    .post(
        isLoggedIn,  
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Route, Edit Route, Update Route & Delete Route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn, 
        isOwner,
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
    "/:id/edit", 
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;