module.exports = (req, res) => {
    const { message } = req.query
    res.render('home/register', {
        message:message
    })

}