import {createReducer} from './../utils/index';
import { SessionConstants } from './../constants/SessionConstant';

const initialState = {
    token: null,
    user_id: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistrating: false,
    form_skiped: null,
    activated: null,
    user: null,
    passwordChecked: null,
    emailChecked: null,
    statusPassword: null,
    statusEmail: null,
    my_network: null,
    new_suggestion_network: null,
    data_fb: null,
    network_fb: null,
};


// Login
function LOGIN_USER_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': true,
        'statusText': null,
        form_skiped: null,
        activated: null,
        token: null,
        user_id: null,
    });
}
function LOGIN_USER_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.result.data.user.access_token,
        'form_skiped': action.result.data.user.form_skiped,
        'activated': action.result.data.user.activated,
        'user_id': action.result.data.user.user_id,
        'statusText': ''
    });
}
function LOGIN_USER_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        form_skiped: null,
        activated: null,
        token: null,
        user_id: null,
        'statusText': action.error.replace("Unable to find user with email", "Aucun utilisateur n'existe sous")
    });
}
function LOGIN_FB_USER_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': true,
        'statusText': null,
        form_skiped: null,
        activated: null,
        token: null,
        user_id: null,

    });
}
function LOGIN_FB_USER_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.result.data.user.access_token,
        'form_skiped': action.result.data.user.form_skiped,
        'activated': action.result.data.user.activated,
        'user_id': action.result.data.user.user_id,
        'statusText': ''
    });
}
function LOGIN_FB_USER_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'statusText': action.error,
        form_skiped: null,
        activated: null,
        user_id: null,
    });
}
function API_LOGIN_FB_USER_REQUEST(state, action) {
    return Object.assign({}, state, {
        'data_fb': null,

    });
}
function API_LOGIN_FB_USER_SUCCESS(state, action) {

    return Object.assign({}, state, {

        'data_fb': action.result

    });
}
function API_LOGIN_FB_USER_FAILURE(state, action) {
    return Object.assign({}, state, {
        'statusText':"Erreur de connexion à Fb",
        data_fb: null,
    });
}function API_NETWORK_FB_REQUEST(state, action) {
    return Object.assign({}, state, {
        'network_fb': null,

    });
}
function API_NETWORK_FB_SUCCESS(state, action) {

    return Object.assign({}, state, {

        'network_fb': action.result

    });
}
function API_NETWORK_FB_FAILURE(state, action) {
    return Object.assign({}, state, {
        'statusText':"Erreur de connexion à Fb",
        network_fb: null,
    });
}


// login fb


function LOGIN_TOKEN_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.token,
        'form_skiped': action.form_skiped,
        'activated':1,
        'user_id': action.user_id,
        'statusText': ""
    });
}
// Logout
function LOGOUT_USER_REQUEST(state, action) {
    return Object.assign({}, state, {
        token: null,
        user_id: null,
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: null,
        isRegistrating: false,
        form_skiped: null,
        activated: null,
        user: null,
        passwordChecked: null,
        emailChecked: null,
        statusPassword: null,
        statusEmail: null,
        my_network: null,
        data_fb: null,
    });
}
function LOGOUT_USER_SUCCESS(state, action) {

    return Object.assign({}, state, {
        token: null,
        user_id: null,
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: null,
        isRegistrating: false,
        form_skiped: null,
        activated: null,
        user: null,
        passwordChecked: null,
        emailChecked: null,
        statusPassword: null,
        statusEmail: null,
        my_network: null,
        data_fb: null,
    });
}
function LOGOUT_USER_FAILURE(state, action) {
    return state;
}

// sign up
function SUBSCRIBE_USER_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRegistrating': true,
        'statusText': null,
        form_skiped: null,
        activated: null,
        user_id: null,
    });
}
function SUBSCRIBE_USER_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isRegistrating': false,
        'isAuthenticated': true,
        'token': action.result.data.user.access_token,
        'form_skiped': action.result.data.user.form_skiped,
        'activated': action.result.data.user.activated,
        'user_id': action.result.data.user.user_id,
        'statusText': 'Signup OK'
    });
}

function SUBSCRIBE_USER_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'isRegistrating': false,
        'token': null,
        'statusText': action.error,
        form_skiped: null,
        activated: null,
        user_id: null,
    });
}
//skip
function SKIP_FORM_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRegistrating': true,
    });
}
function SKIP_FORM_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'user': action.result.data,
        'form_skiped': 1,
        'statustext': 'skiped ok'
    });
}

function SKIP_FORM_FAILURE(state, action) {
    return Object.assign({}, state, {
        'statusText': "ERROR",
    });
}function UPDATE_AUTH_FACBEOOK_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRegistrating': true,
    });
}
function UPDATE_AUTH_FACBEOOK_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'user': action.result.data,
    });
}

function UPDATE_AUTH_FACBEOOK_FAILURE(state, action) {
    return Object.assign({}, state, {
        'statusText': "ERROR",
    });
}//save
function SAVE_FORM_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRegistrating': true,
    });
}
function SAVE_FORM_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'form_skiped': 1,
        'statustext': 'skiped ok'
    });
}

function SAVE_FORM_FAILURE(state, action) {
    return Object.assign({}, state, {
        'statusText': "ERROR",
    });
}


function DATA_USER_LOAD_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true
    });
}

function DATA_USER_LOAD_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result
    });
}
function DATA_USER_LOAD_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,

        'statutText': 'Erreur'
    });
}
function UPLOAD_AVATAR_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true
    });
}

function UPLOAD_AVATAR_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result
    });
}
function UPLOAD_AVATAR_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur upload'
    });
}

function UPDATE_BASIC_PROFILE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true
    });
}

function UPDATE_BASIC_PROFILE_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result
    });
}
function UPDATE_BASIC_PROFILE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur upload'
    });
}


function UPDATE_ABOUT_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statutText': "requesting"

    });
}
function UPDATE_ABOUT_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function UPDATE_ABOUT_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result,
        'statutText': ''
    });
}

/*----------- NOTIFICATIONS */
function UPDATE_NOTIFICATION_RECIPE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statutText': "requesting"

    });
}
function UPDATE_NOTIFICATION_RECIPE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function UPDATE_NOTIFICATION_RECIPE_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result,
        'statutText': ''
    });
}
function UPDATE_NOTIFICATION_FOLLOW_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statutText': "requesting"

    });
}
function UPDATE_NOTIFICATION_FOLLOW_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function UPDATE_NOTIFICATION_FOLLOW_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result,
        'statutText': ''
    });
}
function UPDATE_NOTIFICATION_APP_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statutText': "requesting"

    });
}
function UPDATE_NOTIFICATION_APP_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function UPDATE_NOTIFICATION_APP_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result,
        'statutText': ''
    });
}
/*----------- FIN NOTIFICATIONS */
/*---- RECIPE OFFLINE*/
function UPDATE_RECIPE_OFFLINE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statutText': "requesting"

    });
}
function UPDATE_RECIPE_OFFLINE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function UPDATE_RECIPE_OFFLINE_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result,
        'statutText': ''
    });
}
/*----------- FIN  RECIPE OFFLINE */

/*---- RECIPE OFFLINE*/
function UPDATE_LOCALE_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statutText': "requesting"

    });
}
function UPDATE_LOCALE_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function UPDATE_LOCALE_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result,
        'statutText': ''
    });
}
/*----------- FIN  RECIPE OFFLINE */
// Logout
function LOGOUT_USER_REQUEST(state, action) {
    return state;
}
function LOGOUT_USER_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'user': null,
        'statusText': ''
    });
}
function LOGOUT_USER_FAILURE(state, action) {
    return state;
}

function CHECK_USER_PASSWORD_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'passwordChecked': false,
        'statusPassword': null,

    });
}
function CHECK_USER_PASSWORD_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'passwordChecked': true,
        'statusPassword': (!action.result.exist) ? "L'ancien mot de passe est incorrect" : null,
        'statutText':null
    });
}
function CHECK_USER_PASSWORD_FAILURE(state, action) { ;
    return Object.assign({}, state, {
        'isRequesting': false,
        'passwordChecked': false,
        'statutText': "Impossible de vérifier le mot de passe",
        'statusPassword': null
    });
}function CHECK_USER_EMAIL_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'emailChecked': false,
        'statusEmail': null,

    });
}
function CHECK_USER_EMAIL_SUCCESS(state, action) {

    return Object.assign({}, state, {
        'isRequesting': false,
        'emailChecked': true,
        'statusEmail': action.result.exist,
        'statutText':null
    });
}
function CHECK_USER_EMAIL_FAILURE(state, action) { ;
    return Object.assign({}, state, {
        'isRequesting': false,
        'emailChecked': false,
        'statusEmail': null,
    });
}


function UPDATE_USER_PASSWORD_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusPassword': null,
    });
}

function UPDATE_USER_PASSWORD_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'user': action.result
    });
}
function UPDATE_USER_PASSWORD_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,

        'statutText': 'Erreur'
    });
}
function MY_NETWORK_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusPassword': null,
    });
}

function MY_NETWORK_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'my_network': action.result
    });
}
function MY_NETWORK_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,

        'statutText': 'Erreur'
    });
}function FACEBOOK_NETWORK_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusPassword': null,
    });
}

function FACEBOOK_NETWORK_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'facebook_network': action.result
    });
}
function FACEBOOK_NETWORK_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,

        'statutText': 'Erreur'
    });
}function FACEBOOK_NETWORK_DESTROY(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'facebook_network':null
    });
}function NEW_SUGGESTION_NETWORK_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusPassword': null,
    });
}

function NEW_SUGGESTION_NETWORK_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'new_suggestion_network': action.result
    });
}
function NEW_SUGGESTION_NETWORK_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,

        'statutText': 'Erreur'
    });
}function NEW_SUGGESTION_NETWORK_DESTROY(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        'new_suggestion_network':null
    });
}

function COOKOUT_DESTROY(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        my_network:null,
        'statutText': ''
    });
}


const handlers =
{
    [SessionConstants.ActionTypes.LOGIN_USER_REQUEST]: LOGIN_USER_REQUEST,
    [SessionConstants.ActionTypes.LOGIN_USER_SUCCESS]: LOGIN_USER_SUCCESS,
    [SessionConstants.ActionTypes.LOGIN_USER_FAILURE]: LOGIN_USER_FAILURE,
    [SessionConstants.ActionTypes.LOGIN_FB_USER_REQUEST]: LOGIN_FB_USER_REQUEST,
    [SessionConstants.ActionTypes.LOGIN_FB_USER_SUCCESS]: LOGIN_FB_USER_SUCCESS,
    [SessionConstants.ActionTypes.LOGIN_FB_USER_FAILURE]: LOGIN_FB_USER_FAILURE,

    [SessionConstants.ActionTypes.API_LOGIN_FB_USER_REQUEST]: API_LOGIN_FB_USER_REQUEST,
    [SessionConstants.ActionTypes.API_LOGIN_FB_USER_SUCCESS]: API_LOGIN_FB_USER_SUCCESS,
    [SessionConstants.ActionTypes.API_LOGIN_FB_USER_FAILURE]: API_LOGIN_FB_USER_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_AUTH_FACBEOOK_REQUEST]: UPDATE_AUTH_FACBEOOK_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_AUTH_FACBEOOK_SUCCESS]: UPDATE_AUTH_FACBEOOK_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_AUTH_FACBEOOK_FAILURE]: UPDATE_AUTH_FACBEOOK_FAILURE,

    [SessionConstants.ActionTypes.API_NETWORK_FB_REQUEST]: API_NETWORK_FB_REQUEST,
    [SessionConstants.ActionTypes.API_NETWORK_FB_SUCCESS]: API_NETWORK_FB_SUCCESS,
    [SessionConstants.ActionTypes.API_NETWORK_FB_FAILURE]: API_NETWORK_FB_FAILURE,
    [SessionConstants.ActionTypes.LOGOUT_USER_REQUEST]: LOGOUT_USER_REQUEST,
    [SessionConstants.ActionTypes.LOGOUT_USER_SUCCESS]: LOGOUT_USER_SUCCESS,
    [SessionConstants.ActionTypes.LOGOUT_USER_FAILURE]: LOGOUT_USER_FAILURE,
    [SessionConstants.ActionTypes.SUBSCRIBE_USER_REQUEST]: SUBSCRIBE_USER_REQUEST,
    [SessionConstants.ActionTypes.SUBSCRIBE_USER_SUCCESS]: SUBSCRIBE_USER_SUCCESS,
    [SessionConstants.ActionTypes.SUBSCRIBE_USER_FAILURE]: SUBSCRIBE_USER_FAILURE,
    [SessionConstants.ActionTypes.SAVE_FORM_REQUEST]: SAVE_FORM_REQUEST,
    [SessionConstants.ActionTypes.SAVE_FORM_SUCCESS]: SAVE_FORM_SUCCESS,
    [SessionConstants.ActionTypes.SAVE_FORM_FAILURE]: SAVE_FORM_FAILURE,
    [SessionConstants.ActionTypes.SKIP_FORM_REQUEST]: SKIP_FORM_REQUEST,
    [SessionConstants.ActionTypes.SKIP_FORM_SUCCESS]: SKIP_FORM_SUCCESS,
    [SessionConstants.ActionTypes.SKIP_FORM_FAILURE]: SKIP_FORM_FAILURE,
    [SessionConstants.ActionTypes.DATA_USER_LOAD_REQUEST]: DATA_USER_LOAD_REQUEST,
    [SessionConstants.ActionTypes.DATA_USER_LOAD_SUCCESS]: DATA_USER_LOAD_SUCCESS,
    [SessionConstants.ActionTypes.DATA_USER_LOAD_FAILURE]: DATA_USER_LOAD_FAILURE,
    [SessionConstants.ActionTypes.UPLOAD_AVATAR_REQUEST]: UPLOAD_AVATAR_REQUEST,
    [SessionConstants.ActionTypes.UPLOAD_AVATAR_SUCCESS]: UPLOAD_AVATAR_SUCCESS,
    [SessionConstants.ActionTypes.UPLOAD_AVATAR_FAILURE]: UPLOAD_AVATAR_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_BASIC_PROFILE_REQUEST]: UPDATE_BASIC_PROFILE_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_BASIC_PROFILE_SUCCESS]: UPDATE_BASIC_PROFILE_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_BASIC_PROFILE_FAILURE]: UPDATE_BASIC_PROFILE_FAILURE,
    [SessionConstants.ActionTypes.LOGIN_TOKEN_SUCCESS]: LOGIN_TOKEN_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_ABOUT_REQUEST]: UPDATE_ABOUT_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_ABOUT_SUCCESS]: UPDATE_ABOUT_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_ABOUT_FAILURE]: UPDATE_ABOUT_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_APP_REQUEST]: UPDATE_NOTIFICATION_APP_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_APP_SUCCESS]: UPDATE_NOTIFICATION_APP_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_APP_FAILURE]: UPDATE_NOTIFICATION_APP_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_FOLLOW_REQUEST]: UPDATE_NOTIFICATION_FOLLOW_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_FOLLOW_SUCCESS]: UPDATE_NOTIFICATION_FOLLOW_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_FOLLOW_FAILURE]: UPDATE_NOTIFICATION_FOLLOW_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_RECIPE_REQUEST]: UPDATE_NOTIFICATION_RECIPE_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_RECIPE_SUCCESS]: UPDATE_NOTIFICATION_RECIPE_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_RECIPE_FAILURE]: UPDATE_NOTIFICATION_RECIPE_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_LOCALE_REQUEST]: UPDATE_LOCALE_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_LOCALE_SUCCESS]: UPDATE_LOCALE_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_LOCALE_FAILURE]: UPDATE_LOCALE_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_RECIPE_OFFLINE_REQUEST]: UPDATE_RECIPE_OFFLINE_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_RECIPE_OFFLINE_SUCCESS]: UPDATE_RECIPE_OFFLINE_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_RECIPE_OFFLINE_FAILURE]: UPDATE_RECIPE_OFFLINE_FAILURE,
    [SessionConstants.ActionTypes.CHECK_USER_PASSWORD_REQUEST]: CHECK_USER_PASSWORD_REQUEST,
    [SessionConstants.ActionTypes.CHECK_USER_PASSWORD_SUCCESS]: CHECK_USER_PASSWORD_SUCCESS,
    [SessionConstants.ActionTypes.CHECK_USER_PASSWORD_FAILURE]: CHECK_USER_PASSWORD_FAILURE,
    [SessionConstants.ActionTypes.CHECK_USER_EMAIL_REQUEST]: CHECK_USER_EMAIL_REQUEST,
    [SessionConstants.ActionTypes.CHECK_USER_EMAIL_SUCCESS]: CHECK_USER_EMAIL_SUCCESS,
    [SessionConstants.ActionTypes.CHECK_USER_EMAIL_FAILURE]: CHECK_USER_EMAIL_FAILURE,
    [SessionConstants.ActionTypes.UPDATE_USER_PASSWORD_REQUEST]: UPDATE_USER_PASSWORD_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_USER_PASSWORD_SUCCESS]: UPDATE_USER_PASSWORD_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_USER_PASSWORD_FAILURE]: UPDATE_USER_PASSWORD_FAILURE,
    [SessionConstants.ActionTypes.MY_NETWORK_REQUEST]: MY_NETWORK_REQUEST,
    [SessionConstants.ActionTypes.MY_NETWORK_SUCCESS]: MY_NETWORK_SUCCESS,
    [SessionConstants.ActionTypes.MY_NETWORK_FAILURE]: MY_NETWORK_FAILURE,
    [SessionConstants.ActionTypes.FACEBOOK_NETWORK_REQUEST]: FACEBOOK_NETWORK_REQUEST,
    [SessionConstants.ActionTypes.FACEBOOK_NETWORK_SUCCESS]: FACEBOOK_NETWORK_SUCCESS,
    [SessionConstants.ActionTypes.FACEBOOK_NETWORK_FAILURE]: FACEBOOK_NETWORK_FAILURE,
    [SessionConstants.ActionTypes.FACEBOOK_NETWORK_DESTROY]: FACEBOOK_NETWORK_DESTROY,


    [SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_REQUEST]: NEW_SUGGESTION_NETWORK_REQUEST,
    [SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_SUCCESS]: NEW_SUGGESTION_NETWORK_SUCCESS,
    [SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_FAILURE]: NEW_SUGGESTION_NETWORK_FAILURE,
    [SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_DESTROY]: NEW_SUGGESTION_NETWORK_DESTROY,
    [SessionConstants.ActionTypes.COOKOUT_DESTROY]: COOKOUT_DESTROY,


}
export default createReducer(initialState, handlers);