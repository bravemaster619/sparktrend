'use strict'
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const { HttpException } = use('@adonisjs/generic-exceptions')
const Helpers = use('Helpers')

class DownloadController {

  async post({ request, auth, response, params }) {
    const user = auth.user
    if (!(user.verified)) {
      throw UnAuthorizeException.invoke('unverified_user')
    }
    if (user._id.toString() !== params.user_id) {
      throw UnAuthorizeException.invoke('no_ownership')
    }
    console.log(params)
    const fileName = params.filename
    if (!fileName) {
      throw new HttpException('Not found', 404)
    }
    const fileDir = Helpers.publicPath(`uploads/image/posts/${params.user_id.toString()}`)
    const filePath = `${fileDir}/${fileName}`
    console.log(filePath)
    // fs.readFile(filePath, (error, contents) => {
    //   if (error) {
    //     throw new HttpException('Not found', 404)
    //   }
    //   response.send(contents)
    // })
    response.download(filePath)
  }

}

module.exports = DownloadController
