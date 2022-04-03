import validator from 'validator'
import { LoginType, UserType } from './Types'

export const LoginValidator = async (params: LoginType): Promise<boolean | string> => {
  if (!params.username || !params.password) {
    return 'Parameter {username & password } is Required'
  }
  return true
}

export const userValidator = async (params: UserType): Promise<boolean | string> => {
  if (!params.username || !params.password || !params.fullname) {
    return 'Parameter {username & password & fullname} is Required'
  }
  return true
}
