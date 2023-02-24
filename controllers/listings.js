const { Listing } = require('../models')

async function index(req,res) {
  try {
    const listings = await Listing.findAll({})
    res.status(200).json(listings)
  } catch (error) {
    res.status(500).json({err: error})
  }
}

async function show(req,res){
  try {
    const listing = await Listing.findByPk(req.params.listingId)
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({err: error})
  }
}

async function createListing(req, res) {
  try {
    req.body.profileId = req.user.profile.id
    console.log("req.body", req.body)
    const listing = await Listing.create(req.body)
    res.status(200).json(listing)
  } catch (error) {
    console.log(error)
    res.status(500).json({err: error})
  }
}

async function editListing(req,res) {
  try {
    const listing = await Listing.findByPk(req.params.listingId)
    listing.set(req.body)
    await listing.save()
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({err: error})
  }
}

async function deleteListing(req, res) {
  try {
    const listing = await Listing.findByPk(req.params.listingId)
    await listing.destroy()
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({err: error})
  }
}


module.exports = {
  createListing,
  index,
  show,
  editListing,
  deleteListing
}