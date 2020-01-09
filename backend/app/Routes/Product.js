'use strict'

const Route = use('Route')

Route.group('product', () => {

  // Route.post('/new', 'Api/ProductsController.store').validator('StoreProduct').instance('App/Models/Instaaccount')

}).prefix('/api/products')
