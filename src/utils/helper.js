export function getAuthString() {
    let tokenType = window.localStorage.getItem('tokenType') || 'Bearer';
    let apiToken = window.localStorage.getItem('token');
    return `${tokenType} ${apiToken}`;
}

export function generatePermNode(permName, apiName) {
    return `${apiName}:${permName}`;
}
