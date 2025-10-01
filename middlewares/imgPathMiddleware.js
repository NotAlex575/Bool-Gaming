const setImgPath = (req, res, next) => {
  req.imgPath = `${req.protocol}://${req.get('host')}/img/movies/`
  next()
}

module.exports = setImgPath