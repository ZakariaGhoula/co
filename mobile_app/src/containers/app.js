import React, { Component } from 'react';

import {AppRegistry,StatusBar, StyleSheet,Text,View,TabBarIOS,AsyncStorage} from 'react-native';
import {Router, routerReducer, Route, Container, Animations, Schema} from 'react-native-redux-router';
import  {NavBar, NavBarModal} from './../components/default/NavBar';
import Start from './../components/Start';
import Login from './../components/Login';
import Subscibe from './../components/subscribe/index';
import NextForm from './../components/nextForm/index';



import FormSubscribe from './../components/FormSubscribe';
import Newsfeed from './../components/newsfeed/Newsfeed';
import Options from './../components/options/Options';
import Moncookout from './../components/moncookout/index';
import UpdateMoncookout from './../components/moncookout/update';
import MyRecipe from './../components/recipe/index';
import RecipeVisitor from './../components/recipe_visitor/index';
import SeasonsProducts from './../components/products/SeasonsProducts';
import AddRecipe from './../components/add/index';
import AddRecipeExist from './../components/addFromExist/index';
import UpdateRecipe from './../components/update/index';
import Followers from './../components/network/Followers';
import Abos from './../components/network/Abos';
import NewSearch from './../components/search/NewSearch';
import IndexNetwork from './../components/network/IndexNetwork';
import FacebookFriends from './../components/network/FacebookFriends';
import IndexSearch from './../components/search/indexSearch';
import ResultSearch from './../components/result_search/index';

import TheCookout from './../components/thecookout/index';


import {requireAuthentification} from './AuthentificatedComponent';


import Storage from 'react-native-storage';


class App extends React.Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
    }

    render() {
        var storage = new Storage({
            // maximum capacity, default_img 1000
            size: 1000,
            storageBackend: AsyncStorage,
            // expire time, default_img 1 day(1000 * 3600 * 24 secs).
            // can be null, which means never expire.
            defaultExpires: null,

            // cache data in the memory. default_img is true.
            enableCache: true,

            // if data was not found in storage or expired,
            // the corresponding sync method will be invoked and return
            // the latest data.
            sync: {
                // we'll talk about the details later.
            }
        });
        //console.log("strore");
        //console.log(storage);
        // !! clear map and remove all key-id data (but keep the key-only data)
        /* storage.remove({
         key: 'loginState'
         });*/
        global.storage = storage;


        return (
            <View style={{flex:1}}>

                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#f6f7f9'}}/>
                <Router>
                    <Schema name="default" sceneConfig={Animations.FlatFloatFromRight}/>
                    <Schema name="pop" sceneConfig={Animations.FlatFloatFromLeft}/>
                    <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom}/>
                    <Schema name="withoutAnimation"/>


                    <Route name="start" component={Start} initial={true} type="replace" hideNavBar={true}
                           title="Start"/>
                    <Route name="login" component={Login} initial={false} type="replace" hideNavBar={true}
                           title="Connexion"/>
                    <Route name="subsrcibe" component={Subscibe} initial={false} type="replace" hideNavBar={true}
                           title="Connexion"/>
                    <Route name="nextForm" component={requireAuthentification(NextForm)} initial={false} type="replace"
                           hideNavBar={true} title="Connexion"/>
                    <Route name="moncookout" component={requireAuthentification(Moncookout)} initial={false}
                           type="replace" hideNavBar={true} title="moncookout"/>

                    <Route name="updateMoncookout" component={requireAuthentification(UpdateMoncookout)} initial={false}
                           type="replace" hideNavBar={true} title="moncookout"/>
                    <Route name="myrecipe" component={requireAuthentification(MyRecipe)} initial={false}
                           schema="default" hideNavBar={true} title="myrecipe"/>
                    <Route name="addnewrecipe" component={requireAuthentification(AddRecipe)} initial={false}
                           schema="default" type="replace" hideNavBar={true} title="addnewrecipe"/>

                    <Route name="addexistrecepie" component={requireAuthentification(AddRecipeExist)} initial={false}
                           schema="default" type="replace" hideNavBar={true} title="addexistrecipe"/>

                    <Route name="updaterecepie" component={requireAuthentification(UpdateRecipe)} initial={false}
                           schema="default" type="replace" hideNavBar={true} title="updaterecepie"/>
                    <Route name="followers" component={requireAuthentification(Followers)} initial={false}
                           schema="default" hideNavBar={true} title="Followers"/>

                    <Route name="newsearch" component={requireAuthentification(NewSearch)} initial={false}
                           schema="default" hideNavBar={true} title="NewSearch"/>

                    <Route name="indexNetwork" component={requireAuthentification(IndexNetwork)} initial={false}
                           schema="default" hideNavBar={true} title="IndexNetwork"/>
                    <Route name="facebookFriends" component={requireAuthentification(FacebookFriends)} initial={false}
                           schema="default" hideNavBar={true} title="FacebookFriends"/>
                    <Route name="indexSearch" component={requireAuthentification(IndexSearch)} initial={false}
                           schema="default" hideNavBar={true} title="IndexSearch"/>
                    <Route name="abos" component={requireAuthentification(Abos)} initial={false} schema="default"
                           hideNavBar={true} title="Abos"/>

                    <Route name="thecookout" component={requireAuthentification(TheCookout)} initial={false}
                           schema="default" hideNavBar={true} title="TheCookout"/>
                    <Route name="recipe_visitor" component={requireAuthentification(RecipeVisitor)} initial={false}
                           schema="default" hideNavBar={true} title="recipe_visitor"/>
                    <Route name="options" type="replace" component={requireAuthentification(Options)}   initial={false}
                           hideNavBar={false} title="Mon compte" schema="default"/>

                    <Route name="newsfeed" type="replace" component={requireAuthentification(Newsfeed)} initial={false}
                           schema="withoutAnimation"
                           hideNavBar={false} title="Cook Out"/>

                    <Route name="resultsearch" type="replace" component={requireAuthentification(ResultSearch)} initial={false}
                           schema="withoutAnimation"
                           hideNavBar={false} title="Cook Out"/>
                    <Route name="seasonproducts" type="replace" component={requireAuthentification(SeasonsProducts)}
                           initial={false}
                           hideNavBar={false} title="Les produits de saison" schema="withoutAnimation"/>
                </Router>

            </View>
        )
    }
}


export default App