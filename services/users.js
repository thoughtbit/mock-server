import request from './../utils/request'
import qs from 'qs'

const ROOT_API = 'http://localhost:8989'

export async function query(params) {
  return request(`${ROOT_API}/users?${qs.stringify(params)}`)
}

export async function findOne() {
  return request(`${ROOT_API}/api/users/1`)
}

export async function find() {
  return request(`${ROOT_API}/find`)
}

export async function create(params) {
  return request(`${ROOT_API}/api/users`, {
    method: 'post',
    body: qs.stringify(params)
  })
}

export async function remove(params) {
  return request(`${ROOT_API}/api/users`, {
    method: 'delete',
    body: qs.stringify(params)
  })
}

export async function update(params) {
  return request(`${ROOT_API}/api/users`, {
    method: 'put',
    body: qs.stringify(params)
  })
}
