const { Listing } = require('../models')
const cloudinary = require('cloudinary').v2
const Sequelize = require('sequelize')


async function index(req, res) {
  try {
    const listings = await Listing.findAll({})
    res.status(200).json(listings)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function show(req, res) {
  try {
    const listing = await Listing.findByPk(req.params.listingId)
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

const createListing = async (req, res) => {
  try {
    req.body.profileId = req.params.profileId
    const listing = await Listing.create(req.body)
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function editListing(req, res) {
  try {
    console.log("ALERT", req.body)
    const listing = await Listing.findByPk(req.params.listingId)
    listing.set(req.body)
    await listing.save()
    res.status(200).json(listing)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function deleteListing(req, res) {
  try {
    const listing = await Listing.findByPk(req.params.listingId)
    await listing.destroy()
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    console.log("ALERT - REQ.FILES", req.files)
    const listing = await Listing.findByPk(req.params.listingId)
    const image = await cloudinary.uploader.upload(
      imageFile,
      { tags: `listing photo` }
    )
    Listing.update(
      { 'photos': Sequelize.fn('array_append', Sequelize.col('photos'), image.url) },
      { 'where': { 'id': listing.id } }
    );
    await listing.save()
    res.status(201).json(listing.photos)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}


module.exports = {
  createListing,
  index,
  show,
  editListing,
  deleteListing,
  addPhoto
}