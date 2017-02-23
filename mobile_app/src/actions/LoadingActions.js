import { checkHttpStatus, parseJSON } from './../utils/index';
import { LoadingConstants } from './../constants/LoadingConstant';


export function showLoading() {
    return {
        type: LoadingConstants.ActionTypes.SHOW_LOADING

    }
}
export function hideloading() {
    return {
        type: LoadingConstants.ActionTypes.HIDE_LOADING

    }
}
