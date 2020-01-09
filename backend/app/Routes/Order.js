'use strict'

const Route = use('Route')

Route.group(() => {
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

}).prefix('/api/orders')
