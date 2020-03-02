const API = 'http://localhost:3000/api'

export function login(params) {
    return fetch(API + '/authentication', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}