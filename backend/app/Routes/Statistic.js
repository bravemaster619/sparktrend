const Route = use('Route')


Route.group('statistics', () => {
  Route.get('/dashboard', 'Api/StatisticController.dashboard').middleware(['auth:jwt'])
}).prefix('/api/statistics')
