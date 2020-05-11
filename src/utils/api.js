// const API = 'http://155.138.226.217:3002/api'
const API = 'http://192.168.0.173:3000/api'

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

export function getAssetSafety(params) {
    return fetch(API + '/assetSafety/' + params.assetnum, {
        method: 'GET',        
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getWOSafety(params) {
    return fetch(API + '/woSafety/' + params.wonum, {
        method: 'GET',        
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateTaskStatus(params) {    
    return fetch(API + '/task/updateStatus', {
        method: 'POST',
        body: JSON.stringify({
            woHref: params.woHref,
            taskHref: params.taskHref,
            status: params.status
        }),     
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        
    })  
    .catch((err) => console.log(err))
}

export function findWorkOrder(params) {
    return fetch(API + '/findWorkOrder', {
        method: 'POST',
        body: JSON.stringify({ method: params.method, value: params.value }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function checkWOHazardVerification(params) {
    return fetch(API + '/checkWOHazardVerification', {
        method: 'POST',
        body: JSON.stringify({ wonum: params.wonum }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function sendWOHazardVerification(params) {
    return fetch(API + '/sendWOHazardVerification', {
        method: 'POST',
        body: JSON.stringify({ wonum: params.wonum }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getLaborCatalog(params) {
    console.log(params)
    return fetch(API + '/getLaborCatalog/', {
        method: 'POST',
        body: JSON.stringify({searchMethod: params.searchMethod, searchValue: params.searchValue}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function findLocation(params) {
    return fetch(API + '/findLocation', {
        method: 'POST',
        body: JSON.stringify({ method: params.method, value: params.value }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getLocations(params) {
    return fetch(API + '/locations/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getFailureCodes(params) {
    return fetch(API + '/getFailureCodes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function findFailureCode(params) {
    return fetch(API + '/findFailureCode', {
        method: 'POST',
        body: JSON.stringify({ searchParam: params.searchParam, searchValue: params.searchValue }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getMaterials(params) {
    return fetch(API + '/getMaterials', {
        method: 'GET',       
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function findMaterial(params) {
    return fetch(API + '/findMaterial', {
        method: 'POST',
        body: JSON.stringify({ method: params.method, value: params.value }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function createReportOfWorkDone(params) {
    return fetch(API + '/createReportOfWorkDone', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function createReportOfScheduledWork(params) {
    return fetch(API + '/createReportOfScheduledWork', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateWOStatus(params) {
    return fetch(API + '/wo/status', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getWorkOrderTasks(params) {
    return fetch(API + `/workOrderTasks/${params.wonum}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function sendWODocumentation(params) {
    return fetch(API + `/wo/doc`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}



