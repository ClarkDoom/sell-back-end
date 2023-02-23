const router = require('express').Router()
const listingsCtrl = require('../controllers/listings.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, listingsCtrl.index)
router.get('/:listingId', checkAuth, listingsCtrl.show)
router.patch('/:listingId', checkAuth,listingsCtrl.editListing)
router.post('/', checkAuth, listingsCtrl.createListing)
router.delete('/:listingId', checkAuth, listingsCtrl.deleteListing)

module.exports = router

