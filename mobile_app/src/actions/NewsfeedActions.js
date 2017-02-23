import { checkHttpStatus, parseJSON } from './../utils/index';
import { NewsfeedConstants } from './../constants/NewsfeedConstant';


export function retrieveAjaNewsFeed(token, limit, page) {
    return fetch(NewsfeedConstants.APIEndpoints.LOAD + "?limit=" + limit + "&page=" + page, {

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
            return (response.data);
        })
}
export function retrieveNewsFeed(token, limit, page) {
    const p = retrieveAjaNewsFeed(token, limit, page);
    return {
        type: [NewsfeedConstants.ActionTypes.LOAD_REQUEST, NewsfeedConstants.ActionTypes.LOAD_SUCCESS, NewsfeedConstants.ActionTypes.LOAD_FAILURE],
        promise: p
    }
}
export function retrieveAjaNewsFeedABOS(token, limit, page) {
    return fetch(NewsfeedConstants.APIEndpoints.LOAD_ABOS + "?limit=" + limit + "&page=" + page, {

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
            return (response.data);
        })
}
export function retrieveNewsFeedAbos(token, limit, page) {
    const p = retrieveAjaNewsFeedABOS(token, limit, page);
    return {
        type: [NewsfeedConstants.ActionTypes.LOAD_ABOS_REQUEST, NewsfeedConstants.ActionTypes.LOAD_ABOS_SUCCESS, NewsfeedConstants.ActionTypes.LOAD_ABOS_FAILURE],
        promise: p
    }
}
export function retrieveNewsFeedAbosDestroy() {

    return {
        type: NewsfeedConstants.ActionTypes.LOAD_ABOS_DESTROY

    }
}


export function retrieveAjaReloadNewsFeed(token, limit, page) {
    return fetch(NewsfeedConstants.APIEndpoints.RELOAD + "?limit=" + limit + "&page=" + page, {

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
            return (response.data);
        })
}
export function retrieveReloadNewsFeed(token, limit, page) {
    const p = retrieveAjaReloadNewsFeed(token, limit, page);
    return {
        type: [NewsfeedConstants.ActionTypes.RELOAD_REQUEST, NewsfeedConstants.ActionTypes.RELOAD_SUCCESS, NewsfeedConstants.ActionTypes.RELOAD_FAILURE],
        promise: p
    }
}
export function retrieveAjaReloadNewsFeedAbos(token, limit, page) {
    return fetch(NewsfeedConstants.APIEndpoints.RELOAD_ABOS + "?limit=" + limit + "&page=" + page, {

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
            return (response.data);
        })
}
export function retrieveReloadNewsFeedAbos(token, limit, page) {
    const p = retrieveAjaReloadNewsFeedAbos(token, limit, page);
    return {
        type: [NewsfeedConstants.ActionTypes.RELOAD_ABOS_REQUEST, NewsfeedConstants.ActionTypes.RELOAD_ABOS_SUCCESS, NewsfeedConstants.ActionTypes.RELOAD_ABOS_FAILURE],
        promise: p
    }
}
export function retrieveAjaNewsFeedTeam(token) {
    return fetch(NewsfeedConstants.APIEndpoints.LOAD_TEAM, {

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
            return (response.data);
        })
}
export function retrieveNewsFeedTeam(token) {
    const p = retrieveAjaNewsFeedTeam(token);
    return {
        type: [NewsfeedConstants.ActionTypes.LOAD_TEAM_REQUEST, NewsfeedConstants.ActionTypes.LOAD_TEAM_SUCCESS, NewsfeedConstants.ActionTypes.LOAD_TEAM_FAILURE],
        promise: p
    }
}export function addNewsFeedTeam(newsfeedteam) {
    return {
        type:   NewsfeedConstants.ActionTypes.QUICK_LOAD_TEAM_SUCCESS,
        newsfeedteam: newsfeedteam
    }
}