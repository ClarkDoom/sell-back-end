const { Profile, Listing } = require('../models')
const cloudinary = require('cloudinary').v2

const index = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [{ model: Listing, as: "listings"}]
    })
    res.json(profiles)
  } catch (error) {
    console.log("ALERT", error)
    res.status(500).json({ err: error })
  }
}

const show = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: [{ model: Listing, as: "listings"},]
    })
    res.json(profile)
    console.log("profile:", profile)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

module.exports = { index, addPhoto, show }
