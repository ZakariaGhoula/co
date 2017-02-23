import {createReducer} from './../utils/index';
import { SearchConstants } from '../constants/SearchConstant';


const initialState = {
    isRequesting: false,
    statusText: null,
    search_list: null,
    search_follow_list: null,
    search_all_list: null,
    search_limit: 10,
    search_page: 0,

};


// Login
function SEARCH_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
        search_list: null
    });
}
function SEARCH_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        search_list: action.result.result,
        search_limit: action.result.params.limit,
        'statusText': 'Countries code phone succes'
    });
}
function SEARCH_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}
function SEARCH_FOLLOW_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,

    });
}
function SEARCH_FOLLOW_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'search_follow_list': action.result,
        'statusText': 'Countries code phone succes'
    });
}
function SEARCH_FOLLOW_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}
function DESTROY_SEARCH_FOLLOW(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: "",
        search_follow_list: null
    });
}function ALL_SEARCH_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,

    });
}
function ALL_SEARCH_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'search_all_list': action.result,
        'statusText': 'Countries code phone succes'
    });
}
function ALL_SEARCH_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}
function DESTROY_ALL_SEARCH(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: "",
        search_all_list: null
    });
}


const handlers =
{

    [SearchConstants.ActionTypes.SEARCH_REQUEST]: SEARCH_REQUEST,
    [SearchConstants.ActionTypes.SEARCH_SUCCESS]: SEARCH_SUCCESS,
    [SearchConstants.ActionTypes.SEARCH_FAILURE]: SEARCH_FAILURE,

    [SearchConstants.ActionTypes.SEARCH_FOLLOW_REQUEST]: SEARCH_FOLLOW_REQUEST,
    [SearchConstants.ActionTypes.SEARCH_FOLLOW_SUCCESS]: SEARCH_FOLLOW_SUCCESS,
    [SearchConstants.ActionTypes.SEARCH_FOLLOW_FAILURE]: SEARCH_FOLLOW_FAILURE,

    [SearchConstants.ActionTypes.ALL_SEARCH_REQUEST]: ALL_SEARCH_REQUEST,
    [SearchConstants.ActionTypes.ALL_SEARCH_SUCCESS]: ALL_SEARCH_SUCCESS,
    [SearchConstants.ActionTypes.ALL_SEARCH_FAILURE]: ALL_SEARCH_FAILURE,

    [SearchConstants.ActionTypes.DESTROY_ALL_SEARCH]: DESTROY_ALL_SEARCH,
    [SearchConstants.ActionTypes.DESTROY_SEARCH_FOLLOW]: DESTROY_SEARCH_FOLLOW,

}
export default createReducer(initialState, handlers);
