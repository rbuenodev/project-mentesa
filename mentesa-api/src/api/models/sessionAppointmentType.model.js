const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
 * sessionAppointmentType Schema
 * @private
 */
const sessionAppointmentTypeSchema = new mongoose.Schema({

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
sessionAppointmentTypeSchema.method({
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
sessionAppointmentTypeSchema.statics = {

    /**
     * Get sessionAppointmentType
     *
     * @param {ObjectId} id - The objectId of sessionAppointmentType.
     * @returns {Promise<SessionAppointmentType, APIError>}
     */
    async get(id) {
        let sessionAppointmentType;

        if (mongoose.Types.ObjectId.isValid(id)) {
            sessionAppointmentType = await this.findById(id).exec();
        }
        if (sessionAppointmentType) {
            return sessionAppointmentType;
        }

        throw new APIError({
            message: 'sessionAppointmentType does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * List SessionAppointmentType in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of SessionAppointmentType to be skipped.
     * @param {number} limit - Limit number of SessionAppointmentType to be returned.     
     * @returns {Promise<SessionAppointmentType[]>}
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
 * @typedef SessionAppointmentType
 */
module.exports = mongoose.model('SessionAppointmentType', sessionAppointmentTypeSchema);
