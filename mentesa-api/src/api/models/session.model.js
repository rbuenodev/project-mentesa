const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
 * session Schema
 * @private
 */
const sessionSchema = new mongoose.Schema({
    professionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    appointmentDate: {
        type: Date,
        index: true,
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SessionStatus',
        required: true,
    },
    topic: {
        type: String,
        maxlength: 255,
        index: true,
        trim: true,
    },
    appointmentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AppointmentType',
    },
    sessionTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SessionType',
    },
    duration: {
        type: String,
    },
}, {
    timestamps: true,
});


/**
 * Methods
 */
sessionSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'professionalId', 'patientId', 'appointmentDate', 'statusId', 'topic', 'appointmentTypeId', 'sessionTypeId', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

/**
 * Statics
 */
sessionSchema.statics = {

    /**
     * Get session
     *
     * @param {ObjectId} id - The objectId of session.
     * @returns {Promise<Session, APIError>}
     */
    async get(id) {
        let session;

        if (mongoose.Types.ObjectId.isValid(id)) {
            session = await this.findById(id).exec();
        }
        if (session) {
            return session;
        }

        throw new APIError({
            message: 'session does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * List session in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of session to be skipped.
     * @param {number} limit - Limit number of session to be returned.     
     * @returns {Promise<Session[]>}
     */
    list({
        page = 1, perPage = 30, id, professionalId, patientId, appointmentDate, statusId
    }) {
        const options = omitBy({ id, professionalId, patientId, appointmentDate, statusId }, isNil);

        return this.find(options,)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },
};

/**
 * @typedef Session
 */
module.exports = mongoose.model('Session', sessionSchema);
