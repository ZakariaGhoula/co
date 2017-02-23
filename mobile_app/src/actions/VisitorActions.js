import { checkHttpStatus, parseJSON } from './../utils/index';
import { VisitorConstants } from './../constants/VisitorConstant';


export function retrieveAjaxProfileVisitor(token, id_user) {
    return fetch(VisitorConstants.APIEndpoints.PROFILE_VISITOR + "?id=" + id_user, {

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
export function retrieveProfileVisitor(token, id_user) {
    const p = retrieveAjaxProfileVisitor(token, id_user);
    return {
        type: [VisitorConstants.ActionTypes.PROFILE_VISITOR_REQUEST, VisitorConstants.ActionTypes.PROFILE_VISITOR_SUCCESS, VisitorConstants.ActionTypes.PROFILE_VISITOR_FAILURE],
        promise: p
    }
}
export function addAjaxNetwork(token, id_user,id_user_visitor) {
    return fetch(VisitorConstants.APIEndpoints.VISITOR_ADD_NETWORK, {

        method: 'post',
        credentials: 'include',

        body: JSON.stringify({
            id_user: id_user,
            id_user_visitor: id_user_visitor,
        }),
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
export function addNetwork(token, id_user,id_user_visitor) {
    const p = addAjaxNetwork(token, id_user,id_user_visitor);
    return {
        type: [VisitorConstants.ActionTypes.VISITOR_ADD_NETWORK_REQUEST, VisitorConstants.ActionTypes.VISITOR_ADD_NETWORK_SUCCESS, VisitorConstants.ActionTypes.VISITOR_ADD_NETWORK_FAILURE],
        promise: p
    }
}
export function removeAjaxNetwork(token, id_user,id_user_visitor) {
    return fetch(VisitorConstants.APIEndpoints.VISITOR_REMOVE_NETWORK, {

        method: 'post',
        credentials: 'include',

        body: JSON.stringify({
            id_user: id_user,
            id_user_visitor: id_user_visitor,
        }),
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
export function removeNetwork(token, id_user,id_user_visitor) {
    const p = removeAjaxNetwork(token, id_user,id_user_visitor);
    return {
        type: [VisitorConstants.ActionTypes.VISITOR_REMOVE_NETWORK_REQUEST, VisitorConstants.ActionTypes.VISITOR_REMOVE_NETWORK_SUCCESS, VisitorConstants.ActionTypes.VISITOR_REMOVE_NETWORK_FAILURE],
        promise: p
    }
}


export function retrieveAjaxVisitorNetwork(token,id_visitor) {
    return fetch(VisitorConstants.APIEndpoints.VISITOR_NETWORK+"?id_user="+id_visitor, {

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
export function retrieveVisitorNetwork(token,id_visitor) {
    const p = retrieveAjaxVisitorNetwork(token,id_visitor);
    return {
        type: [VisitorConstants.ActionTypes.VISITOR_NETWORK_REQUEST, VisitorConstants.ActionTypes.VISITOR_NETWORK_SUCCESS, VisitorConstants.ActionTypes.VISITOR_NETWORK_FAILURE],
        promise: p
    }
}

export function destroyVisitor() {

    return {
        type: VisitorConstants.ActionTypes.PROFILE_VISITOR_DESTROY
    }
}



