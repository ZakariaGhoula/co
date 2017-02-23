import {createReducer} from './../utils/index';
import { LoadingConstants } from './../constants/LoadingConstant';

const initialState = {
    shown:false
};


function SHOW_LOADING(state, action) {
    return Object.assign({}, state, {
        'shown': true,

    });
}
function HIDE_LOADING(state, action) {
    return Object.assign({}, state, {
        'shown': false
    });
}

const handlers =
{
    [LoadingConstants.ActionTypes.SHOW_LOADING]: SHOW_LOADING,
    [LoadingConstants.ActionTypes.HIDE_LOADING]: HIDE_LOADING

}
export default createReducer(initialState, handlers);