import http from '../utils/http-common'

export default class UserForm {
  static getServiceMembers () {
    return http.get('data/v52.0/sobjects/ServiceMember__c/describe')
  }

  static getAuth (data) {
      if (data) {
        return http.post('oauth2/token', data)
      }
  }

  static postServiceMember (data) {
    if (data) {
      return http.post('dashboards/dashboard/', data)
    }
  }
}
