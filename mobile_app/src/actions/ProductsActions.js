import { checkHttpStatus, parseJSON } from './../utils/index';
import { ProductsConstants } from './../constants/ProductsConstant';


export function retrieveProductsSeason(token,id_zone) {
    const p = retrieveProductsSeasonAjax(token,id_zone);
    return {
        type: [ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_REQUEST, ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_SUCCESS, ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_FAILURE],
        promise: p,
    }
}
export function retrieveProductsSeasonAjax(token,id_zone) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(ProductsConstants.APIEndpoints.GET_SEASON_PRODUCTS+"?id_zone="+id_zone, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function retrieveProductsSeasonById(token,id_zone,id_season) {
    const p = retrieveProductsSeasonAjaxById(token,id_zone,id_season);
    return {
        type: [ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_REQUEST, ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_SUCCESS, ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_FAILURE],
        promise: p,
    }
}
export function retrieveProductsSeasonAjaxById(token,id_zone,id_season) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(ProductsConstants.APIEndpoints.GET_SEASON_PRODUCTS_BY_ID+"?id_zone="+id_zone+"&id_season="+id_season, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}


export function retrieveMyListProductsSeason(token) {
    const p = retrieveMyListProductsSeasonAjax(token);
    return {
        type: [ProductsConstants.ActionTypes.GET_MY_PRODUCTS_REQUEST, ProductsConstants.ActionTypes.GET_MY_PRODUCTS_SUCCESS, ProductsConstants.ActionTypes.GET_MY_PRODUCTS_FAILURE],
        promise: p,
    }
}
export function retrieveMyListProductsSeasonAjax(token) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(ProductsConstants.APIEndpoints.GET_MY_PRODUCTS, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function addMyProductsSeason(token,title) {
    const p = addMyProductsSeasonAjax(token,title);
    return {
        type: [ProductsConstants.ActionTypes.ADD_PRODUCT_REQUEST, ProductsConstants.ActionTypes.ADD_PRODUCT_SUCCESS, ProductsConstants.ActionTypes.ADD_PRODUCT_FAILURE],
        promise: p,
    }
}
export function addMyProductsSeasonAjax(token,title) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(ProductsConstants.APIEndpoints.ADD_PRODUCT, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({title:title}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}export function deleteMyProductsSeason(token,id_product) {
    const p = deleteMyProductsSeasonAjax(token,id_product);
    return {
        type: [ProductsConstants.ActionTypes.DELETE_PRODUCT_REQUEST, ProductsConstants.ActionTypes.DELETE_PRODUCT_SUCCESS, ProductsConstants.ActionTypes.DELETE_PRODUCT_FAILURE],
        promise: p,
    }
}
export function deleteMyProductsSeasonAjax(token,id_product) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(ProductsConstants.APIEndpoints.DELETE_PRODUCT, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({id_product:id_product}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}