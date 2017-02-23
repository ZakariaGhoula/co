import {createReducer} from './../utils/index';
import { ConfigConstants } from './../constants/ConfigConstant';

const initialState = {
    list_langue: null,
    list_tag_recipe: null,
    statusText: null,
    isRequesting: false,
};


function CONFIG_LANG_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'list_langue': null,
        'statusText': null,
    });
}
function CONFIG_LANG_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_langue': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function CONFIG_LANG_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'list_langue': null,
        'statusText':"ERROR",
    });
}

function TAGS_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'list_tag_recipe': null,
        'statusText': null,
    });
}
function TAGS_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_tag_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function TAGS_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statusText':"ERROR",
    });
}



const handlers =
{
    [ConfigConstants.ActionTypes.CONFIG_LANG_REQUEST]: CONFIG_LANG_REQUEST,
    [ConfigConstants.ActionTypes.CONFIG_LANG_SUCCESS]: CONFIG_LANG_SUCCESS,
    [ConfigConstants.ActionTypes.CONFIG_LANG_FAILURE]: CONFIG_LANG_FAILURE,
    [ConfigConstants.ActionTypes.TAGS_RECIPE_REQUEST]: TAGS_RECIPE_REQUEST,
    [ConfigConstants.ActionTypes.TAGS_RECIPE_SUCCESS]: TAGS_RECIPE_SUCCESS,
    [ConfigConstants.ActionTypes.TAGS_RECIPE_FAILURE]: TAGS_RECIPE_FAILURE,

}
export default createReducer(initialState, handlers);