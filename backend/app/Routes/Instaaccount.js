'use strict'

const Route = use('Route')

Route.group(() => {
  /**
   * @swagger
   * /instaaccounts:
   *   get:
   *     tags:
   *       - Instaaccount
   *     summary: Get instaaccounts
   *     parameters:
   *       - $ref: '#/components/parameters/ListQuery'
   *     responses:
   *       200:
   *         description: instaaccounts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Instaaccount'
   */
  Route.get('/', 'Api/InstaaccountsController.index')

  /**
   * @swagger
   * /instaaccounts/{id}:
   *   get:
   *     tags:
   *       - Instaaccount
   *     summary: Returns Instaaccount
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *       - $ref: '#/components/parameters/SingleQuery'
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Instaaccount'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */

  Route.get('/:id', 'Api/InstaaccountsController.show').instance('App/Models/Instaaccount')
  /**
   * @swagger
   * /instaaccounts/new:
   *   post:
   *     tags:
   *       - Instaaccount
   *     summary: Register a new instagram account
   *     requestBody:
   *       required: true,
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 required: true
   *                 type: string
   *     responses:
   *       200:
   *         description: instaaccounts
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NewInstaaccount'
   */
  Route.post('/new', 'Api/InstaaccountsController.create').middleware(['auth:jwt'])

  /**
   * @swagger
   * /instaaccounts/{id}/register-instagram:
   *   post:
   *     tags:
   *       - Instaaccount
   *     summary: Connects to instagram account
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RegisterToInstagram'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/register-instagram', 'Api/InstaaccountsController.registerInstagram').middleware(['auth:jwt']).instance('App/Models/Instaaccount')
  /**
   * @swagger
   * /instaaccounts/{id}/validate-instagram:
   *   post:
   *     tags:
   *       - Instaaccount
   *     summary: validate instagram account
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RegisterToInstagram'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/validate-instagram', 'Api/InstaaccountsController.validateInstagram').middleware(['auth:jwt']).instance('App/Models/Instaaccount')

  /**
   * @swagger
   * /instaaccounts/{id}/upload-insights:
   *   post:
   *     tags:
   *       - Instaaccount
   *     summary: Upload images to user
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               image:
   *                 required: true
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Instaaccount'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       403:
   *         $ref: '#/components/responses/Forbidden'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   */
  Route.post('/:id/upload-insights', 'Api/InstaaccountsController.uploadInsights').middleware(['auth:jwt']).instance('App/Models/Instaaccount')

  /**
   * @swagger
   * /instaaccounts/{id}/adminedit:
   *   put:
   *     tags:
   *       - Instaaccount
   *     summary: Admin edit to verified instagram accounts
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AdminEditInstaaccount'
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Instaaccount'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       403:
   *         $ref: '#/components/responses/Forbidden'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   */
  Route.put('/:id/adminedit', 'Api/InstaaccountsController.adminEdit').middleware(['auth:jwt']).instance('App/Models/Instaaccount')

  /**
   * @swagger
   * /instaaccounts/{id}/product:
   *   post:
   *     tags:
   *       - Instaaccount
   *     summary: Add or save product to a instagram account
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       200:
   *        description: instaaccount
   *        content:
   *          application/json:
   *              schema:
   *                $ref: '#/components/schemas/Instaaccount'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       403:
   *         $ref: '#/components/responses/Forbidden'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   */
  Route.post('/:id/product', 'Api/InstaaccountsController.storeProduct').middleware(['auth:jwt']).instance('App/Models/Instaaccount')

  Route.delete('/id:/')
}).prefix('/api/instaaccounts')
