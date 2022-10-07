const {Contact} = require("../../models/contact")
const { RequestError } = require("../../helper");

const removeById = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404)
    }
    res.json({
      message: "contact deleted"
    })

}

module.exports = removeById;