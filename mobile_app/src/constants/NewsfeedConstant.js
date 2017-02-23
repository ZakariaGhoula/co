import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const NewsfeedConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        LOAD: APIRoot + "/v1/newsfeed/explore",
        RELOAD: APIRoot + "/v1/newsfeed/explore/reload",
        LOAD_ABOS: APIRoot + "/v1/newsfeed/abos",
        RELOAD_ABOS: APIRoot + "/v1/newsfeed/abos/reload",
        LOAD_TEAM: APIRoot + "/v1/newsfeed/team",
        RELOAD_TEAM: APIRoot + "/v1/newsfeed/team/reload",


    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        LOAD_REQUEST: null,
        LOAD_FAILURE: null,
        LOAD_SUCCESS: null,


        LOAD_ABOS_REQUEST: null,
        LOAD_ABOS_FAILURE: null,
        LOAD_ABOS_SUCCESS: null,
        LOAD_ABOS_DESTROY: null,

        LOAD_TEAM_REQUEST: null,
        LOAD_TEAM_FAILURE: null,
        LOAD_TEAM_SUCCESS: null,
        LOAD_TEAM_DESTROY: null,
        QUICK_LOAD_TEAM_SUCCESS: null,


        RELOAD_REQUEST: null,
        RELOAD_FAILURE: null,
        RELOAD_SUCCESS: null,

        RELOAD_ABOS_REQUEST: null,
        RELOAD_ABOS_FAILURE: null,
        RELOAD_ABOS_SUCCESS: null,

        RELOAD_TEAM_REQUEST: null,
        RELOAD_TEAM_FAILURE: null,
        RELOAD_TEAM_SUCCESS: null,


    })
};
