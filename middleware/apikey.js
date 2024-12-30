const { ApiKey } = process.env;
function Apikey(req, res, next) {
    const apiKey = req.header('Authorization'); // API key dikirim dalam header permintaan

    if (!apiKey || apiKey !== ApiKey) {
      return res.json({status: false, message: 'Anda siapa!!' });
    }
    next();
}
module.exports = Apikey;
