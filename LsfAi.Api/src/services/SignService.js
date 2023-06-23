//getting the sign based of the media table
//must put on media first
//create a media

const db = require('../config/database');
const signService = {
    /**
     * Get all signs image and its definition from the database.
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
     */
    getSigns: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT `media_uri`,`definition` FROM `media`,`sign` WHERE  media.id = sign.media_id';
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },

    /**
     * Get a sign alphabet's image url based on media id from the media database.
     * @param {number} id - The ID of the sign.
     * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
     */
    getSignById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT `media_uri`,`definition` FROM `media`,`sign` WHERE media.id = ? AND media.id = sign.media_id';
            db.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    },


    /**
      * Create a new media sign in the database.
      * @param {string} media_uri - The sign's path.
      * @param {string} media_type - The sign's type of media.
      * @returns {Promise<object>} A promise that resolves to the created user object.
      */
    createMedia: (media_uri, media_type,) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `media` (media_uri, media_type) VALUES (?, ?)';
            const values = [media_uri, media_type];
            db.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const insertedSignId = result.insertId;
                    resolve({
                        id: insertedSignId, media_uri, media_type
                    });
                }
            });
        });
    },

    /**
        * Update a sign def in the database.
        * @param {number} id - The ID of the sign to update.
        * @param {Object} mediaData - The updated sign data.
        * @returns {Promise<Object>} A promise that resolves to the updated sign object.
        */
    updateSignMedia: (id, mediaData) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE `media` SET media_uri = ?, media_type = ? WHERE id = ?';
            const values = [mediaData.definition, mediaData.media_type, id];
            db.query(query, values, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ id: mediaId, ...mediaData });
                }
            });
        });
    },
    /**
    * Delete a media from the database.
    * @param {number} id - The ID of the media to delete.
    * @returns {Promise<void>} A promise that resolves when the media is successfully deleted.
    */
    deleteSignMedia: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM `media` WHERE id = ?';
            db.query(query, [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    },



}

module.exports = signService;
