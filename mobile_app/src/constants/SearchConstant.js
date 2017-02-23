import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const SearchConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        SEARCH: APIRoot + "/v1/search",
        ALL_SEARCH: APIRoot + "/v1/search/all",
        SEARCH_FOLLOW: APIRoot + "/v1/search/follow",

    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        SEARCH_REQUEST: null,
        SEARCH_FAILURE: null,
        SEARCH_SUCCESS: null,

        ALL_SEARCH_REQUEST: null,
        ALL_SEARCH_FAILURE: null,
        ALL_SEARCH_SUCCESS: null,
        DESTROY_ALL_SEARCH: null,

        SEARCH_FOLLOW_REQUEST: null,
        SEARCH_FOLLOW_FAILURE: null,
        SEARCH_FOLLOW_SUCCESS: null,
        DESTROY_SEARCH_FOLLOW: null,

    })
};
