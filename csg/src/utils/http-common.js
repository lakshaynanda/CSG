import axios from 'axios'
export const API_BASE_URL = 'https://csg-cyber.my.salesforce.com/services/'

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // 'Content-Type': 'application/json'
    Authorization: 'Bearer ' + '00D5Y000002URDe!AQEAQE5.OqKKhPu8dys2opqxBg.gosRw.SQq99zIrZ4T0wb79CNe6XQPMOeLzVUPMIrETl7ndAYugZ0TrAvDZGj_8aB5.hMQ'
  }
})

export default http
