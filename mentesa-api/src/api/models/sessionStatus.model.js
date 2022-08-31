const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
 * sessionStatus Schema
 * @private
 */
const sessionStatusSchema = new mongoose.Schema({

    description: {
        type: String,
        maxlength: 255,
        index: true,
        trim: true,
    },
}, {
    timestamps: true,
});


/**
 * Methods
 */
sessionStatusSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'description', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

/**
 * Statics
 */
sessionStatusSchema.statics = {

    /**
     * Get sessionStatus
     *
     * @param {ObjectId} id - The objectId of sessionStatus.
     * @returns {Promise<SessionStatus, APIError>}
     */
    async get(id) {
        let sessionStatus;

        if (mongoose.Types.ObjectId.isValid(id)) {
            sessionStatus = await this.findById(id).exec();
        }
        if (sessionStatus) {
            return sessionStatus;
        }

        throw new APIError({
            message: 'SessionStatus does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * List SessionStatus in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of SessionStatus to be skipped.
     * @param {number} limit - Limit number of SessionStatus to be returned.     
     * @returns {Promise<SessionStatus[]>}
     */
    list({
        page = 1, perPage = 30, id, description
    }) {
        const options = omitBy({ id, description }, isNil);

        return this.find(options,)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },
};

/**
 * @typedef SessionStatus
 */
module.exports = mongoose.model('SessionStatus', sessionStatusSchema);
