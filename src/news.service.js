async function getIndiaNews (baseUrl) {
    return fetch(baseUrl + 'country=in').then(res => res.json());
}

async function search (baseUrl, query) {
    return fetch(baseUrl + `country=in&q=${query}`).then(res => res.json());
}

export default {
    getIndiaNews,
    search
}