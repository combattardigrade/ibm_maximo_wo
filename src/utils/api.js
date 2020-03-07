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

export function getWorkOrder(params) {
    return fetch(API + '/workOrder/' + params.wonum, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAsset(params) {
    return fetch(API + '/asset/' + params.assetnum, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getLabor(params) {
    return fetch(API + '/labor/' + params.laborid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getWhoAmI(params) {
    return fetch(API + '/whoami/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAssets(params) {
    return fetch(API + '/assets/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function findAsset(params) {
    return fetch(API + '/findAsset', {
        method: 'POST',
        body: JSON.stringify({ method: params.method, value: params.value }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getInventory(params) {
    return fetch(API + '/inventory/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function findInventoryItem(params) {
    return fetch(API + '/findInventoryItem', {
        method: 'POST',
        body: JSON.stringify({ method: params.method, value: params.value }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}