import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const ConfigConstants = {


    APIEndpoints: {
        CONFIG_LANG:        APIRoot + "/v1/config/langue",
        TAGS_RECIPE:        APIRoot + "/v1/config/tags_recipe"
    },



    ActionTypes: keyMirror({
        // langue
        CONFIG_LANG_REQUEST: null,
        CONFIG_LANG_FAILURE:null,
        CONFIG_LANG_SUCCESS:null,
        // tag_recipe
       TAGS_RECIPE_REQUEST: null,
       TAGS_RECIPE_FAILURE:null,
       TAGS_RECIPE_SUCCESS:null,


    })
};
