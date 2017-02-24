import { checkHttpStatus, parseJSON } from './../utils/index';
import { RecipeConstants } from './../constants/RecipeConstant';


export function getNumberMyRecipe(token) {
    const p = getNumberMyRecipeAjax(token);

    return {
        type: [RecipeConstants.ActionTypes.GET_NUMBER_MY_RECIPES_REQUEST, RecipeConstants.ActionTypes.GET_NUMBER_MY_RECIPES_SUCCESS, RecipeConstants.ActionTypes.GET_NUMBER_MY_RECIPES_FAILURE],
        promise: p,
    }
}
export function getNumberMyRecipeAjax(token) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_NUMBER_MY_RECIPES, {

        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}



export function addRecipe(token, data) {
    const p = addRecipeAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.ADD_RECIPE_REQUEST, RecipeConstants.ActionTypes.ADD_RECIPE_SUCCESS, RecipeConstants.ActionTypes.ADD_RECIPE_FAILURE],
        promise: p,
    }
}
export function addRecipeAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.ADD_RECIPE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function addQuickRecipe(token, data) {
    const p = addQuickRecipeAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.ADD_QUICK_RECIPE_REQUEST, RecipeConstants.ActionTypes.ADD_QUICK_RECIPE_SUCCESS, RecipeConstants.ActionTypes.ADD_QUICK_RECIPE_FAILURE],
        promise: p,
    }
}
export function addQuickRecipeAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.ADD_QUICK_RECIPE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function deleteRecipeAction(token, id_recipe) {
    const p = deleteRecipeAjax(token, id_recipe);

    return {
        type: [RecipeConstants.ActionTypes.DELETE_RECIPE_REQUEST, RecipeConstants.ActionTypes.DELETE_RECIPE_SUCCESS, RecipeConstants.ActionTypes.DELETE_RECIPE_FAILURE],
        promise: p,
    }
}
export function deleteRecipeAjax(token, id_recipe) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.DELETE_RECIPE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({id_recipe: id_recipe}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}


export function retrieveMyRecipes(token) {
    const p = retrieveMyRecipesAjax(token);

    return {
        type: [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REQUEST, RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_SUCCESS, RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_FAILURE],
        promise: p,
    }
}
export function retrieveMyRecipesAjax(token) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_LIST_RECIPES_TOKEN, {

        method: 'GET',
        credentials: 'include',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function retrieveMyRecipesRefresh(token) {
    const p = retrieveMyRecipesRefreshAjax(token);

    return {
        type: [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REFRESH_REQUEST, RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REFRESH_SUCCESS, RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REFRESH_FAILURE],
        promise: p,
    }
}
export function retrieveMyRecipesRefreshAjax(token) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_LIST_RECIPES_TOKEN_REFRESH, {

        method: 'GET',
        credentials: 'include',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function retrieveMyRecipe(token, id_recipe) {
    const p = retrieveMyRecipeAjax(token, id_recipe);

    return {
        type: [RecipeConstants.ActionTypes.GET_MY_RECIPE_REQUEST, RecipeConstants.ActionTypes.GET_MY_RECIPE_SUCCESS, RecipeConstants.ActionTypes.GET_MY_RECIPE_FAILURE],
        promise: p,
    }
}
export function retrieveMyRecipeAjax(token, id_recipe) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_MY_RECIPE + "?id_recipe=" + id_recipe, {

        method: 'GET',
        credentials: 'include',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}


export function updateRecipe(token, data) {
    const p = updateRecipeAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECIPE_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECIPE_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECIPE_FAILURE],
        promise: p,
    }
}
export function updateRecipeAjax(token, data) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECIPE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

// GET POST BY RECIPE
export function getPosterRecipe(token, id_user) {
    const p = getAjaxPosterRecipe(token, id_user);

    return {
        type: [RecipeConstants.ActionTypes.GET_POSTER_RECIPE_REQUEST, RecipeConstants.ActionTypes.GET_POSTER_RECIPE_SUCCESS, RecipeConstants.ActionTypes.GET_POSTER_RECIPE_FAILURE],
        promise: p,
    }
}
export function getAjaxPosterRecipe(token, id_user) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_POSTER_RECIPE + "?id_user=" + id_user, {

        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

// GET LIKE RECIPE

export function getLikeRecipe(token, id_user, id_recipe) {
    const p = getAjaxLikeRecipe(token, id_user, id_recipe);

    return {
        type: [RecipeConstants.ActionTypes.GET_LIKE_RECIPE_REQUEST, RecipeConstants.ActionTypes.GET_LIKE_RECIPE_SUCCESS, RecipeConstants.ActionTypes.GET_LIKE_RECIPE_FAILURE],
        promise: p,
    }
}
export function getAjaxLikeRecipe(token, id_user, id_recipe) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_LIKE_RECIPE + "?id_user=" + id_user + "&id_recipe=" + id_recipe, {

        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

// ADD LIKE RECIPE

export function addLikeRecipe(token, id_user, id_recipe) {
    const p = addAjaxLikeRecipe(token, id_user, id_recipe);

    return {
        type: [RecipeConstants.ActionTypes.ADD_LIKE_RECIPE_REQUEST, RecipeConstants.ActionTypes.ADD_LIKE_RECIPE_SUCCESS, RecipeConstants.ActionTypes.ADD_LIKE_RECIPE_FAILURE],
        promise: p,
    }
}
export function addAjaxLikeRecipe(token, id_user, id_recipe) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.ADD_LIKE_RECIPE + "?id_user=" + id_user + "&id_recipe=" + id_recipe, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({id_user: id_user, id_recipe: id_recipe}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
// ADD LIKE RECIPE

export function removeLikeRecipe(token, id_user, id_recipe) {
    const p = removeAjaxLikeRecipe(token, id_user, id_recipe);

    return {
        type: [RecipeConstants.ActionTypes.DELETE_LIKE_RECIPE_REQUEST, RecipeConstants.ActionTypes.DELETE_LIKE_RECIPE_SUCCESS, RecipeConstants.ActionTypes.DELETE_LIKE_RECIPE_FAILURE],
        promise: p,
    }
}
export function removeAjaxLikeRecipe(token, id_user, id_recipe) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.DELETE_LIKE_RECIPE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({id_user: id_user, id_recipe: id_recipe}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

//-- images recipes
export function retrieveImagesRecipe(token,  id_recipe) {
    const p = retrieveAjaxImagesRecipe(token,  id_recipe);

    return {
        type: [RecipeConstants.ActionTypes.GET_RECIPE_IMAGES_REQUEST, RecipeConstants.ActionTypes.GET_RECIPE_IMAGES_SUCCESS, RecipeConstants.ActionTypes.GET_RECIPE_IMAGES_FAILURE],
        promise: p,
    }
}
export function retrieveAjaxImagesRecipe(token, id_recipe) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_RECIPE_IMAGES + "?id_recipe=" + id_recipe, {

        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}


export function destroy_cookout(){
    return {
        type: RecipeConstants.ActionTypes.DESTROY_COOKOUT
    }
}
export function destroy_lastRecipe(){
    return {
        type: RecipeConstants.ActionTypes.DESTROY_LAST_RECIPE
    }
}
export function destroy_processingRecepie(){
    return {
        type: RecipeConstants.ActionTypes.DESTROY_PROCESSING_RECEPIE
    }
}



/*--- process add recepie

 */


export function addRecipeExistTitle(token, data) {
    const p = addRecipeExistTitleAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.ADD_RECEPIE_EXIST_TITLE_REQUEST, RecipeConstants.ActionTypes.ADD_RECEPIE_EXIST_TITLE_SUCCESS, RecipeConstants.ActionTypes.ADD_RECEPIE_EXIST_TITLE_FAILURE],
        promise: p,
    }
}
export function addRecipeExistTitleAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.ADD_RECEPIE_EXIST_TITLE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function addRecipeTitle(token, data) {
    const p = addRecipeTitleAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.ADD_RECEPIE_TITLE_REQUEST, RecipeConstants.ActionTypes.ADD_RECEPIE_TITLE_SUCCESS, RecipeConstants.ActionTypes.ADD_RECEPIE_TITLE_FAILURE],
        promise: p,
    }
}
export function addRecipeTitleAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.ADD_RECEPIE_TITLE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function updateRecipeTitle(token, data) {
    const p = updateRecipeTitleAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TITLE_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TITLE_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TITLE_FAILURE],
        promise: p,
    }
}
export function updateRecipeTitleAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_TITLE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function updateRecipeURL(token, data) {
    const p = updateRecipeURLAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_URL_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_URL_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_URL_FAILURE],
        promise: p,
    }
}
export function updateRecipeURLAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_URL, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}

export function updateRecipeTEXT(token, data) {
    const p = updateRecipeTEXTAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TEXT_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TEXT_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TEXT_FAILURE],
        promise: p,
    }
}
export function updateRecipeTEXTAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_TEXT, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function updateRecipeADDIMAGE(token, data) {
    const p = updateRecipeADDIMAGEAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ADD_IMAGE_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_ADD_IMAGE_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_ADD_IMAGE_FAILURE],
        promise: p,
    }
}
export function updateRecipeADDIMAGEAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_ADD_IMAGE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}


export function updateRecipeDELETEIMAGE(token, data) {
    const p = updateRecipeDELETEIMAGEAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_DELETE_IMAGE_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_DELETE_IMAGE_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_DELETE_IMAGE_FAILURE],
        promise: p,
    }
}
export function updateRecipeDELETEIMAGEAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_DELETE_IMAGE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}export function updateRecipeORDERINGIMAGE(token, data) {
    const p = updateRecipeORDERINGIMAGEAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ORDERING_IMAGE_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_ORDERING_IMAGE_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_ORDERING_IMAGE_FAILURE],
        promise: p,
    }
}
export function updateRecipeORDERINGIMAGEAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_ORDERING_IMAGE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function updateRecipeTAGS(token, data) {
    const p = updateRecipeTAGSAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TAGS_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TAGS_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TAGS_FAILURE],
        promise: p,
    }
}
export function updateRecipeTAGSAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_TAGS, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function updateRecipeTYPE(token, data) {
    const p = updateRecipeTYPEAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_FAILURE],
        promise: p,
    }
}
export function updateRecipeTYPEAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.UPDATE_RECEPIE_TYPE, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function retrieveRecipeProcessing(token, data) {
    const p = retrieveRecipeProcessingAjax(token, data);

    return {
        type: [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_REQUEST, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_SUCCESS, RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_FAILURE],
        promise: p,
    }
}
export function retrieveRecipeProcessingAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(RecipeConstants.APIEndpoints.GET_RECIPE_PROCESSING+"?id_recepie="+data, {

        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },

    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
