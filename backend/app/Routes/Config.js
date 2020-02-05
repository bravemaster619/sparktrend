const Route = use('Route')

Route.group('config', () => {

  Route.get('/', 'Api/ConfigController.index')

  Route.put('/', 'Api/ConfigController.store')

}).middleware(['authAdmin:jwt']).prefix('/api/config')
