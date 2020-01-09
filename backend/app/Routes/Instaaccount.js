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
   *                   $ref: '#/components/schemas/Instaaccount'
   */
  Route.get('/', 'Api/InstaaccountsController.index')

  Route.post('/new', 'Api/InstaaccountsController.create')

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

  Route.post('/:id/register-instagram', 'Api/InstaaccountsController.')

}).prefix('/api/instaaccounts')
