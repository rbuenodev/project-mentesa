const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/patient.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
    listPatients,
    createPatient,
    replacePatient,
    updatePatient,
} = require('../../validations/patient.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('pacientId', controller.load);

router
    .route('/')
    /**
     * @api {get} v1/patiences List patiences
     * @apiDescription Get a list of patiences
     * @apiVersion 1.0.0
     * @apiName listPatients
     * @apiGroup Patient
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {Number{1-}}         [page=1]             List page
     * @apiParam  {Number{1-100}}      [perPage=1]          patiences per page
     * @apiParam  {String}             [professionalId]     professionalId who takes care of the Patient
     * @apiParam  {String}             [name]               Patient's name
     * @apiParam  {String}             [gender]             Patient's gender
     * @apiParam  {Date}               [birthday]           Patient's birthday
     *
     * @apiSuccess {Object[]} patiences List of patiences.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */
    .get(authorize(ADMIN), validate(listPatients), controller.list)
    /**
     * @api {post} v1/patiences Create Patient
     * @apiDescription Create a new Patient
     * @apiVersion 1.0.0
     * @apiName createPatient
     * @apiGroup Patient
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {String}             professionalId     professionalId who takes care of the Patient
     * @apiParam  {String{..255}}      name               Patient's name
     * @apiParam  {String{..128}}      cpf                Patient's cpf 
     * @apiParam  {String{..128}}      [email]            Patient's email    
     * @apiParam  {String{..128}}      [gender]           Patient's gender
     * @apiParam  {String{..128}}      [birthday]         Patient's birthday
     *
     * @apiSuccess (Created 201) {String}  id              Patient's id
     * @apiSuccess (Created 201) {String}  professionalId  professionalId who takes care of the Patient
     * @apiSuccess (Created 201) {String}  name            Patient's name
     * @apiSuccess (Created 201) {String}  cpf             Patient's cpf
     * @apiSuccess (Created 201) {String}  email           Patient's email
     * @apiSuccess (Created 201) {String}  gender          Patient's gender
     * @apiSuccess (Created 201) {Date}    createdAt       Timestamp
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
     * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
     */
    .post(authorize(ADMIN), validate(createPatient), controller.create);

router
    .route('/:pacientId')
    /**
     * @api {get} v1/patiences/:id Get Patient
     * @apiDescription Patient user information
     * @apiVersion 1.0.0
     * @apiName GetPatient
     * @apiGroup Patient
     * @apiPermission user
     *
     * @apiHeader {String} Authorization   Patient's access token
     *
     * @apiSuccess {String}  id                 Patient's id
     * @apiSuccess {String}  professionalId     professionalId who takes care of the Patient
     * @apiSuccess {String}  name               Patient's name
     * @apiSuccess {String}  email              Patient's email
     * @apiSuccess {String}  cpf                Patient's cpf
     * @apiSuccess {String}  gender             Patient's gender
     * @apiSuccess {Date}    birthday           Patient's birthday
     * @apiSuccess {Date}    createdAt          Timestamp
     *
     * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
     * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
     * @apiError (Not Found 404)    NotFound     Patient does not exist
     */
    .get(authorize(LOGGED_USER), controller.get)
    /**
     * @api {put} v1/patiences/:id Replace Patient
     * @apiDescription Replace the whole Patient document with a new one
     * @apiVersion 1.0.0
     * @apiName replacePatient
     * @apiGroup Patient
     * @apiPermission user
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {String}             professionalId     professionalId who takes care of the Patient
     * @apiParam  {String{..255}}      name               Patient's name
     * @apiParam  {String{..128}}      cpf                Patient's cpf 
     * @apiParam  {String{..128}}      [email]            Patient's email    
     * @apiParam  {String{..128}}      [gender]           Patient's gender
     * @apiParam  {String{..128}}      [birthday]         Patient's birthday    
     *
     * @apiSuccess {String}  id                 Patient's id
     * @apiSuccess {String}  professionalId     professionalId who takes care of the Patient
     * @apiSuccess {String}  name               Patient's name
     * @apiSuccess {String}  email              Patient's email
     * @apiSuccess {String}  cpf                Patient's cpf
     * @apiSuccess {String}  gender             Patient's gender
     * @apiSuccess {Date}    birthday           Patient's birthday
     * @apiSuccess {Date}    createdAt          Timestamp
     *
     * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
     * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
     * @apiError (Not Found 404)    NotFound     User does not exist
     */
    .put(authorize(LOGGED_USER), validate(replacePatient), controller.replace)
    /**
     * @api {patch} v1/patiences/:id Update Patient
     * @apiDescription Update some fields of a Patient document
     * @apiVersion 1.0.0
     * @apiName updatePatient
     * @apiGroup Patient
     * @apiPermission user
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {String}             professionalId     professionalId who takes care of the Patient
     * @apiParam  {String{..255}}      name               Patient's name
     * @apiParam  {String{..128}}      cpf                Patient's cpf 
     * @apiParam  {String{..128}}      [email]            Patient's email    
     * @apiParam  {String{..128}}      [gender]           Patient's gender
     * @apiParam  {String{..128}}      [birthday]         Patient's birthday     
     *
     * @apiSuccess {String}  id                 Patient's id
     * @apiSuccess {String}  professionalId     professionalId who takes care of the Patient
     * @apiSuccess {String}  name               Patient's name
     * @apiSuccess {String}  email              Patient's email
     * @apiSuccess {String}  cpf                Patient's cpf
     * @apiSuccess {String}  gender             Patient's gender
     * @apiSuccess {Date}    birthday           Patient's birthday
     * @apiSuccess {Date}    createdAt          Timestamp
     *
     * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
     * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
     * @apiError (Not Found 404)    NotFound     Patient does not exist
     */
    .patch(authorize(LOGGED_USER), validate(updatePatient), controller.update)
    /**
     * @api {patch} v1/patiences/:id Delete Patient
     * @apiDescription Delete a Patient
     * @apiVersion 1.0.0
     * @apiName DeletePatient
     * @apiGroup Patient
     * @apiPermission user
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiSuccess (No Content 204)  Successfully deleted
     *
     * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
     * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
     * @apiError (Not Found 404)    NotFound      User does not exist
     */
    .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
