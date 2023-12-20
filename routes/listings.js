const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
    .get( wrapAsync(listingController.index))  //index route (show all listings)
    .post(isLoggedIn, upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));  //create listing
 
 //new route (to add new listings)
 router.get("/new", isLoggedIn, listingController.renderNewform);
 

 router.route("/:id")
    .get( wrapAsync(listingController.showListing))   //show route(to show specific listing)
    .put( isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))  //update route (update the edited data in listing)
    .delete( isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); //delete route

 //edit route (edit in specific listing)
 router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));
 

module.exports = router;