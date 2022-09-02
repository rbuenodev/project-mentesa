const Joi = require('joi');

module.exports = {

    // GET /v1/:professionalId/sessions
    listSession: {
        query: {
            page: Joi.number().min(1),
            perPage: Joi.number().min(1).max(100),
            professionalId: Joi.string(),
            patientId: Joi.string(),
            statusId: Joi.string(),
            topic: Joi.string(),
            appointmentTypeId: Joi.string(),
            sessionTypeId: Joi.string(),
            duration: Joi.string(),
        },
        params: {
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },

    // POST /v1/:professionalId/sessions
    createSession: {
        body: {
            professionalId: Joi.string().required(),
            patientId: Joi.string().required(),
            statusId: Joi.string().required(),
            topic: Joi.string(),
            appointmentTypeId: Joi.string(),
            sessionTypeId: Joi.string(),
            duration: Joi.string(),
        },
        params: {            
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },

    // PUT /v1/:professionalId/sessions/:sessionId
    replaceSession: {
        body: {
            professionalId: Joi.string().required(),
            patientId: Joi.string().required(),
            statusId: Joi.string(),
            topic: Joi.string(),
            appointmentTypeId: Joi.string(),
            sessionTypeId: Joi.string(),
            duration: Joi.string(),
        },
        params: {
            patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },

    // PATCH /v1/:professionalId/sessions/:sessionId
    updateSession: {
        body: {
            professionalId: Joi.string().required(),
            patientId: Joi.string().required,
            statusId: Joi.string(),
            topic: Joi.string(),
            appointmentTypeId: Joi.string(),
            sessionTypeId: Joi.string(),
            duration: Joi.string(),
        },
        params: {
            patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            professionalId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },
};
