const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
 * sessionPatient Schema
 * @private
 */
const sessionPatientSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    },
});


/**
 * Methods
 */
sessionPatientSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'patientId', 'sessionId'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

/**
 * Statics
 */
sessionPatientSchema.statics = {

    /**
     * Get session
     *
     * @param {ObjectId} id - The objectId of sessionPatient.
     * @returns {Promise<SessionPatient, APIError>}
     */
    async get(id) {
        let sessionPatient;

        if (mongoose.Types.ObjectId.isValid(id)) {
            sessionPatient = await this.findById(id).exec();
        }
        if (sessionPatient) {
            return sessionPatient;
        }

        throw new APIError({
            message: 'sessionPatient does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * List sessionPatient in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of sessionPatient to be skipped.
     * @param {number} limit - Limit number of sessionPatient to be returned.     
     * @returns {Promise<SessionPatient[]>}
     */
    list({
        page = 1, perPage = 30, id, patientId, sessionId
    }) {
        const options = omitBy({ id, patientId, sessionId }, isNil);

        return this.find(options,)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },
};

/**
 * @typedef SessionPatient
 */
module.exports = mongoose.model('SessionPatient', sessionPatientSchema);
