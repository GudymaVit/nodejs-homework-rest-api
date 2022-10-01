
const {Contact} = require("../../models/contact")

const { RequestError } = require("../../helper");


const getById = async (req, res) => {

    const { contactId } = req.params;
 
      const result = await Contact.findById(contactId);

    if (!result) {
      throw RequestError(404)
    }
    res.json(result)

}

module.exports = getById;