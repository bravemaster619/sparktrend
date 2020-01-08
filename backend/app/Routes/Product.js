'use strict'

const Route = use('Route')

Route.group('product', () => {
  /**
   * @swagger
   * /products:
   *   get:
   *     tags:
   *       - Product
   *     summary: Get products
   *     parameters:
   *       - $ref: '#/components/parameters/ListQuery'
   *     responses:
   *       200:
   *         description: products
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                   $ref: '#/components/schemas/Product'
   */
  Route.get('/', 'Api/ProductsController.index')

  Route.post('/new', 'Api/ProductsController.store').validator('StoreProduct')

}).prefix('/api/products')
