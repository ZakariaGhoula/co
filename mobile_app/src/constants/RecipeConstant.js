import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const RecipeConstants = {


    APIEndpoints: {
        GET_POSTER_RECIPE: APIRoot + "/v1/recipes/postby",
        GET_NUMBER_MY_RECIPES: APIRoot + "/v1/recipes/number",
        ADD_RECIPE: APIRoot + "/v1/recipes/add",
        ADD_RECEPIE_TITLE: APIRoot + "/v1/recipes/add/title",
        ADD_RECEPIE_EXIST_TITLE: APIRoot + "/v1/recipes/add_recipe_exist_title",
        GET_RECIPE_PROCESSING: APIRoot + "/v1/recipes/processing",
        UPDATE_RECEPIE_TITLE: APIRoot + "/v1/recipes/update/title",
        UPDATE_RECEPIE_URL: APIRoot + "/v1/recipes/update/url",
        UPDATE_RECEPIE_TEXT: APIRoot + "/v1/recipes/update/text",
        UPDATE_RECEPIE_TAGS: APIRoot + "/v1/recipes/update/tags",
        UPDATE_RECEPIE_TYPE: APIRoot + "/v1/recipes/update/type",
        UPDATE_RECEPIE_ADD_IMAGE: APIRoot + "/v1/recipes/update/image/add",
        UPDATE_RECEPIE_DELETE_IMAGE: APIRoot + "/v1/recipes/update/image/delete",
        UPDATE_RECEPIE_ORDERING_IMAGE: APIRoot + "/v1/recipes/update/image/ordering",
        ADD_QUICK_RECIPE: APIRoot + "/v1/recipes/add_from_exist",
        UPDATE_RECIPE: APIRoot + "/v1/recipe/update",
        DELETE_RECIPE: APIRoot + "/v1/recipe/delete",
        GET_LIST_RECIPES_TOKEN: APIRoot + "/v1/recipes/token",
        GET_LIST_RECIPES_TOKEN_REFRESH: APIRoot + "/v1/recipes/token/refresh",
        GET_MY_RECIPE: APIRoot + "/v1/recipe/my",
        GET_RECIPE_IMAGES: APIRoot + "/v1/recipes/images",
        GET_LIKE_RECIPE: APIRoot + "/v1/recipe/like",
        ADD_LIKE_RECIPE: APIRoot + "/v1/recipe/like/add",
        DELETE_LIKE_RECIPE: APIRoot + "/v1/recipe/like/remove",
    },


    ActionTypes: keyMirror({
        // add recipe
        GET_NUMBER_MY_RECIPES_REQUEST: null,
        GET_NUMBER_MY_RECIPES_FAILURE: null,
        GET_NUMBER_MY_RECIPES_SUCCESS: null,


        ADD_RECIPE_REQUEST: null,
        ADD_RECIPE_FAILURE: null,
        ADD_RECIPE_SUCCESS: null,

        ADD_RECEPIE_EXIST_TITLE_REQUEST: null,
        ADD_RECEPIE_EXIST_TITLE_FAILURE: null,
        ADD_RECEPIE_EXIST_TITLE_SUCCESS: null,


        ADD_RECEPIE_TITLE_REQUEST: null,
        ADD_RECEPIE_TITLE_FAILURE: null,
        ADD_RECEPIE_TITLE_SUCCESS: null,

        UPDATE_RECEPIE_TITLE_REQUEST: null,
        UPDATE_RECEPIE_TITLE_FAILURE: null,
        UPDATE_RECEPIE_TITLE_SUCCESS: null,

        UPDATE_RECEPIE_URL_REQUEST: null,
        UPDATE_RECEPIE_URL_FAILURE: null,
        UPDATE_RECEPIE_URL_SUCCESS: null,

        UPDATE_RECEPIE_TEXT_REQUEST: null,
        UPDATE_RECEPIE_TEXT_FAILURE: null,
        UPDATE_RECEPIE_TEXT_SUCCESS: null,

       UPDATE_RECEPIE_TAGS_REQUEST: null,
       UPDATE_RECEPIE_TAGS_FAILURE: null,
       UPDATE_RECEPIE_TAGS_SUCCESS: null,

       UPDATE_RECEPIE_TYPE_REQUEST: null,
       UPDATE_RECEPIE_TYPE_FAILURE: null,
       UPDATE_RECEPIE_TYPE_SUCCESS: null,

        UPDATE_RECEPIE_ADD_IMAGE_REQUEST: null,
        UPDATE_RECEPIE_ADD_IMAGE_FAILURE: null,
        UPDATE_RECEPIE_ADD_IMAGE_SUCCESS: null,

        UPDATE_RECEPIE_DELETE_IMAGE_REQUEST: null,
        UPDATE_RECEPIE_DELETE_IMAGE_FAILURE: null,
        UPDATE_RECEPIE_DELETE_IMAGE_SUCCESS: null,

        UPDATE_RECEPIE_ORDERING_IMAGE_REQUEST: null,
        UPDATE_RECEPIE_ORDERING_IMAGE_FAILURE: null,
        UPDATE_RECEPIE_ORDERING_IMAGE_SUCCESS: null,

        //-- add quick recipe

        ADD_QUICK_RECIPE_REQUEST: null,
        ADD_QUICK_RECIPE_FAILURE: null,
        ADD_QUICK_RECIPE_SUCCESS: null,
        // update recipe
        UPDATE_RECIPE_REQUEST: null,
        UPDATE_RECIPE_FAILURE: null,
        UPDATE_RECIPE_SUCCESS: null,
        // delete recipe
        DELETE_RECIPE_REQUEST: null,
        DELETE_RECIPE_FAILURE: null,
        DELETE_RECIPE_SUCCESS: null,

        GET_LIST_RECIPES_TOKEN_REQUEST: null,
        GET_LIST_RECIPES_TOKEN_FAILURE: null,
        GET_LIST_RECIPES_TOKEN_SUCCESS: null,

        GET_LIST_RECIPES_TOKEN_REFRESH_REQUEST: null,
        GET_LIST_RECIPES_TOKEN_REFRESH_FAILURE: null,
        GET_LIST_RECIPES_TOKEN_REFRESH_SUCCESS: null,


        GET_MY_RECIPE_REQUEST: null,
        GET_MY_RECIPE_FAILURE: null,
        GET_MY_RECIPE_SUCCESS: null,

        GET_RECIPE_IMAGES_REQUEST: null,
        GET_RECIPE_IMAGES_FAILURE: null,
        GET_RECIPE_IMAGES_SUCCESS: null,

        //-- post by
        GET_POSTER_RECIPE_REQUEST: null,
        GET_POSTER_RECIPE_FAILURE: null,
        GET_POSTER_RECIPE_SUCCESS: null,
        //like
        GET_LIKE_RECIPE_REQUEST: null,
        GET_LIKE_RECIPE_FAILURE: null,
        GET_LIKE_RECIPE_SUCCESS: null,
        //add like
        ADD_LIKE_RECIPE_REQUEST: null,
        ADD_LIKE_RECIPE_FAILURE: null,
        ADD_LIKE_RECIPE_SUCCESS: null,
        //remove like
        DELETE_LIKE_RECIPE_REQUEST: null,
        DELETE_LIKE_RECIPE_FAILURE: null,
        DELETE_LIKE_RECIPE_SUCCESS: null,
        DESTROY_COOKOUT: null,
        DESTROY_LAST_RECIPE: null,
        DESTROY_PROCESSING_RECEPIE: null,


    })
};
