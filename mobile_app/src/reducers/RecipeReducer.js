import {createReducer} from './../utils/index';
import {RecipeConstants} from './../constants/RecipeConstant';

const initialState = {
    my_recipes: null,
    my_recipe: null,
    the_recipe: null,
    recipe_delete: null,
    processing_recepie: null,
    last_recipe: null,
    statusText: null,
    count_recipe: null,
    isRequesting: true,
    poster_recipe: null,
    like_recipe: null,
    list_images_recipe: null,
};


function ADD_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function ADD_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'last_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function ADD_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function ADD_RECEPIE_EXIST_TITLE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function ADD_RECEPIE_EXIST_TITLE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function ADD_RECEPIE_EXIST_TITLE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'processing_recepie': null,
        'statusText': "ERROR",
    });
}
function ADD_RECEPIE_TITLE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function ADD_RECEPIE_TITLE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function ADD_RECEPIE_TITLE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'processing_recepie': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_TITLE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_TITLE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_TITLE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_URL_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_URL_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_URL_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_TEXT_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_TEXT_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_TEXT_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_TAGS_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_TAGS_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_TAGS_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_TYPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_TYPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_TYPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_ADD_IMAGE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_ADD_IMAGE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_ADD_IMAGE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_DELETE_IMAGE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_DELETE_IMAGE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_DELETE_IMAGE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECEPIE_ORDERING_IMAGE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECEPIE_ORDERING_IMAGE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'processing_recepie': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECEPIE_ORDERING_IMAGE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function ADD_QUICK_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function ADD_QUICK_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'last_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function ADD_QUICK_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function UPDATE_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function UPDATE_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'last_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function UPDATE_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,
        'statusText': "ERROR",
    });
}
function DELETE_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'my_recipes': null,
        'statusText': null,
    });
}
function DELETE_RECIPE_SUCCESS(state, action) {


    return Object.assign({}, state, {
        'recipe_delete': action.result.data.deleted,
        'my_recipes': action.result.data.recepies,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function DELETE_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'recipe_delete': null,
        'statusText': "ERROR",
    });
}
function GET_LIST_RECIPES_TOKEN_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'my_recipe': null,
        'statusText': null,
    });
}
function GET_LIST_RECIPES_TOKEN_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'my_recipes': action.result.data,
        'my_recipe': null,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_LIST_RECIPES_TOKEN_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'my_recipes': null,
        'statusText': "ERROR",
    });
}
function GET_LIST_RECIPES_TOKEN_REFRESH_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'my_recipe': null,
        'statusText': null,
    });
}
function GET_LIST_RECIPES_TOKEN_REFRESH_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'my_recipes': action.result.data,
        'my_recipe': null,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_LIST_RECIPES_TOKEN_REFRESH_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'my_recipes': null,
        'statusText': "ERROR",
    });
}

function GET_MY_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'last_recipe': null,
        'my_recipe': null,
        'statusText': null,
    });
}
function GET_MY_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'my_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_MY_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'my_recipe': null,
        'statusText': "ERROR",
    });
}

//--- POST BY
function GET_POSTER_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'poster_recipe': null,
        'statusText': null,
    });
}
function GET_POSTER_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'poster_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_POSTER_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'poster_recipe': null,
        'statusText': "ERROR",
    });
}

//--- ADD LIKE
function ADD_LIKE_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,

        'statusText': null,
    });
}
function ADD_LIKE_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'like_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function ADD_LIKE_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'like_recipe': null,
        'statusText': "ERROR",
    });
}


//--- REMOVE LIKE
function DELETE_LIKE_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,

        'statusText': null,
    });
}
function DELETE_LIKE_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'like_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function DELETE_LIKE_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'like_recipe': null,
        'statusText': "ERROR",
    });
}
//--- GET LIKE
function GET_LIKE_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,

        'statusText': null,
    });
}
function GET_LIKE_RECIPE_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'like_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_LIKE_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'like_recipe': null,
        'statusText': "ERROR",
    });
}
//--- GET IMAGES RECIPES
function GET_RECIPE_IMAGES_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function GET_RECIPE_IMAGES_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_images_recipe': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_RECIPE_IMAGES_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'list_images_recipe': null,
        'statusText': "ERROR",
    });
}
function GET_NUMBER_MY_RECIPES_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function GET_NUMBER_MY_RECIPES_SUCCESS(state, action) {

    return Object.assign({}, state, {
        count_recipe:  (action.result.data !=null && typeof action.result.data.count_recipe!=="undefined")?action.result.data.count_recipe:0,
    });
}
function GET_NUMBER_MY_RECIPES_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
    });
}
function DESTROY_COOKOUT(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'list_images_recipe': null,
        'like_recipe': null,
        'my_recipe': null,
        'last_recipe': null,
        'my_recipes': null,
        'statusText': "ERROR",
    });
}
function DESTROY_LAST_RECIPE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'last_recipe': null,

    });
}
function DESTROY_PROCESSING_RECEPIE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'processing_recepie': null,

    });
}

const handlers =
    {
        [RecipeConstants.ActionTypes.ADD_RECIPE_REQUEST]: ADD_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.ADD_RECIPE_SUCCESS]: ADD_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.ADD_RECIPE_FAILURE]: ADD_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.ADD_RECEPIE_EXIST_TITLE_REQUEST]: ADD_RECEPIE_EXIST_TITLE_REQUEST,
        [RecipeConstants.ActionTypes.ADD_RECEPIE_EXIST_TITLE_SUCCESS]: ADD_RECEPIE_EXIST_TITLE_SUCCESS,
        [RecipeConstants.ActionTypes.ADD_RECEPIE_EXIST_TITLE_FAILURE]: ADD_RECEPIE_EXIST_TITLE_FAILURE,

        [RecipeConstants.ActionTypes.ADD_RECEPIE_TITLE_REQUEST]: ADD_RECEPIE_TITLE_REQUEST,
        [RecipeConstants.ActionTypes.ADD_RECEPIE_TITLE_SUCCESS]: ADD_RECEPIE_TITLE_SUCCESS,
        [RecipeConstants.ActionTypes.ADD_RECEPIE_TITLE_FAILURE]: ADD_RECEPIE_TITLE_FAILURE,

        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TITLE_REQUEST]: UPDATE_RECEPIE_TITLE_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TITLE_SUCCESS]: UPDATE_RECEPIE_TITLE_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TITLE_FAILURE]: UPDATE_RECEPIE_TITLE_FAILURE,

        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_URL_REQUEST]: UPDATE_RECEPIE_URL_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_URL_SUCCESS]: UPDATE_RECEPIE_URL_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_URL_FAILURE]: UPDATE_RECEPIE_URL_FAILURE,

        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TAGS_REQUEST]: UPDATE_RECEPIE_TAGS_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TAGS_SUCCESS]: UPDATE_RECEPIE_TAGS_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TAGS_FAILURE]: UPDATE_RECEPIE_TAGS_FAILURE,

        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TEXT_REQUEST]: UPDATE_RECEPIE_TEXT_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TEXT_SUCCESS]: UPDATE_RECEPIE_TEXT_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TEXT_FAILURE]: UPDATE_RECEPIE_TEXT_FAILURE,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_REQUEST]: UPDATE_RECEPIE_TYPE_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_SUCCESS]: UPDATE_RECEPIE_TYPE_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_TYPE_FAILURE]: UPDATE_RECEPIE_TYPE_FAILURE,


        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ADD_IMAGE_REQUEST]: UPDATE_RECEPIE_ADD_IMAGE_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ADD_IMAGE_SUCCESS]: UPDATE_RECEPIE_ADD_IMAGE_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ADD_IMAGE_FAILURE]: UPDATE_RECEPIE_ADD_IMAGE_FAILURE,

        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_DELETE_IMAGE_REQUEST]: UPDATE_RECEPIE_DELETE_IMAGE_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_DELETE_IMAGE_SUCCESS]: UPDATE_RECEPIE_DELETE_IMAGE_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_DELETE_IMAGE_FAILURE]: UPDATE_RECEPIE_DELETE_IMAGE_FAILURE,

        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ORDERING_IMAGE_REQUEST]: UPDATE_RECEPIE_ORDERING_IMAGE_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ORDERING_IMAGE_SUCCESS]: UPDATE_RECEPIE_ORDERING_IMAGE_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECEPIE_ORDERING_IMAGE_FAILURE]: UPDATE_RECEPIE_ORDERING_IMAGE_FAILURE,

        [RecipeConstants.ActionTypes.ADD_QUICK_RECIPE_REQUEST]: ADD_QUICK_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.ADD_QUICK_RECIPE_SUCCESS]: ADD_QUICK_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.ADD_QUICK_RECIPE_FAILURE]: ADD_QUICK_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.UPDATE_RECIPE_REQUEST]: UPDATE_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.UPDATE_RECIPE_SUCCESS]: UPDATE_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.UPDATE_RECIPE_FAILURE]: UPDATE_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.DELETE_RECIPE_REQUEST]: DELETE_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.DELETE_RECIPE_SUCCESS]: DELETE_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.DELETE_RECIPE_FAILURE]: DELETE_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REQUEST]: GET_LIST_RECIPES_TOKEN_REQUEST,
        [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_SUCCESS]: GET_LIST_RECIPES_TOKEN_SUCCESS,
        [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_FAILURE]: GET_LIST_RECIPES_TOKEN_FAILURE,
        [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REFRESH_REQUEST]: GET_LIST_RECIPES_TOKEN_REFRESH_REQUEST,
        [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REFRESH_SUCCESS]: GET_LIST_RECIPES_TOKEN_REFRESH_SUCCESS,
        [RecipeConstants.ActionTypes.GET_LIST_RECIPES_TOKEN_REFRESH_FAILURE]: GET_LIST_RECIPES_TOKEN_REFRESH_FAILURE,
        [RecipeConstants.ActionTypes.GET_POSTER_RECIPE_REQUEST]: GET_POSTER_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.GET_POSTER_RECIPE_SUCCESS]: GET_POSTER_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.GET_POSTER_RECIPE_FAILURE]: GET_POSTER_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.GET_MY_RECIPE_REQUEST]: GET_MY_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.GET_MY_RECIPE_SUCCESS]: GET_MY_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.GET_MY_RECIPE_FAILURE]: GET_MY_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.ADD_LIKE_RECIPE_REQUEST]: ADD_LIKE_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.ADD_LIKE_RECIPE_SUCCESS]: ADD_LIKE_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.ADD_LIKE_RECIPE_FAILURE]: ADD_LIKE_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.DELETE_LIKE_RECIPE_REQUEST]: DELETE_LIKE_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.DELETE_LIKE_RECIPE_SUCCESS]: DELETE_LIKE_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.DELETE_LIKE_RECIPE_FAILURE]: DELETE_LIKE_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.GET_LIKE_RECIPE_REQUEST]: GET_LIKE_RECIPE_REQUEST,
        [RecipeConstants.ActionTypes.GET_LIKE_RECIPE_SUCCESS]: GET_LIKE_RECIPE_SUCCESS,
        [RecipeConstants.ActionTypes.GET_LIKE_RECIPE_FAILURE]: GET_LIKE_RECIPE_FAILURE,

        [RecipeConstants.ActionTypes.GET_RECIPE_IMAGES_REQUEST]: GET_RECIPE_IMAGES_REQUEST,
        [RecipeConstants.ActionTypes.GET_RECIPE_IMAGES_SUCCESS]: GET_RECIPE_IMAGES_SUCCESS,
        [RecipeConstants.ActionTypes.GET_RECIPE_IMAGES_FAILURE]: GET_RECIPE_IMAGES_FAILURE,

        [RecipeConstants.ActionTypes.GET_NUMBER_MY_RECIPES_REQUEST]: GET_NUMBER_MY_RECIPES_REQUEST,
        [RecipeConstants.ActionTypes.GET_NUMBER_MY_RECIPES_SUCCESS]: GET_NUMBER_MY_RECIPES_SUCCESS,
        [RecipeConstants.ActionTypes.GET_NUMBER_MY_RECIPES_FAILURE]: GET_NUMBER_MY_RECIPES_FAILURE,

        [RecipeConstants.ActionTypes.DESTROY_COOKOUT]: DESTROY_COOKOUT,
        [RecipeConstants.ActionTypes.DESTROY_LAST_RECIPE]: DESTROY_LAST_RECIPE,
        [RecipeConstants.ActionTypes.DESTROY_PROCESSING_RECEPIE]: DESTROY_PROCESSING_RECEPIE,

    }
export default createReducer(initialState, handlers);