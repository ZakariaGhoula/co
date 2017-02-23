import {showLoading,hideloading} from './../actions/LoadingActions';
const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE']

export default function loadingBarMiddleware(config = {}) {
    const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes

    return ({ dispatch }) => next => action => {
        if (action.type) {
            const [REQUEST, SUCCESS, FAILURE] = promiseTypeSuffixes

            const isPending = new RegExp(`${REQUEST}$`, 'g')
            const isFulfilled = new RegExp(`${SUCCESS}$`, 'g')
            const isRejected = new RegExp(`${FAILURE}$`, 'g')

            if (action.type.match(isPending)) {
                dispatch(showLoading())
            } else if (action.type.match(isFulfilled) ||
                action.type.match(isRejected)) {
                dispatch(hideloading())
            }
        }

        return next(action)
    }
}