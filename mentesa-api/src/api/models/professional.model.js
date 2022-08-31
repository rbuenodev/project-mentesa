const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
 * professional Schema
 * @private
 */
const professionalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        maxlength: 255,
        index: true,
        trim: true,
    },
    crp: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
    },
    approach: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
    },
    contact: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
    },
}, {
    timestamps: true,
});


/**
 * Methods
 */
professionalSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'userId', 'name', 'crp', 'approach', 'contact', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

/**
 * Statics
 */
professionalSchema.statics = {

    /**
     * Get professional
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<Professional, APIError>}
     */
    async get(id) {
        let professional;

        if (mongoose.Types.ObjectId.isValid(id)) {
            professional = await this.findById(id).exec();
        }
        if (professional) {
            return professional;
        }

        throw new APIError({
            message: 'Professional does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * List professional in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<Professional[]>}
     */
    list({
        page = 1, perPage = 30, name, crp, approach, contact,
    }) {
        const options = omitBy({ name, crp, approach, contact }, isNil);

        return this.find(options)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },
};

/**
 * @typedef Professional
 */
module.exports = mongoose.model('Professional', professionalSchema);
