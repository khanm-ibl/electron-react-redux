/**
* Send asynchronously GET request.
* @param {string} strUrl
* @return {promise}
*/
export function get (strUrl, params) {
  return new Promise((resolve, reject) => {
    let url = ''
    if (strUrl) url = new URL(strUrl)
    else return reject
    if (params) Object.keys(params).forEach(key => { if (params[key] || params[key] === 0) url.searchParams.append(key, params[key]) })
    console.log('url================>', url)
    return doGet(url.toString()).then(resolve).catch(reject)
  })
}

/**
* Send asynchronously POST request.
* @param {string} strUrl
* @param {object} objData
* @return {promise}
*/
export function post (strUrl, objData) {
  return new Promise((resolve, reject) => {
    return doPost(strUrl, objData).then(resolve).catch(reject)
  })
}

// Private function

function buildHeaders () {
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
  return headers
}

function doGet (strUrl) {
  return new Promise((resolve, reject) => {
    const opts = {
      method: 'GET',
      headers: buildHeaders()
    }
    return fetch(strUrl, opts).then((response) => response.json()).then((jsonResponse) => { // eslint-disable-line
      resolve(jsonResponse)
    }).catch((error) => { // eslint-disable-line
      console.error('[REQUEST] doGet error: ', error)
      return reject(error)
    })
  })
}

function doPost (strUrl, objData) {
  return new Promise((resolve, reject) => {
    const opts = {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(objData)
    }
    return fetch(strUrl, opts).then((response) => response.json()).then((jsonResponse) => { // eslint-disable-line
      resolve(jsonResponse)
    }).catch((error) => { // eslint-disable-line
      console.error('[REQUEST] doPost error: ', error)
      return reject(error)
    })
  })
}
