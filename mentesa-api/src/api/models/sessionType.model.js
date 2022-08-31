const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
 * sessionStatus Schema
 * @private
 */
const sessionTypeSchema = new mongoose.Schema({

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
sessionTypeSchema.method({
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
sessionTypeSchema.statics = {

    /**
     * Get sessionType
     *
     * @param {ObjectId} id - The objectId of sessionType.
     * @returns {Promise<SessionType, APIError>}
     */
    async get(id) {
        let sessionType;

        if (mongoose.Types.ObjectId.isValid(id)) {
            sessionType = await this.findById(id).exec();
        }
        if (sessionType) {
            return sessionType;
        }

        throw new APIError({
            message: 'sessionType does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * List sessionType in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of sessionType to be skipped.
     * @param {number} limit - Limit number of sessionType to be returned.     
     * @returns {Promise<SessionType[]>}
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
 * @typedef SessionType
 */
module.exports = mongoose.model('SessionType', sessionTypeSchema);
