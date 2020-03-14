'use strict'

const Route = use('Route')

Route.group(() => {
  /**
   * @swagger
   * /instaaccounts:
   *   get:
   *     tags:
   *       - Instaaccount
   *     summary: Get all instaaccounts
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
   * /instaaccounts/adminlist:
   *   get:
   *     tags:
   *       - Admin
   *     summary: List all instaaccounts for admin dashboard
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Instaaccount'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  Route.get('/adminlist', 'Api/InstaaccountsController.adminList').middleware(['authAdmin:jwt'])

  /**
   * @swagger
   * /instaaccounts/products:
   *   get:
   *     tags:
   *       - Instaaccount
   *       - Product
   *     summary: Get product list
   *     responses:
   *       200:
   *         description: products registered to insta accounts
   *         content:
   *           application/json:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/Instaaccount'
   */
  Route.get('/products', 'Api/InstaaccountsController.products')

  /**
   * @swagger
   * /instaaccounts/myproducts:
   *   get:
   *     summary: show registered instagram accounts of a user
   *     tags:
   *       - Instaaccount
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Instaaccount'
   *
   */
  Route.get('/myproducts', 'Api/InstaaccountsController.myproducts').middleware(['auth:jwt'])


  /**
   * @swagger
   * /instaaccounts/{id}:
   *   get:
   *     tags:
   *       - Instaaccount
   *     summary: Returns Instaaccount
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
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
   * /instaaccounts/{id}/related:
   *   get:
   *     tags:
   *       - Instaaccount
   *     summary: Returns array of Instaaccounts similar to an account
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Instaaccount'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.get('/:id/related', 'Api/InstaaccountsController.related').instance('App/Models/Instaaccount')

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
   *               $ref: '#/components/schemas/RegisterToInstagram'
   */
  Route.post('/new', 'Api/InstaaccountsController.create').middleware(['auth:jwt'])


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
   * /instaaccounts/{id}/product:
   *   post:
   *     tags:
   *       - Instaaccount
   *       - Product
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

  /**
   * @swagger
   * /instaaccounts/{id}:
   *   delete:
   *     tags:
   *       - Instaaccount
   *     summary: Delete an instaaccount
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: delete success
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       403:
   *         $ref: '#/components/responses/Forbidden'
   */
  Route.delete('/:id', 'Api/InstaaccountsController.delete').middleware(['authAdmin:jwt']).instance('App/Models/Instaaccount')

  /**
   * @swagger
   * /instaaccounts/{id}/product:
   *   delete:
   *     tags:
   *       - Instaaccount
   *       - Product
   *     summary: Delete the product of an instaaccount
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *             schema:
   *             $ref: '#/components/schemas/Instaaccount'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       403:
   *         $ref: '#/components/responses/Forbidden'
   */
  Route.delete('/:id/product', 'Api/InstaaccountsController.deleteProduct').middleware(['auth:jwt']).instance('App/Models/Instaaccount')



  /**
   * @swagger
   * /instaaccounts/{id}/adminshow:
   *   get:
   *     tags:
   *       - Admin
   *     summary: Get instaaccount info for admin dashboard
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: instaaccount
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Instaaccount'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       403:
   *         $ref: '#/components/responses/Forbidden'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   */
  Route.get('/:id/adminshow', 'Api/InstaaccountsController.adminShow').middleware(['authAdmin:jwt']).instance('App/Models/Instaaccount')

  /**
   * @swagger
   * /instaaccounts/{id}/adminedit:
   *   put:
   *     tags:
   *       - Admin
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
  Route.put('/:id/adminedit', 'Api/InstaaccountsController.adminEdit').middleware(['authAdmin:jwt']).instance('App/Models/Instaaccount')


}).prefix('/api/instaaccounts')
