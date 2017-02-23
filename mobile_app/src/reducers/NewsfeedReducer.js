import {createReducer} from './../utils/index';
import { NewsfeedConstants } from '../constants/NewsfeedConstant';


import _ from 'underscore';
const initialState = {
    isRequesting: false,

    newsfeed_abos: null,
    newsfeed: null,
    newsfeed_team: null,
    newsfeed_page: 0,
    newsfeed_abos_page: 0,
    newsfeed_limit: 8,
    newsfeed_abos_limit: 8,

};

_.mixin({
    merge: function () {
        return _.reduce(arguments, function (list, obj) {
            return _.extend(list, obj);
        }, {});
    }
});

// request
function LOAD_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function LOAD_SUCCESS(state, action) {
    var list = state.newsfeed;


    //   $.extend({}, action.result.result.team,action.result.result.other);

    if (list == null) {
        var obj3 = {}
        var i = 0;
        for (var j in action.result.result.team) {
            obj3[i++] = (action.result.result.team[j])
        }
        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;
    }
    else {

        var obj3 = {}
        var i = 0;
        for (var j in state.newsfeed) {
            obj3[i++] = (state.newsfeed[j])
        }
        for (var j in action.result.result.team) {
            obj3[i++] = (action.result.result.team[j])
        }
        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;
        //list = (_.merge(state.newsfeed, obj3));
    }

    //console.log(list);

    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_page: action.result.params.page,
        newsfeed: list,
        newsfeed_limit: action.result.params.limit,
        'statusText': 'load succes'
    });
}
function LOAD_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}

function LOAD_ABOS_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function LOAD_ABOS_SUCCESS(state, action) {
    var list = state.newsfeed_abos;


    //   $.extend({}, action.result.result.team,action.result.result.other);

    if (list == null) {
        var obj3 = {}
        var i = 0;

        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;
    }
    else {

        var obj3 = {}
        var i = 0;
        for (var j in state.newsfeed_abos) {
            obj3[i++] = (state.newsfeed_abos[j])
        }

        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;

        //list = (_.merge(state.newsfeed, obj3));
    }

    //console.log(list);

    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_abos_page: action.result.params.page,
        newsfeed_abos: list,
        newsfeed_abos_limit: action.result.params.limit,
        'statusText': 'load succes'
    });
}
function LOAD_ABOS_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}function LOAD_ABOS_DESTROY(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_abos:null,
        newsfeed_abos_page: 0,
        newsfeed_abos_limit: 8,
    });
}
// request
function RELOAD_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        newsfeed: null,
        newsfeed_page: 0,
        newsfeed_limit: 8,
        'statusText': null,
    });
}
function RELOAD_SUCCESS(state, action) {

    var list = null;
    if (list == null) {
        var obj3 = {}
        var i = 0;
        for (var j in action.result.result.team) {
            obj3[i++] = (action.result.result.team[j])
        }
        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;
    }
    else {

        var obj3 = {}
        var i = 0;
        for (var j in state.newsfeed) {
            obj3[i++] = (state.newsfeed[j])
        }
        for (var j in action.result.result.team) {
            obj3[i++] = (action.result.result.team[j])
        }
        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;
        //list = (_.merge(state.newsfeed, obj3));
    }

    //console.log(list);

    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_page: action.result.params.page,
        newsfeed: list,
        newsfeed_limit: action.result.params.limit,
        'statusText': 'load succes'
    });
}
function RELOAD_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}
function RELOAD_ABOS_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        newsfeed_abos: null,
        newsfeed_abos_page: 0,
        newsfeed_abos_limit: 8,
        'statusText': null,
    });
}
function RELOAD_ABOS_SUCCESS(state, action) {

    var list = null;
    if (list == null) {
        var obj3 = {}
        var i = 0;

        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;
    }
    else {

        var obj3 = {}
        var i = 0;
        for (var j in state.newsfeed_abos) {
            obj3[i++] = (state.newsfeed_abos[j])
        }

        for (var j in action.result.result.other) {
            obj3[i++] = (action.result.result.other[j])
        }
        list = obj3;
        //list = (_.merge(state.newsfeed, obj3));
    }

    //console.log(list);

    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_abos_page: action.result.params.page,
        newsfeed_abos: list,
        newsfeed_abos_limit: action.result.params.limit,
        'statusText': 'load succes'
    });
}
function RELOAD_ABOS_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}


function LOAD_TEAM_REQUEST(state, action) {
    return Object.assign({}, state, {
        'isRequesting': true,
        'statusText': null,
    });
}
function LOAD_TEAM_SUCCESS(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_team: action.result.result,
        'statusText': 'load succes'
    });
}function QUICK_LOAD_TEAM_SUCCESS(state, action) {


    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_team: action.newsfeedteam,
        'statusText': 'load succes'
    });
}
function LOAD_TEAM_FAILURE(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        statusText: ""
    });
}function LOAD_TEAM_DESTROY(state, action) {
    return Object.assign({}, state, {
        'isRequesting': false,
        newsfeed_team:null,
        newsfeed: null,
        newsfeed_team: null,
        newsfeed_page: 0,
        newsfeed_limit: 8,
    });
}
const handlers =
{

    [NewsfeedConstants.ActionTypes.LOAD_REQUEST]: LOAD_REQUEST,
    [NewsfeedConstants.ActionTypes.LOAD_SUCCESS]: LOAD_SUCCESS,
    [NewsfeedConstants.ActionTypes.LOAD_FAILURE]: LOAD_FAILURE,

    [NewsfeedConstants.ActionTypes.LOAD_ABOS_REQUEST]: LOAD_ABOS_REQUEST,
    [NewsfeedConstants.ActionTypes.LOAD_ABOS_SUCCESS]: LOAD_ABOS_SUCCESS,
    [NewsfeedConstants.ActionTypes.LOAD_ABOS_FAILURE]: LOAD_ABOS_FAILURE,
    [NewsfeedConstants.ActionTypes.LOAD_ABOS_DESTROY]: LOAD_ABOS_DESTROY,


    [NewsfeedConstants.ActionTypes.RELOAD_REQUEST]: RELOAD_REQUEST,
    [NewsfeedConstants.ActionTypes.RELOAD_SUCCESS]: RELOAD_SUCCESS,
    [NewsfeedConstants.ActionTypes.RELOAD_FAILURE]: RELOAD_FAILURE,

    [NewsfeedConstants.ActionTypes.RELOAD_ABOS_REQUEST]: RELOAD_ABOS_REQUEST,
    [NewsfeedConstants.ActionTypes.RELOAD_ABOS_SUCCESS]: RELOAD_ABOS_SUCCESS,
    [NewsfeedConstants.ActionTypes.RELOAD_ABOS_FAILURE]: RELOAD_ABOS_FAILURE,

    [NewsfeedConstants.ActionTypes.LOAD_TEAM_REQUEST]: LOAD_TEAM_REQUEST,
    [NewsfeedConstants.ActionTypes.LOAD_TEAM_SUCCESS]: LOAD_TEAM_SUCCESS,
    [NewsfeedConstants.ActionTypes.LOAD_TEAM_FAILURE]: LOAD_TEAM_FAILURE,
    [NewsfeedConstants.ActionTypes.LOAD_TEAM_DESTROY]: LOAD_TEAM_DESTROY,
    [NewsfeedConstants.ActionTypes.QUICK_LOAD_TEAM_SUCCESS]: QUICK_LOAD_TEAM_SUCCESS,


}
export default createReducer(initialState, handlers);
