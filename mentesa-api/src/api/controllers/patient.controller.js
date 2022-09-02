const httpStatus = require('http-status');
const { omit } = require('lodash');
const Patient = require('../models/patient.model');

/**
 * Load pacience and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
    try {
        const patient = await Patient.get(id);
        req.locals = { patient };
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Get patient
 * @public
 */
exports.get = (req, res) => res.json(req.locals.patient.transform());

/**
 * Get logged in patient info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.patient.transform());

/**
 * Create new patient
 * @public
 */
exports.create = async (req, res, next) => {    
    try {
        const patient = new Patient(req.body);
        const savedPatient = await patient.save();
        res.status(httpStatus.CREATED);
        res.json(savedPatient.transform());
    } catch (error) {
        next(error);
    }
};

/**
 * Replace existing patient
 * @public
 */
exports.replace = async (req, res, next) => {
    try {
        const { patient } = req.locals;
        const newPatient = new Patient(req.body);
        const newPatientObject = omit(newPatient.toObject(), '_id');
        await patient.updateOne(newPatientObject, { override: true, upsert: true });
        const savedPatient = await Patient.findById(patient._id);

        res.json(savedPatient.transform());
    } catch (error) {
        next(error);
    }
};

/**
 * Update existing patient
 * @public
 */
exports.update = (req, res, next) => {
    const updatedPatient = omit(req.body);
    const patient = Object.assign(req.locals.patient, updatedPatient);

    patient.save()
        .then((savedPatient) => res.json(savedPatient.transform()))
        .catch((e) => next(e));
};

/**
 * Get patient list
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        const patients = await Patient.list(req.query);
        const trasnformedPatients = patients.map((patient) => patient.transform());
        res.json(trasnformedPatients);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete patient
 * @public
 */
exports.remove = (req, res, next) => {
    const { patient } = req.locals;

    patients.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch((e) => next(e));
};
