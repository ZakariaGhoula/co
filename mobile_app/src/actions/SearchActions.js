import { checkHttpStatus, parseJSON } from './../utils/index';
import { SearchConstants } from './../constants/SearchConstant';


export function retrieveAjaxSearch(token, query) {
    return fetch(SearchConstants.APIEndpoints.SEARCH, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(query),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function retrieveSearch(token, query) {
    const p = retrieveAjaxSearch(token, query);
    return {
        type: [SearchConstants.ActionTypes.SEARCH_REQUEST, SearchConstants.ActionTypes.SEARCH_SUCCESS, SearchConstants.ActionTypes.SEARCH_FAILURE],
        promise: p
    }
}

export function retrieveAjaxSearchFollow(token, query) {
    return fetch(SearchConstants.APIEndpoints.SEARCH_FOLLOW + "?search=" + query, {

        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function retrieveSearchFollow(token, query) {
    const p = retrieveAjaxSearchFollow(token, query);
    return {
        type: [SearchConstants.ActionTypes.SEARCH_FOLLOW_REQUEST, SearchConstants.ActionTypes.SEARCH_FOLLOW_SUCCESS, SearchConstants.ActionTypes.SEARCH_FOLLOW_FAILURE],
        promise: p
    }
}

export function destroy_search_follow() {
    return {
        type: SearchConstants.ActionTypes.DESTROY_SEARCH_FOLLOW
    }
}
export function retrieveAjaxSearchAll(token, query) {
    return fetch(SearchConstants.APIEndpoints.ALL_SEARCH+ "?search=" + query, {

        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function retrieveAllSearch(token, query) {
    const p = retrieveAjaxSearchAll(token, query);
    return {
        type: [SearchConstants.ActionTypes.ALL_SEARCH_REQUEST, SearchConstants.ActionTypes.ALL_SEARCH_SUCCESS, SearchConstants.ActionTypes.ALL_SEARCH_FAILURE],
        promise: p
    }
}

export function destroy_search_all() {
    return {
        type: SearchConstants.ActionTypes.DESTROY_ALL_SEARCH
    }
}
