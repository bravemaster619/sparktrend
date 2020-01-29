const Model = use('Model')
const { $n } = require('../Helpers')

/**
 * @swagger
 * components:
 *   schemas:
 *     Config:
 *       type: object
 *       required:
 *         - charge
 *         - seller
 *         - order
 *       properties:
 *         charge:
 *           type: object
 *           properties:
 *             commission:
 *               type: integer
 *             referrer:
 *               type: integer
 *         seller:
 *           type: object
 *           properties:
 *             minimum_followers:
 *               type: integer
 *         order:
 *           type: object
 *           properties:
 *             time_margin:
 *               type: object
 *               properties:
 *                 start_from:
 *                   type: integer
 *                 accept:
 *                   type: integer
 *                 start_time:
 *                   type: integer
 *                 complete:
 *                   type: integer
 */
class Config extends Model {
  static get table() {
    return 'config'
  }
}
