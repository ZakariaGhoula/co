import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const ProductsConstants = {


    APIEndpoints: {
        GET_SEASON_PRODUCTS: APIRoot + "/v1/products/season",
        GET_SEASON_PRODUCTS_BY_ID: APIRoot + "/v1/products/season/id",
        GET_MY_PRODUCTS: APIRoot + "/v1/products/my",
        DELETE_PRODUCT: APIRoot + "/v1/products/delete",
        ADD_PRODUCT: APIRoot + "/v1/products/add",
    },


    ActionTypes: keyMirror({
        // retrieve list product
        GET_SEASON_PRODUCTS_REQUEST: null,
        GET_SEASON_PRODUCTS_FAILURE: null,
        GET_SEASON_PRODUCTS_SUCCESS: null,

        // retrieve my list of product
        GET_MY_PRODUCTS_REQUEST: null,
        GET_MY_PRODUCTS_FAILURE: null,
        GET_MY_PRODUCTS_SUCCESS: null,

        // delete list of product
        DELETE_PRODUCT_REQUEST: null,
        DELETE_PRODUCT_FAILURE: null,
        DELETE_PRODUCT_SUCCESS: null,

        // add to my list of product
        ADD_PRODUCT_REQUEST: null,
        ADD_PRODUCT_FAILURE: null,
        ADD_PRODUCT_SUCCESS: null,




    })
};
