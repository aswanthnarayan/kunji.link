const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// Shorten URL
exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a URL'
      });
    }

    const shortCode = nanoid(8);

    const url = new Url({
      userId: req.user.id,
      longUrl,
      shortCode
    });

    await url.save();

    res.status(201).json({
      success: true,
      url: {
        id: url._id,
        longUrl: url.longUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.BASE_URL}/${shortCode}`,
        clicks: url.clicks,
        createdAt: url.createdAt
      }
    });
  } catch (error) {
    console.error('Shorten URL error:', error);
    res.status(500).json({
      success: false,
      message: 'Error shortening URL'
    });
  }
};

// Get user's URLs
exports.getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    const mappedUrls = urls.map(url => {
      const mapped = {
        id: url._id.toString(),
        longUrl: url.longUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        clicks: url.clicks,
        createdAt: url.createdAt
      };
      return mapped;
    });

    res.json({
      success: true,
      urls: mappedUrls
    });
  } catch (error) {
    console.error('Get user URLs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching URLs'
    });
  }
};

// Redirect to original URL
exports.redirectToUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found'
      });
    }

    // Increment clicks
    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({
      success: false,
      message: 'Error redirecting to URL'
    });
  }
};

// Delete URL
exports.deleteUrl = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'URL ID is required'
      });
    }

    const url = await Url.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found or unauthorized'
      });
    }

    await url.deleteOne();

    res.json({
      success: true,
      message: 'URL deleted successfully'
    });
  } catch (error) {
    console.error('Delete URL error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting URL'
    });
  }
};