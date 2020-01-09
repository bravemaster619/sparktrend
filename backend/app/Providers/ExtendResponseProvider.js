const { ServiceProvider } = require('@adonisjs/fold')

class ExtendResponseProvider extends ServiceProvider {
  boot () {
    const Response = use('Adonis/Src/Response')
    const { Env } = use('Adonis/Src/Env')
    Response.macro('validateFailed', function (errorMessages) {
      this.status(422).json({
        status: 422,
        code: 'E_VALIDATE_FAILED',
        message: 'Validation failed',
        errors: errorMessages
      })
    })

    Response.macro('apiCreated', function (item, meta) {
      this.status(201).json({
        status: 201,
        message: 'Created successfully',
        data: item,
        meta: meta
      })
    })

    Response.macro('apiUpdated', function (item, meta) {
      this.status(202).json({
        status: 202,
        message: 'Updated successfully',
        data: item,
        meta: meta
      })
    })

    Response.macro('apiDeleted', function (item, meta) {
      this.status(202).json({
        status: 202,
        message: 'Deleted successfully',
        data: item,
        meta: meta
      })
    })

    Response.macro('apiItem', function (item, meta) {
      this.status(200).json({
        status: 200,
        message: 'Data retrieval successfully',
        data: item,
        meta: meta
      })
    })

    Response.macro('apiCollection', function (items, meta) {
      this.status(200).json({
        status: 200,
        message: 'Data retrieval successfully',
        data: items,
        meta: meta
      })
    })

    Response.macro('apiSuccess', function (data, meta, message) {
      this.status(200).json({
        status: 200,
        message: message || 'Success',
        data: data,
        meta: meta
      })
    })

    Response.macro('apiFail', function(error, message, data) {
      if (Env.get('NODE_ENV', 'development') === 'development') {
        this.status(500).json({
          status: 500,
          message: message || error.message,
          error,
          data
        })
      } else {
        this.status(500).json({
          status: 500,
          message: message || 'Failed',
          data
        })
      }
    })

  }
}

module.exports = ExtendResponseProvider
