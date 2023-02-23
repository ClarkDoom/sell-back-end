const { Listing } = require('../models')

async function createListing(req, res) {
  try {
    req.body.profileId = req.user.profile.id
    const listing = await Listing.create(req.body)
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({err: error})
  }
}


module.exports = {
  createListing
}