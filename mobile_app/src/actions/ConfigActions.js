import { checkHttpStatus, parseJSON } from './../utils/index';
import { ConfigConstants } from './../constants/ConfigConstant';


export function retrieveListLangue() {
    const p = retrieveListLangueAjax();
    return {
        type: [ConfigConstants.ActionTypes.CONFIG_LANG_REQUEST, ConfigConstants.ActionTypes.CONFIG_LANG_SUCCESS, ConfigConstants.ActionTypes.CONFIG_LANG_FAILURE],
        promise: p,
    }
}
export function retrieveListLangueAjax() {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(ConfigConstants.APIEndpoints.CONFIG_LANG, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function retrieveListTagRecipe(lng='fr') {
    const p = retrieveListTagRecipeAjax(lng);
    return {
        type: [ConfigConstants.ActionTypes.TAGS_RECIPE_REQUEST, ConfigConstants.ActionTypes.TAGS_RECIPE_SUCCESS, ConfigConstants.ActionTypes.TAGS_RECIPE_FAILURE],
        promise: p,
    }
}
export function retrieveListTagRecipeAjax(lng) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(ConfigConstants.APIEndpoints.TAGS_RECIPE+"?langue="+lng, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}