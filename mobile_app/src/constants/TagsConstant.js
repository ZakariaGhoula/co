import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const TagsConstants = {


    APIEndpoints: {
        GET_TAGS_SUGGEST: APIRoot + "/v1/tags/suggest",
        GET_TAGS_AUTOCOMPLETE: APIRoot + "/v1/tags/autocomplete"

    },


    ActionTypes: keyMirror({
        // retrieve list product
        GET_TAGS_SUGGEST_REQUEST: null,
        GET_TAGS_SUGGEST_FAILURE: null,
        GET_TAGS_SUGGEST_SUCCESS: null,
        GET_TAGS_AUTOCOMPLETE_REQUEST: null,
        GET_TAGS_AUTOCOMPLETE_FAILURE: null,
        GET_TAGS_AUTOCOMPLETE_SUCCESS: null





    })
};
