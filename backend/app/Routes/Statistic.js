const Route = use('Route')


Route.group('statistics', () => {
  /**
   * @swagger
   * /statistics/dashboard:
   *   get:
   *     tags:
   *       - Statistics
   *     summary: Statistics for dashboard
   *     responses:
   *       200:
   *         description: Statistics for dashboard
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 monthlySale:
   *                   type: double
   *                 totalSale:
   *                   type: double
   *                 purchaseStats:
   *                   type: object
   *                   properties:
   *                     started:
   *                       type: integer
   *                     expired:
   *                       type: integer
   *                     rejected:
   *                       type: integer
   *                     completed:
   *                       type: integer
   *                     failed:
   *                       type: integer
   *                 salesStats:
   *                   type: object
   *                   properties:
   *                     started:
   *                       type: integer
   *                     expired:
   *                       type: integer
   *                     rejected:
   *                       type: integer
   *                     completed:
   *                       type: integer
   *                     failed:
   *                       type: integer
   *                 upcomingOrders:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Order'
   */
  Route.get('/dashboard', 'Api/StatisticController.dashboard').middleware(['auth:jwt'])

}).prefix('/api/statistics')
