const connection = require('../config/database')

const getHomepage = (req, res) => {
    return res.render('index.ejs')
}

module.exports = {
    getHomepage
}