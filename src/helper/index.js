import { API_ENDPOINT } from '../config'

const fetchData = path =>
  Array.isArray(path)
    ? Promise.all(path.map(p => fetchData(p)))
    : fetch(`${API_ENDPOINT}/${path}`)
        .then(res => res.json())
        .catch(() => {
          // TODO: Handle error here
        })

const postData = path => payload =>
  fetch(`${API_ENDPOINT}/${path}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .catch(() => {
      // TODO
    })

const postAppointments = postData('appointments')

const ISO8601Regex = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/

export { fetchData, postAppointments, ISO8601Regex }
