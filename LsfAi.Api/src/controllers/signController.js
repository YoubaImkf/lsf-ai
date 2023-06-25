const signService = require('../services/SignService');

/**
 * Get all signs url.
 * @route GET /signs
 * @returns {Promise<object[]>} A promise that resolves to an array of user objects.
 */
const getAllSigns = async (req, res) => {
    try {
        const signs = await signService.getSigns();
        res.json(signs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve signs' });
    }
};

/**
 * Get a sign by ID.
 * @route GET /signs/{id}
 * @param {number} id - The ID of the sign.
 * @returns {Promise<object>} A promise that resolves to the sign object.
 */
const getSignById = async (req, res) => {
    try {
        const signId = parseInt(req.params.id);
        const sign = await signService.getSignById(signId);
        if (sign) {
            res.json(sign);
        } else {
            res.status(404).json({ error: 'Sign not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve sign' });
    }
};

/**
 * Create a new user.
 * @route POST /signs/
 * @param {object} sign - Information about the user to be created.
 * @param {string} sign.media_uri - The sign's content path.
 * @param {string} sign.media_type - The sign's content type.
 * @returns {Promise<object>} A promise that resolves to the created sign object.
 */
const createSign = async (req, res) => {
    try {
        const signData = req.body;
        const newSign = await signService.create(signData);
        res.status(201).json(newSign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create sign ' });
    }
};


/**
 * Update a sign media by ID.
 * @route PUT /signs/{id}
 * @param {number} id - The ID of the sign media to be updated.
 * @param {object} sign - Updated information about the sign.
 * @returns {Promise<object>} A promise that resolves to the updated sign object.
 */
const updateSign = async (req, res) => {
    try {
        const signId = parseInt(req.params.id);
        const signData = req.body;
        const updatedSign = await signService.updateSign(signId, signData);
        if (updatedSign) {
            res.json(updatedSign);
        } else {
            res.status(404).json({ error: 'sign not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update sign' });
    }
};


/**
 * Delete a sign by ID.
 * @route DELETE /signs/{id}
 * @param {number} id - The ID of the sign to be deleted.
 * @returns {Promise<object>} A promise that resolves to a success message.
 */
const deleteSign = async (req, res) => {
    try {
        const signId = parseInt(req.params.id);
        const deletedSign = await signService.deleteSign(signId);
        if (deletedSign) {
            res.json({ message: 'sign deleted' });
        } else {
            res.status(404).json({ error: 'Sign not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete sign' });
    }
};

//exports all the functions defined
module.exports = {
    getAllSigns, getSignById, createSign, updateSign, deleteSign
};