import keyMirror from 'keymirror';
import {APIRoot,APPRoot} from './config_path';


// Todo constants
export const SessionConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        COMMENTS: APIRoot + "/v1/comments",
        LOGIN: APIRoot + "/v1/sign_in",
        LOGOUT:        APIRoot + "/v1/logout",
        SIGN_UP: APIRoot + "/v1/registrations",
        SKIP_FORM: APIRoot + "/v1/user/form/skiped",
        SAVE_FORM: APIRoot + "/v1/user/form/save",
        UPDATE_AUTH_FACBEOOK: APIRoot + "/v1/user/update/facebook",
        AUTH_FACEBOOK: APIRoot + "/v1/oauth_facebook",
        APP_PATH_IMAGES: APPRoot + "/public/images",
        DATA_USER: APIRoot + "/v1/profile",
        IMAGE_UPLOAD: APIRoot + "/v1/profile/avatar",
        UPDATE_BASIC_PROFILE: APIRoot + "/v1/profile/update_basic",
        ABOUT_UPDATE: APIRoot + "/v1/profile/about",
        UPDATE_NOTIFICATION_RECIPE: APIRoot + "/v1/profile/notifications/recipe",
        UPDATE_NOTIFICATION_FOLLOW: APIRoot + "/v1/profile/notifications/follow",
        UPDATE_NOTIFICATION_APP: APIRoot + "/v1/profile/notifications/app",
        UPDATE_RECIPE_OFFLINE: APIRoot + "/v1/profile/recipes/offline",
        UPDATE_LOCALE: APIRoot + "/v1/profile/locale",
        UPDATE_USER_PASSWORD: APIRoot + "/v1/profile/update/password",
        CHECK_USER_EMAIL: APIRoot + "/v1/profile/check/email",
        CHECK_USER_PASSWORD: APIRoot + "/v1/profile/check/password",
        MY_NETWORK: APIRoot + "/v1/profile/network/my",
        FACEBOOK_NETWORK: APIRoot + "/v1/profile/network/facebook",
        NEW_SUGGESTION_NETWORK: APIRoot + "/v1/profile/network/suggestions/new",
    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        LOGIN_USER_REQUEST: null,
        LOGIN_USER_FAILURE: null,
        LOGIN_USER_SUCCESS: null,

        SUBSCRIBE_USER_REQUEST: null,
        SUBSCRIBE_USER_FAILURE: null,
        SUBSCRIBE_USER_SUCCESS: null,


        SKIP_FORM_REQUEST: null,
        SKIP_FORM_SUCCESS: null,
        SKIP_FORM_FAILURE: null,
        SAVE_FORM_REQUEST: null,
        SAVE_FORM_SUCCESS: null,
        SAVE_FORM_FAILURE: null,


        UPDATE_AUTH_FACBEOOK_REQUEST: null,
        UPDATE_AUTH_FACBEOOK_SUCCESS: null,
        UPDATE_AUTH_FACBEOOK_FAILURE: null,


        LOGOUT_USER_REQUEST: null,
        LOGOUT_USER_SUCCESS: null,
        LOGOUT_USER_FAILURE: null,

        LOGIN_FB_USER_REQUEST: null,
        LOGIN_FB_USER_SUCCESS: null,
        LOGIN_FB_USER_FAILURE: null,
        API_LOGIN_FB_USER_REQUEST: null,
        API_LOGIN_FB_USER_SUCCESS: null,
        API_LOGIN_FB_USER_FAILURE: null,

        API_NETWORK_FB_REQUEST: null,
        API_NETWORK_FB_SUCCESS: null,
        API_NETWORK_FB_FAILURE: null,

        LOGIN_FB_USER_SUCCESS: null,


        LOGIN_TOKEN_SUCCESS: null,

        DATA_USER_LOAD_REQUEST: null,
        DATA_USER_LOAD_SUCCESS: null,
        DATA_USER_LOAD_FAILURE: null,

        UPLOAD_AVATAR_REQUEST: null,
        UPLOAD_AVATAR_SUCCESS: null,
        UPLOAD_AVATAR_FAILURE: null,

        UPDATE_BASIC_PROFILE_REQUEST: null,
        UPDATE_BASIC_PROFILE_SUCCESS: null,
        UPDATE_BASIC_PROFILE_FAILURE: null,

        UPDATE_ABOUT_REQUEST: null,
        UPDATE_ABOUT_SUCCESS: null,
        UPDATE_ABOUT_FAILURE: null,

        UPDATE_NOTIFICATION_RECIPE_REQUEST: null,
        UPDATE_NOTIFICATION_RECIPE_SUCCESS: null,
        UPDATE_NOTIFICATION_RECIPE_FAILURE: null,

        UPDATE_NOTIFICATION_FOLLOW_REQUEST: null,
        UPDATE_NOTIFICATION_FOLLOW_SUCCESS: null,
        UPDATE_NOTIFICATION_FOLLOW_FAILURE: null,

        UPDATE_NOTIFICATION_APP_REQUEST: null,
        UPDATE_NOTIFICATION_APP_SUCCESS: null,
        UPDATE_NOTIFICATION_APP_FAILURE: null,

        UPDATE_USER_PASSWORD_REQUEST: null,
        UPDATE_USER_PASSWORD_SUCCESS: null,
        UPDATE_USER_PASSWORD_FAILURE: null,

        UPDATE_RECIPE_OFFLINE_REQUEST: null,
        UPDATE_RECIPE_OFFLINE_SUCCESS: null,
        UPDATE_RECIPE_OFFLINE_FAILURE: null,

        UPDATE_LOCALE_REQUEST: null,
        UPDATE_LOCALE_SUCCESS: null,
        UPDATE_LOCALE_FAILURE: null,

        CHECK_USER_PASSWORD_REQUEST: null,
        CHECK_USER_PASSWORD_SUCCESS: null,
        CHECK_USER_PASSWORD_FAILURE: null,

        CHECK_USER_EMAIL_REQUEST: null,
        CHECK_USER_EMAIL_SUCCESS: null,
        CHECK_USER_EMAIL_FAILURE: null,

        MY_NETWORK_REQUEST: null,
        MY_NETWORK_SUCCESS: null,
        MY_NETWORK_FAILURE: null,

        FACEBOOK_NETWORK_REQUEST: null,
        FACEBOOK_NETWORK_SUCCESS: null,
        FACEBOOK_NETWORK_FAILURE: null,
        FACEBOOK_NETWORK_DESTROY: null,



        NEW_SUGGESTION_NETWORK_REQUEST: null,
        NEW_SUGGESTION_NETWORK_SUCCESS: null,
        NEW_SUGGESTION_NETWORK_FAILURE: null,
        NEW_SUGGESTION_NETWORK_DESTROY: null,

        // Routes
        REDIRECT: null,



        LOAD_COMMENTS: null,
        RECEIVE_COMMENTS: null,
        LOAD_COMMENT: null,
        RECEIVE_COMMENT: null,
        CREATE_COMMENT: null,
        RECEIVE_CREATED_COMMENT: null,
        COOKOUT_DESTROY: null,



        LOGOUT_USER_REQUEST: null,
        LOGOUT_USER_SUCCESS: null,
        LOGOUT_USER_FAILURE: null,




    })
};
