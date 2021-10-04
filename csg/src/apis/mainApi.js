import http from '../utils/http-common'

export default class UserForm {
  static getServiceMembers () {
    return http.get('data/v52.0/query?q=SELECT Name,AGE__c, RANK__c, DUTY__c, TAC__c, LOE__c, IT__c  From ServiceMember__c')
  }

  static getAuth (data) {
      if (data) {
        return http.post('oauth2/token', data)
      }
  }

  static postServiceMember (data) {
    if (data) {
      return http.post('data/v52.0/sobjects/ServiceMember__C/', data)
    }
  }
}
