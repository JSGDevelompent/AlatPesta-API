const ping = async (req, res, next) => {
    try {
        const userAgent = req.headers['user-agent'];
        console.log('User-Agent ping Response:', userAgent);
        res.status(200).json({
            message: "200 OKK"
        })
    } catch (e) {
        next(e);
    }
}

export default {
    ping
}