import { createStore, compose,applyMiddleware, combineReducers } from 'redux';

import promiseMiddleware  from './../lib/promiseMiddleware';
import {routerReducer} from 'react-native-redux-router';
import { default as loading} from './../reducers/LoadingReducer';
import { default as session} from './../reducers/SessionReducer';
import { default as config} from './../reducers/ConfigReducer';
import { default as recipe} from './../reducers/RecipeReducer';
import { default as products} from './../reducers/ProductsReducer';
import { default as searchs} from './../reducers/SearchReducer';
import { default as visitor} from './../reducers/VisitorReducer';
import { default as newsfeed} from './../reducers/NewsfeedReducer';
import { default as tags} from './../reducers/TagsReducer';
import loadingMiddleware  from './../lib/loadingMiddleware'
import createLogger from 'redux-logger';
export default function configureStore(initialState) {

    let createStoreWithMiddleware;
    const logger = createLogger();
    const reducer = combineReducers({  // can be mounted as any property. Later you can use this prop to access state slices in mapStateToProps
        session,
        config,
        recipe,
        products,
        visitor,
        searchs,
        newsfeed,
        loading,
        tags,
        routerReducer

    });

    const middleware = applyMiddleware(promiseMiddleware,loadingMiddleware(),logger);
    createStoreWithMiddleware = compose(middleware);
    const store = createStoreWithMiddleware(createStore)(reducer, initialState);
    return store;


}