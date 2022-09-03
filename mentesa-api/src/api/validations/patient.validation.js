const Joi = require('joi');

module.exports = {

    // GET /v1/:professionalId/patients
    listPatients: {
        query: {
            page: Joi.number().min(1),
            perPage: Joi.number().min(1).max(100),
            professionalId: Joi.string(),
            name: Joi.string(),
            gender: Joi.string(),
            birthday: Joi.date(),
            createdAt: Joi.date(),
        },   
        params: {
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),                   
        },
    },

    // POST /v1/:professionalId/patients
    createPatient: {
        body: {
            professionalId: Joi.string().required(),
            name: Joi.string().required(),
            cpf: Joi.string().required(),
            email: Joi.string().email(),
            gender: Joi.string(),
        },
        params: {
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),                   
        },
    },

    // PUT /v1/:professionalId/patients/:patientId
    replacePatient: {
        body: {
            professionalId: Joi.string(),
            name: Joi.string(),
            cpf: Joi.string(),
            email: Joi.string().email(),
            gender: Joi.string(),
        },
        params: {
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),            
        },
    },

    // PATCH /v1/:professionalId/patients/:patientId
    updatePatient: {
        body: {
            professionalId: Joi.string(),
            name: Joi.string(),
            cpf: Joi.string(),
            email: Joi.string().email(),
            gender: Joi.string(),
        },
        params: {
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },
};
