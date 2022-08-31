const Joi = require('joi');

module.exports = {

    // GET /v1/patients
    listPatients: {
        query: {
            page: Joi.number().min(1),
            perPage: Joi.number().min(1).max(100),
            professionalId: Joi.string(),
            name: Joi.string(),
            gender: Joi.string(),
            birthday: Joi.date(),
        },
    },

    // POST /v1/patients
    createPatient: {
        body: {
            professionalId: Joi.string().required(),
            name: Joi.string().required(),
            cpf: Joi.string().required(),
            email: Joi.string().email(),
            gender: Joi.string(),
        },
    },

    // PUT /v1/patients/:patientId
    replacePatient: {
        body: {
            professionalId: Joi.string(),
            name: Joi.string(),
            cpf: Joi.string(),
            email: Joi.string().email(),
            gender: Joi.string(),
        },
        params: {
            patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },

    // PATCH /v1/patients/:patientId
    updatePatient: {
        body: {
            professionalId: Joi.string(),
            name: Joi.string(),
            cpf: Joi.string(),
            email: Joi.string().email(),
            gender: Joi.string(),
        },
        params: {
            patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },
};
