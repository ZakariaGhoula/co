import {createReducer} from './../utils/index';
import { VisitorConstants } from '../constants/VisitorConstant';



const initialState = {
    isRequesting: false,

    profile_visitor: null,
    network_visitor: null,

};


// request
function PROFILE_VISITOR_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
        'profile_visitor': null,
    });
}
function PROFILE_VISITOR_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        profile_visitor: action.result,
        'statusText': 'User succes'
    });
}
function PROFILE_VISITOR_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}

//-- add
function VISITOR_ADD_NETWORK_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function VISITOR_ADD_NETWORK_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        network_visitor: action.result,
        'statusText': 'User succes'
    });
}
function VISITOR_ADD_NETWORK_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}

//-- remove
function VISITOR_REMOVE_NETWORK_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function VISITOR_REMOVE_NETWORK_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        network_visitor: action.result,
        'statusText': 'User succes'
    });
}
function VISITOR_REMOVE_NETWORK_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}function VISITOR_NETWORK_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,

    });
}
function VISITOR_NETWORK_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        network_visitor: action.result,
        'statusText': 'User succes'
    });
}
function VISITOR_NETWORK_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}
function PROFILE_VISITOR_DESTROY(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        network_visitor:null,
        profile_visitor:null,
        statusText: ""
    });
}


const handlers =
{

    [VisitorConstants.ActionTypes.VISITOR_NETWORK_REQUEST]: VISITOR_NETWORK_REQUEST,
    [VisitorConstants.ActionTypes.VISITOR_NETWORK_SUCCESS]: VISITOR_NETWORK_SUCCESS,
    [VisitorConstants.ActionTypes.VISITOR_NETWORK_FAILURE]: VISITOR_NETWORK_FAILURE,
    [VisitorConstants.ActionTypes.PROFILE_VISITOR_REQUEST]: PROFILE_VISITOR_REQUEST,
    [VisitorConstants.ActionTypes.PROFILE_VISITOR_SUCCESS]: PROFILE_VISITOR_SUCCESS,
    [VisitorConstants.ActionTypes.PROFILE_VISITOR_FAILURE]: PROFILE_VISITOR_FAILURE,
    [VisitorConstants.ActionTypes.VISITOR_ADD_NETWORK_REQUEST]: VISITOR_ADD_NETWORK_REQUEST,
    [VisitorConstants.ActionTypes.VISITOR_ADD_NETWORK_SUCCESS]: VISITOR_ADD_NETWORK_SUCCESS,
    [VisitorConstants.ActionTypes.VISITOR_ADD_NETWORK_FAILURE]: VISITOR_ADD_NETWORK_FAILURE,
    [VisitorConstants.ActionTypes.VISITOR_REMOVE_NETWORK_REQUEST]: VISITOR_REMOVE_NETWORK_REQUEST,
    [VisitorConstants.ActionTypes.VISITOR_REMOVE_NETWORK_SUCCESS]: VISITOR_REMOVE_NETWORK_SUCCESS,
    [VisitorConstants.ActionTypes.VISITOR_REMOVE_NETWORK_FAILURE]: VISITOR_REMOVE_NETWORK_FAILURE,
    [VisitorConstants.ActionTypes.PROFILE_VISITOR_DESTROY]: PROFILE_VISITOR_DESTROY,

}
export default createReducer(initialState, handlers);
