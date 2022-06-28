import BaseRequest from './BaseRequest.js'

export const createRequest = (req, res, next) => {
  BaseRequest.setRules({
    'name': 'required|string|max:255',
    'email': 'required|string|email|max:255',
  })

  return BaseRequest.validated(req, res, next)
}

export const updateRequest = (req, res, next) => {
  BaseRequest.setRules({
    'name': 'required|string|max:255',
    'email': 'required|string|email|max:255',
  })

  return BaseRequest.validated(req, res, next)
}