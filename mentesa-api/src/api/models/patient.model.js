const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
 * patient Schema
 * @private
 */
const patientSchema = new mongoose.Schema({
    professionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professional',
        required: true,
    },
    name: {
        type: String,
        maxlength: 255,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: false,
        unique: false,
        trim: true,
        lowercase: true,
    },
    cpf: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
    },
    gender: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
    },
    birthday: {
        type: Date,
    },
}, {
    timestamps: true,
});


/**
 * Methods
 */
patientSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'professionalId', 'name', 'email', 'cpf', 'gender', 'birthday', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

/**
 * Statics
 */
patientSchema.statics = {

    /**
     * Get patient
     *
     * @param {ObjectId} id - The objectId of patient.
     * @returns {Promise<Patient, APIError>}
     */
    async get(id) {
        let patient;

        if (mongoose.Types.ObjectId.isValid(id)) {
            patient = await this.findById(id).exec();
        }
        if (patient) {
            return patient;
        }

        throw new APIError({
            message: 'patient does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * List patient in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of patients to be skipped.
     * @param {number} limit - Limit number of patients to be returned.     
     * @returns {Promise<Pacient[]>}
     */
    list({
        page = 1, perPage = 30, id, professionalId, name, email, cpf, gender, birthday,
    }) {
        const options = omitBy({ id, professionalId, name, email, cpf, gender, birthday }, isNil);

        return this.find(options,)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },
};

/**
 * @typedef Patient
 */
module.exports = mongoose.model('Patient', patientSchema);
