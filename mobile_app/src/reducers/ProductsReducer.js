import {createReducer} from './../utils/index';
import { ProductsConstants } from './../constants/ProductsConstant';

const initialState = {
    list_default_product: null,
    list_my_product: null,
    statusText: null,
    isRequesting: true,
};


function GET_SEASON_PRODUCTS_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'list_langue': null,
        'statusText': null,
    });
}
function GET_SEASON_PRODUCTS_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_default_product': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_SEASON_PRODUCTS_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'list_default_product': null,
        'statusText': "ERROR",
    });
}
function GET_MY_PRODUCTS_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'list_my_product': null,
        'statusText': null,
    });
}
function GET_MY_PRODUCTS_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_my_product': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function GET_MY_PRODUCTS_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'list_my_product': null,
        'statusText': "ERROR",
    });
}

function ADD_PRODUCT_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statusText': null,
    });
}
function ADD_PRODUCT_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_my_product': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function ADD_PRODUCT_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statusText': "ERROR",
    });
}function DELETE_PRODUCT_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function DELETE_PRODUCT_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'list_my_product': action.result.data,
        'isRequesting': false,
        'statusText': "Success",
    });
}
function DELETE_PRODUCT_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statusText': "ERROR",
    });
}


const handlers =
{
    [ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_REQUEST]: GET_SEASON_PRODUCTS_REQUEST,
    [ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_SUCCESS]: GET_SEASON_PRODUCTS_SUCCESS,
    [ProductsConstants.ActionTypes.GET_SEASON_PRODUCTS_FAILURE]: GET_SEASON_PRODUCTS_FAILURE,

    [ProductsConstants.ActionTypes.GET_MY_PRODUCTS_REQUEST]: GET_MY_PRODUCTS_REQUEST,
    [ProductsConstants.ActionTypes.GET_MY_PRODUCTS_SUCCESS]: GET_MY_PRODUCTS_SUCCESS,
    [ProductsConstants.ActionTypes.GET_MY_PRODUCTS_FAILURE]: GET_MY_PRODUCTS_FAILURE,

    [ProductsConstants.ActionTypes.ADD_PRODUCT_REQUEST]: ADD_PRODUCT_REQUEST,
    [ProductsConstants.ActionTypes.ADD_PRODUCT_SUCCESS]: ADD_PRODUCT_SUCCESS,
    [ProductsConstants.ActionTypes.ADD_PRODUCT_FAILURE]: ADD_PRODUCT_FAILURE,

    [ProductsConstants.ActionTypes.DELETE_PRODUCT_REQUEST]: DELETE_PRODUCT_REQUEST,
    [ProductsConstants.ActionTypes.DELETE_PRODUCT_SUCCESS]: DELETE_PRODUCT_SUCCESS,
    [ProductsConstants.ActionTypes.DELETE_PRODUCT_FAILURE]: DELETE_PRODUCT_FAILURE,

}
export default createReducer(initialState, handlers);