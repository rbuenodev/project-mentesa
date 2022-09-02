const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/session.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
    listSession,
    createSession,
    replaceSession,
    updateSession,
} = require('../../validations/session.validation');

const router = express.Router();

/**
 * Load patient when API with patientId route parameter is hit
 */
router.param('sessionId', controller.load);

router
    .route('/:professionalId/sessions')
    .get(authorize(ADMIN), validate(listSession), controller.list)    
    .post(authorize(ADMIN), validate(createSession), controller.create);

router
    .route('/:professionalId/sessions/:patientId')
    .get(authorize(LOGGED_USER), controller.get)
    .put(authorize(LOGGED_USER), validate(replaceSession), controller.replace)
    .patch(authorize(LOGGED_USER), validate(updateSession), controller.update)
    .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
