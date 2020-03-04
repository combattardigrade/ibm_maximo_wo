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

export function getWorkOrders(params) {
    return fetch(API + '/workOrders', {
        method: 'GET',        
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getJobPlan(params) {
    return fetch(API + '/jobPlan/' + params.jpnum, {
        method: 'GET',        
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}