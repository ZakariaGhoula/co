import {checkHttpStatus, parseJSON} from './../utils/index';
import {SessionConstants} from './../constants/SessionConstant';


export function callAPiFB(api) {

    const p = fetch(api)
        .then((response) => response.json())
        .then((responseData) => {

            var pic = responseData.picture;
            var picture_final = null;
            if (typeof pic.data !== "undefined" && pic.data != null) {
                picture_final = pic.data.url;
            }
            var data_send = {
                email: responseData.email,
                gender: responseData.gender,
                last_name: responseData.last_name,
                first_name: responseData.first_name,
                locale: responseData.locale,
                provider: 'facebook',
                picture: picture_final,
                range_age: responseData.range_age,
                uid: responseData.id
            }


            return data_send;

        }, this);

    return {
        type: [SessionConstants.ActionTypes.API_LOGIN_FB_USER_REQUEST, SessionConstants.ActionTypes.API_LOGIN_FB_USER_SUCCESS, SessionConstants.ActionTypes.API_LOGIN_FB_USER_FAILURE],
        promise: p,

    }

}
export function callNetworkFb(api) {

    const p = fetch(api)
        .then((response) => response.json())
        .then((responseData) => {



            return responseData.data;

        }, this);

    return {
        type: [SessionConstants.ActionTypes.API_NETWORK_FB_REQUEST, SessionConstants.ActionTypes.API_NETWORK_FB_SUCCESS, SessionConstants.ActionTypes.API_NETWORK_FB_FAILURE],
        promise: p,

    }

}

export function loginFbAjax(data) {

    //--- informer le reducer que nous sommes en cours de login
    return fetch(SessionConstants.APIEndpoints.AUTH_FACEBOOK, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(parseJSON)
        .then(response => {
            if (response.status == "success") {
                // localStorage.setItem('token', response.data.user.access_token);
                return response
            } else {

                var r = "";
                for (var i = 0; i < response.errors.errors.length; i++) {
                    r += (response.errors.errors[i]) + "\n";
                }
                throw r;
            }
        })

}
export function loginFbUser(data) {

    const p = loginFbAjax(data);

    return {
        type: [SessionConstants.ActionTypes.LOGIN_FB_USER_REQUEST, SessionConstants.ActionTypes.LOGIN_FB_USER_SUCCESS, SessionConstants.ActionTypes.LOGIN_FB_USER_FAILURE],
        promise: p,

    }
}
/*
 export function loginFbAjax(data) {

 //--- informer le reducer que nous sommes en cours de login
 return fetch(SessionConstants.APIEndpoints.AUTH_FACEBOOK, {
 method: 'post',
 credentials: 'include',
 headers: {
 'Accept': 'application/json',
 'Content-Type': 'application/json'
 },
 body: JSON.stringify(data)
 })
 .then(parseJSON)
 .then(response => {
 if (response.status == "success") {
 // localStorage.setItem('token', response.data.user.access_token);
 return response
 } else {

 var r = "";
 for (var i = 0; i < response.errors.errors.length; i++) {
 r += (response.errors.errors[i]) + "\n";
 }
 throw r;
 }
 })

 }*/

export function subscribeUser(data) {
    const p = subscribeAjaxUser(data);
    return {
        type: [SessionConstants.ActionTypes.SUBSCRIBE_USER_REQUEST, SessionConstants.ActionTypes.SUBSCRIBE_USER_SUCCESS, SessionConstants.ActionTypes.SUBSCRIBE_USER_FAILURE],
        promise: p,

    }
}
export function subscribeAjaxUser(data) {
    //--- informer le reducer que nous sommes en cours de login
    return fetch(SessionConstants.APIEndpoints.SIGN_UP, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(parseJSON)
        .then(response => {
            if (response.status == "success") {
                // localStorage.setItem('token', response.data.user.access_token);
                return response
            } else {

                var r = "Erreur ";
                console.log(response);
                for (var i = 0; i < response.errors.errors.length; i++) {
                    r += (response.errors.errors[i]) + "\n";
                }
                throw r;
            }
        })

}

export function loginUser(email, password) {

    const p = loginUserAjax(email, password);

    return {
        type: [SessionConstants.ActionTypes.LOGIN_USER_REQUEST, SessionConstants.ActionTypes.LOGIN_USER_SUCCESS, SessionConstants.ActionTypes.LOGIN_USER_FAILURE],
        promise: p
    }
}
export function loginUserAjax(email, password) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(SessionConstants.APIEndpoints.LOGIN, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            grant_type: 'password',
        })
    })
        .then(parseJSON)
        .then(response => {
            if (response.status == "success") {
                // localStorage.setItem('token', response.data.user.access_token);
                return response
            } else {

                var r = "";
                for (var i = 0; i < response.errors.errors.length; i++) {
                    r += (response.errors.errors[i]) + "\n";
                }
                throw r;
            }
        })

}
export function skipForm(token) {

    const p = skipFormAjax(token);

    return {
        type: [SessionConstants.ActionTypes.SKIP_FORM_REQUEST, SessionConstants.ActionTypes.SKIP_FORM_SUCCESS, SessionConstants.ActionTypes.SKIP_FORM_FAILURE],
        promise: p
    }
}
export function skipFormAjax(token) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(SessionConstants.APIEndpoints.SKIP_FORM, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {

            return response

        })

}export function updateUserFacebook(token,uid) {

    const p = updateUserFacebookAjax(token,uid);

    return {
        type: [SessionConstants.ActionTypes.UPDATE_AUTH_FACBEOOK_REQUEST, SessionConstants.ActionTypes.UPDATE_AUTH_FACBEOOK_SUCCESS, SessionConstants.ActionTypes.UPDATE_AUTH_FACBEOOK_FAILURE],
        promise: p
    }
}
export function updateUserFacebookAjax(token,uid) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(SessionConstants.APIEndpoints.UPDATE_AUTH_FACBEOOK, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({
            uid: uid
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {

            return response

        })

}
export function saveForm(token, data) {

    const p = saveFormAjax(token, data);

    return {
        type: [SessionConstants.ActionTypes.SAVE_FORM_REQUEST, SessionConstants.ActionTypes.SAVE_FORM_SUCCESS, SessionConstants.ActionTypes.SAVE_FORM_FAILURE],
        promise: p
    }
}
export function saveFormAjax(token, data) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(SessionConstants.APIEndpoints.SAVE_FORM, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        },
        body: JSON.stringify(data)
    })
        .then(parseJSON)
        .then(response => {
            return response
        })
}
export function reconnect(token, user_id, form_skiped) {
    return {
        type: SessionConstants.ActionTypes.LOGIN_TOKEN_SUCCESS,
        token: token,
        user_id: user_id,
        form_skiped: form_skiped,
    }
}
export function retrieveData(token) {

    return fetch(SessionConstants.APIEndpoints.DATA_USER, {
        method: 'get',
        credentials: 'include',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {

            return (response.data);
        })
}
export function retrieveDataRequest(token) {
    const p = retrieveData(token);
    return {
        type: [SessionConstants.ActionTypes.DATA_USER_LOAD_REQUEST, SessionConstants.ActionTypes.DATA_USER_LOAD_SUCCESS, SessionConstants.ActionTypes.DATA_USER_LOAD_FAILURE],
        promise: p
    }
}

export function uploadAvatar(token, file_data) {
    return fetch(SessionConstants.APIEndpoints.IMAGE_UPLOAD, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            picture: file_data
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function uploadAndSaveUserData(token, file_data) {

    const p = uploadAvatar(token, file_data);
    return {
        type: [SessionConstants.ActionTypes.UPLOAD_AVATAR_REQUEST, SessionConstants.ActionTypes.UPLOAD_AVATAR_SUCCESS, SessionConstants.ActionTypes.UPLOAD_AVATAR_FAILURE],
        promise: p
    }
}


export function updateBasicProfileAjax(token, data) {
    return fetch(SessionConstants.APIEndpoints.UPDATE_BASIC_PROFILE, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function updateBasicProfile(token, data) {

    const p = updateBasicProfileAjax(token, data);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_BASIC_PROFILE_REQUEST, SessionConstants.ActionTypes.UPDATE_BASIC_PROFILE_SUCCESS, SessionConstants.ActionTypes.UPDATE_BASIC_PROFILE_FAILURE],
        promise: p
    }
}


//--- update about
export function updateAbout(token, about) {
    return fetch(SessionConstants.APIEndpoints.ABOUT_UPDATE, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            about: about
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}


export function saveUserAbout(token, about) {

    const p = updateAbout(token, about);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_ABOUT_REQUEST, SessionConstants.ActionTypes.UPDATE_ABOUT_SUCCESS, SessionConstants.ActionTypes.UPDATE_ABOUT_FAILURE],
        promise: p
    }
}

//--- update notification
export function updateNotificationRecipe(token, notification) {
    return fetch(SessionConstants.APIEndpoints.UPDATE_NOTIFICATION_RECIPE, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            notification: notification
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}


export function saveUserNotificationRecipe(token, notif) {

    const p = updateNotificationRecipe(token, notif);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_RECIPE_REQUEST, SessionConstants.ActionTypes.UPDATE_NOTIFICATION_RECIPE_SUCCESS, SessionConstants.ActionTypes.UPDATE_NOTIFICATION_RECIPE_FAILURE],
        promise: p
    }
}
export function updateNotificationApp(token, notification) {
    return fetch(SessionConstants.APIEndpoints.UPDATE_NOTIFICATION_APP, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            notification: notification
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}


export function saveUserNotificationApp(token, notif) {

    const p = updateNotificationApp(token, notif);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_APP_REQUEST, SessionConstants.ActionTypes.UPDATE_NOTIFICATION_APP_SUCCESS, SessionConstants.ActionTypes.UPDATE_NOTIFICATION_APP_FAILURE],
        promise: p
    }
}
export function updateNotificationFollow(token, notification) {
    return fetch(SessionConstants.APIEndpoints.UPDATE_NOTIFICATION_FOLLOW, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            notification: notification
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}


export function saveUserNotificationFollow(token, notif) {

    const p = updateNotificationFollow(token, notif);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_NOTIFICATION_FOLLOW_REQUEST, SessionConstants.ActionTypes.UPDATE_NOTIFICATION_FOLLOW_SUCCESS, SessionConstants.ActionTypes.UPDATE_NOTIFICATION_FOLLOW_FAILURE],
        promise: p
    }
}
export function updateAjaxRecipeOffline(token, recipe_offline) {
    return fetch(SessionConstants.APIEndpoints.UPDATE_RECIPE_OFFLINE, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            recipe_offline: recipe_offline
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}


export function updateRecipeOffline(token, recipe_offline) {

    const p = updateAjaxRecipeOffline(token, recipe_offline);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_RECIPE_OFFLINE_REQUEST, SessionConstants.ActionTypes.UPDATE_RECIPE_OFFLINE_SUCCESS, SessionConstants.ActionTypes.UPDATE_RECIPE_OFFLINE_FAILURE],
        promise: p
    }
}
export function updateAjaxLocale(token, locale) {
    return fetch(SessionConstants.APIEndpoints.UPDATE_LOCALE, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            locale: locale
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}


export function updateLocale(token, locale) {

    const p = updateAjaxLocale(token, locale);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_LOCALE_REQUEST, SessionConstants.ActionTypes.UPDATE_LOCALE_SUCCESS, SessionConstants.ActionTypes.UPDATE_LOCALE_FAILURE],
        promise: p
    }
}


/*----------*/
export function logoutAjaxUser(token) {
    return fetch(SessionConstants.APIEndpoints.LOGOUT, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            if (response.status == "success") {
                return {"logout": true}
            } else {
                return {"logout": false}
            }
        });
}

export function logout(token) {
    const p = logoutAjaxUser(token);

    storage.remove({
        key: 'loginState'
    });
    return {
        type: [SessionConstants.ActionTypes.LOGOUT_USER_REQUEST, SessionConstants.ActionTypes.LOGOUT_USER_SUCCESS, SessionConstants.ActionTypes.LOGOUT_USER_FAILURE],
        promise: p
    }
}

export function checkAjaxPassword(token, password) {
    return fetch(SessionConstants.APIEndpoints.CHECK_USER_PASSWORD, {

        method: 'post',
        credentials: 'include',
        body: JSON.stringify({
            password: password

        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function checkPassword(token, password) {
    const p = checkAjaxPassword(token, password);
    return {
        type: [SessionConstants.ActionTypes.CHECK_USER_PASSWORD_REQUEST, SessionConstants.ActionTypes.CHECK_USER_PASSWORD_SUCCESS, SessionConstants.ActionTypes.CHECK_USER_PASSWORD_FAILURE],
        promise: p
    }
}
export function checkAjaxEmail(email) {
    return fetch(SessionConstants.APIEndpoints.CHECK_USER_EMAIL, {

        method: 'post',
        credentials: 'include',
        body: JSON.stringify({
            email: email

        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function checkEmail(email) {
    const p = checkAjaxEmail(email);
    return {
        type: [SessionConstants.ActionTypes.CHECK_USER_EMAIL_REQUEST, SessionConstants.ActionTypes.CHECK_USER_EMAIL_SUCCESS, SessionConstants.ActionTypes.CHECK_USER_EMAIL_FAILURE],
        promise: p
    }
}
export function updateAjaxPassword(token, password) {
    return fetch(SessionConstants.APIEndpoints.UPDATE_USER_PASSWORD, {

        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            password: password,
            grant_type: 'password'
        }),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function updatePassword(token, password) {
    const p = updateAjaxPassword(token, password);
    return {
        type: [SessionConstants.ActionTypes.UPDATE_USER_PASSWORD_REQUEST, SessionConstants.ActionTypes.UPDATE_USER_PASSWORD_SUCCESS, SessionConstants.ActionTypes.UPDATE_USER_PASSWORD_FAILURE],
        promise: p
    }
}


export function retrieveAjaxMyNetwork(token) {
    return fetch(SessionConstants.APIEndpoints.MY_NETWORK, {

        method: 'get',
        credentials: 'include',


        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function retrieveMyNetwork(token) {
    const p = retrieveAjaxMyNetwork(token);
    return {
        type: [SessionConstants.ActionTypes.MY_NETWORK_REQUEST, SessionConstants.ActionTypes.MY_NETWORK_SUCCESS, SessionConstants.ActionTypes.MY_NETWORK_FAILURE],
        promise: p
    }
}
export function destroy_cookout() {
    return {
        type: SessionConstants.ActionTypes.COOKOUT_DESTROY
    }
}
export function retrieveAjaxFacebookNetwork(token,data) {


    return fetch(SessionConstants.APIEndpoints.FACEBOOK_NETWORK, {

        method: 'post',
        credentials: 'include',
        body: JSON.stringify({
            list_user: data,
        }),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function retrieveFacebookNetwork(token,data) {
    const p = retrieveAjaxFacebookNetwork(token,data);
    return {
        type: [SessionConstants.ActionTypes.FACEBOOK_NETWORK_REQUEST, SessionConstants.ActionTypes.FACEBOOK_NETWORK_SUCCESS, SessionConstants.ActionTypes.FACEBOOK_NETWORK_FAILURE],
        promise: p
    }
}



export function destroyFacebookFriends() {
    return {
        type: SessionConstants.ActionTypes.FACEBOOK_NETWORK_DESTROY
    }
}
export function retrieveAjaxNewSuggestionNetwork(token) {

    return fetch(SessionConstants.APIEndpoints.NEW_SUGGESTION_NETWORK, {

        method: 'post',
        credentials: 'include',


        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token="' + token + '"'
        }
    })
        .then(parseJSON)
        .then(response => {
            return (response.data);
        })
}
export function retrieveNewSuggestionNetwork(token) {
    const p = retrieveAjaxNewSuggestionNetwork(token);
    return {
        type: [SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_REQUEST, SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_SUCCESS, SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_FAILURE],
        promise: p
    }
}



export function destroyNewSuggestionFriends() {
    return {
        type: SessionConstants.ActionTypes.NEW_SUGGESTION_NETWORK_DESTROY
    }
}
