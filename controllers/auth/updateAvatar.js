const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir =path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;

    try {
        const resultUpload = path.join(avatarDir, originalname);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", originalname);
        
        Jimp.read(avatarURL)
            .then(img => {
            return img.resize(250,250).write(avatarURL)
        })
            .catch(error => {
                console.log(error);
            }
        )
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({avatarURL})
    } catch (error) {
        await fs.unlink(tempUpload)
    }
}

module.exports = updateAvatar;