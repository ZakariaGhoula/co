import {createReducer} from './../utils/index';
import { TagsConstants } from './../constants/TagsConstant';

const initialState = {
    list_tags_suggest: null,
    list_tags_autocomplete: null,
    statusText: null,
    isRequesting: true
};


function GET_TAGS_SUGGEST_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'list_tags_suggest': null,
        'statusText': null
    });
}
function GET_TAGS_SUGGEST_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_tags_suggest': action.result.data.tags,
        'isRequesting': false,
        'statusText': "Success"
    });
}
function GET_TAGS_SUGGEST_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'list_tags_suggest': null,
        'statusText': "ERROR"
    });
}


function GET_TAGS_AUTOCOMPLETE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'list_tags_autocomplete': null,
        'statusText': null
    });
}
function GET_TAGS_AUTOCOMPLETE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_tags_autocomplete': action.result.data.tags,
        'isRequesting': false,
        'statusText': "Success"
    });
}
function GET_TAGS_AUTOCOMPLETE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'list_tags_autocomplete': null,
        'statusText': "ERROR"
    });
}


const handlers =
{
    [TagsConstants.ActionTypes.GET_TAGS_SUGGEST_REQUEST]: GET_TAGS_SUGGEST_REQUEST,
    [TagsConstants.ActionTypes.GET_TAGS_SUGGEST_SUCCESS]: GET_TAGS_SUGGEST_SUCCESS,
    [TagsConstants.ActionTypes.GET_TAGS_SUGGEST_FAILURE]: GET_TAGS_SUGGEST_FAILURE,
    [TagsConstants.ActionTypes.GET_TAGS_AUTOCOMPLETE_REQUEST]: GET_TAGS_AUTOCOMPLETE_REQUEST,
    [TagsConstants.ActionTypes.GET_TAGS_AUTOCOMPLETE_SUCCESS]: GET_TAGS_AUTOCOMPLETE_SUCCESS,
    [TagsConstants.ActionTypes.GET_TAGS_AUTOCOMPLETE_FAILURE]: GET_TAGS_AUTOCOMPLETE_FAILURE

}
export default createReducer(initialState, handlers);