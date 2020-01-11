'use strict'

const Route = use('Route')

Route.group(() => {
  /**
   * @swagger
   * /orders:
   *   get:
   *     tags:
   *       - Order
   *     summary: Get all orders if admin, else all orders in user's history
   *     parameters:
   *       - $ref: '#/components/parameters/ListQuery'
   *     responses:
   *       200:
   *         description: orders
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  Route.get('/', 'Api/OrdersController.index').middleware(['auth:jwt'])
  /**
   * @swagger
   * /orders/{id}:
   *   get:
   *     tags:
   *       - Order
   *     summary: Show an order of a user.
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.get('/:id', 'Api/OrdersController.show').middleware(['auth:jwt']).instance('App/Models/Order')

  /**
   * @swagger
   * /orders/new:
   *   post:
   *     tags:
   *       - Order
   *     summary: Order a new shoutout.
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/NewOrder'
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/new', 'Api/OrdersController.new')/*.middleware(['auth:jwt'])*/

  /**
   * @swagger
   * /orders/{id}/accept:
   *   post:
   *     tags:
   *       - Order
   *     summary: Accept an order.
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/accept', 'Api/OrdersController.accept').middleware(['auth:jwt']).instance('App/Models/Order')

  /**
   * @swagger
   * /orders/{id}/reject:
   *   post:
   *     tags:
   *       - Order
   *     summary: Reject an order.
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/reject', 'Api/OrdersController.reject').middleware(['auth:jwt']).instance('App/Models/Order')

  /**
   * @swagger
   * /orders/{id}/start:
   *   post:
   *     tags:
   *       - Order
   *     summary: Start an ordered shoutout.
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/start', 'Api/OrdersController.start').middleware(['auth:jwt']).instance('App/Models/Order')

  /**
   * @swagger
   * /orders/{id}/complete:
   *   post:
   *     tags:
   *       - Order
   *     summary: Completes an ordered shoutout.
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/complete', 'Api/OrdersController.complete').middleware(['auth:jwt']).instance('App/Models/Order')

  /**
   * @swagger
   * /orders/{id}/pay:
   *   post:
   *     tags:
   *       - Order
   *     summary: Pay for a shoutout.
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               paypal_order_id:
   *                 type: string
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/pay', 'Api/OrdersController.pay').middleware(['auth:jwt']).instance('App/Models/Order')

  // experimental

  /**
   * @swagger
   * /orders/{id}/refund:
   *   post:
   *     tags:
   *       - Order
   *     summary: Refund a shoutout.
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       200:
   *         description: order
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  Route.post('/:id/refund', 'Api/OrdersController.refund').middleware(['auth:jwt']).instance('App/Models/Order')

  /**
   * @swagger
   * /orders/{id}:
   *   delete:
   *     tags:
   *       - Order
   *     summary: Delete an order, only if the user is admin
   *     parameters:
   *       - $ref: '#/components/parameters/Id'
   *     responses:
   *       202:
   *         description: delete success
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  Route.delete('/:id', 'Api/OrdersController.delete').middleware(['auth:jwt']).instance('App/Models/Order')

}).prefix('/api/orders')
