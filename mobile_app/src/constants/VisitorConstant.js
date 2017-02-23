import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const VisitorConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        PROFILE_VISITOR: APIRoot + "/v1/profile/visitor",
        VISITOR_NETWORK: APIRoot + "/v1/profile/visitor/network",
        VISITOR_ADD_NETWORK: APIRoot + "/v1/profile/network/add",
        VISITOR_REMOVE_NETWORK: APIRoot + "/v1/profile/network/remove",

    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        PROFILE_VISITOR_REQUEST: null,
        PROFILE_VISITOR_FAILURE: null,
        PROFILE_VISITOR_SUCCESS: null,


        VISITOR_ADD_NETWORK_REQUEST: null,
        VISITOR_ADD_NETWORK_FAILURE: null,
        VISITOR_ADD_NETWORK_SUCCESS: null,

        VISITOR_NETWORK_REQUEST: null,
        VISITOR_NETWORK_FAILURE: null,
        VISITOR_NETWORK_SUCCESS: null,

        VISITOR_REMOVE_NETWORK_REQUEST: null,
        VISITOR_REMOVE_NETWORK_FAILURE: null,
        VISITOR_REMOVE_NETWORK_SUCCESS: null,

        PROFILE_VISITOR_DESTROY: null,

    })
};
