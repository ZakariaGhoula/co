import { checkHttpStatus, parseJSON } from './../utils/index';
import { TagsConstants } from './../constants/TagsConstant';


export function retrieveTagsSuggest(token,lang="fr") {
    const p = retrieveTagsSuggestAjax(token,lang);
    return {
        type: [TagsConstants.ActionTypes.GET_TAGS_SUGGEST_REQUEST, TagsConstants.ActionTypes.GET_TAGS_SUGGEST_SUCCESS, TagsConstants.ActionTypes.GET_TAGS_SUGGEST_FAILURE],
        promise: p,
    }
}
export function retrieveTagsSuggestAjax(token,lang) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(TagsConstants.APIEndpoints.GET_TAGS_SUGGEST+"?lng="+lang, {
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
export function retrieveTagsAutocomplete(token,lang="fr") {
    const p = retrieveTagsAutocompleteAjax(token,lang);
    return {
        type: [TagsConstants.ActionTypes.GET_TAGS_AUTOCOMPLETE_REQUEST, TagsConstants.ActionTypes.GET_TAGS_AUTOCOMPLETE_SUCCESS, TagsConstants.ActionTypes.GET_TAGS_AUTOCOMPLETE_FAILURE],
        promise: p,
    }
}
export function retrieveTagsAutocompleteAjax(token,lang) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(TagsConstants.APIEndpoints.GET_TAGS_AUTOCOMPLETE+"?lng="+lang, {
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