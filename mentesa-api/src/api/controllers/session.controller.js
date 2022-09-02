const httpStatus = require('http-status');
const { omit } = require('lodash');
const Session = require('../models/session.model');
const SessionPatient  = require('../models/sessionPatient.model');

/**
 * Load session and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const session = await Session.get(id);
    req.locals = { session };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get session
 * @public
 */
exports.get = (req, res) => res.json(req.locals.session.transform());
/**
 * Get logged in session info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.session.transform());

/**
 * Create new session
 * @public
 */
exports.create = async (req, res, next) => {
  try {    
    const session = new Session(req.body);
    const savedSession = await session.save();
    const { patientId,professionalId }= savedSession;
    const sessionPatient = new SessionPatient(({patientId,professionalId}));
    await sessionPatient.save();
    res.status(httpStatus.CREATED);
    res.json(savedSession.transform());    
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing sessions
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { session } = req.locals;
    const newSession = new Session(req.body);    
    const newSessionObject = omit(newSession.toObject(), '_id');
    await session.updateOne(newSessionObject, { override: true, upsert: true });
    const savedSession = await Session.findById(session._id);

    res.json(savedSession.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing session
 * @public
 */
exports.update = (req, res, next) => {
  const updatedSession = req.body;
  const session = Object.assign(req.locals.session, updatedSession);

  user.save()
    .then((savedUser) => res.json(savedUser.transform()))
    .catch((e) => next(User.checkDuplicateEmail(e)));
};

/**
 * Get session list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const sessions = await Session.list(req.query);
    const transformedSessions = sessions.map((session) => session.transform());
    res.json(transformedSessions);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete session
 * @public
 */
exports.remove = (req, res, next) => {
  const { session } = req.locals;

  session.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
