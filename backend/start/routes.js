'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/
/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})




Route.group(() => {

  // Route.get('/migrate', 'Api/MigrationController.migrate');

  // Route.get('/seed', 'Api/MigrationController.seed');

  Route.get('/instainfo', 'Api/InstaaccountsController.getInstaInfo')

}).prefix('/api')

Route.group(() => {

  Route.get('/image/posts/:user_id/:filename', 'DownloadController.post').middleware(['auth:jwt'])

}).prefix('/api/download')

use('require-all')(`${use('Helpers').appRoot()}/app/Routes`)
