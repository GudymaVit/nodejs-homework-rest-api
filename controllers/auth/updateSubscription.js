const { User } = require("../../models/user");
const { RequestError } = require("../../helper");


const updateSubscription = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { subscription } = req.body;
    
    const result = await User.findByIdAndUpdate(`${userId}`, { subscription }, { new: true });
    if (!result) {
        throw RequestError(404)
    }
    res.status(200).json(result)

}

module.exports = updateSubscription;