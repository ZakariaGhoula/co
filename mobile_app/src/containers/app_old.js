import React, { Component } from 'react';

import {AppRegistry, StyleSheet,Text,View,TabBarIOS} from 'react-native';
import {Router, routerReducer, Route, Container, Animations, Schema} from 'react-native-redux-router';
import  {NavBar, NavBarModal} from './../components/default/NavBar';
import Start from './../components/Start';
import Login from './../components/Login';
import Subscribe from './../components/Subscribe';
import FormSubscribe from './../components/FormSubscribe';
import Newsfeed from './../components/newsfeed/Newsfeed';
import Search from './../components/search/Search';
import Menu from './../components/default/Menu';
import Options from './../components/options/Options';
import MyProfile from '../components/profile/MyProfile';
import ProfileExternal from '../components/profile/ProfileExternal';
import ProfileExternalRecipes from '../components/profile/ProfileExternalRecipes';
import CustomProfile from '../components/profile/CustomProfile';
import UpdateAbout from '../components/profile/UpdateAbout';
import AddRecipe from '../components/recipe/AddRecipe';
import UpdateRecipe from '../components/recipe/UpdateRecipe';
import MyRecipes from '../components/recipe/MyRecipes';
import MyOffRecipes from '../components/recipe/MyOffRecipes';
import AddExtRecipe from '../components/recipe/AddExtRecipe';
import MyRecipe from '../components/recipe/MyRecipe';
import MyOffRecipe from '../components/recipe/MyOffRecipe';
import RecipeExt from '../components/recipe/RecipeExt';
import NetworkRecipeExt from '../components/recipe/NetworkRecipeExt';
import RecipeExtSearch from '../components/recipe/RecipeExtSearch';
import SeasonsProducts from '../components/products/SeasonsProducts';
import SettingsMenu from '../components/settings/SettingsMenu';
import UpdateNotification from '../components/settings/UpdateNotification';
import UpdatePassword from '../components/settings/UpdatePassword';
import MyNetwork from '../components/network/MyNetwork';
import NetworkProfileExternal from '../components/network/NetworkProfileExternal';
import NetworkProfileExternalRecipes from '../components/network/NetworkProfileExternalRecipes';
import NewsfeedRecipeExt from '../components/recipe/NewsfeedRecipeExt';
import NewsfeedRecipeExtFromList from '../components/recipe/NewsfeedRecipeExtFromList';

import NewsfeedProfileExternal from '../components/newsfeed/NewsfeedProfileExternal';
import NewsfeedProfileExternalRecipes from '../components/newsfeed/NewsfeedProfileExternalRecipes';

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


                    <Route name="start" component={Start} initial={true} type="replace" hideNavBar={true} title="Start"/>
                    <Route name="login" component={Login} initial={false} type="replace" hideNavBar={true} title="Connexion"/>
                    <Route name="subscribe" component={Subscribe} initial={false} hideNavBar={false} title=""/>
                    <Route name="formSubscribe" component={FormSubscribe} initial={false} hideNavBar={false} title=""/>
                    <Route name="options" type="replace" component={requireAuthentification(Options)} initial={false}
                           hideNavBar={false} title="Mon compte" schema="modal"/>

                    <Route name="newsfeed"  type="replace" component={requireAuthentification(Newsfeed)} initial={false}
                           schema="withoutAnimation"
                           hideNavBar={false} title="Cook Out"/>

                    <Route name="menu" component={requireAuthentification(Menu)} initial={false}
                           hideNavBar={false} title="Mon compte" schema="modal"/>


                    <Route name="customprofile" component={requireAuthentification(CustomProfile)} initial={false}
                           hideNavBar={false} title="Modifier mon profil" schema="withoutAnimation"/>

                    <Route name="updateabout" component={requireAuthentification(UpdateAbout)} initial={false}
                           hideNavBar={false} title="À propos" schema="withoutAnimation"/>


                    <Route name="addrecipe" component={requireAuthentification(AddRecipe)} initial={false}
                           hideNavBar={false} title="Ajouter une recette" schema="withoutAnimation"/>

                    <Route name="updaterecipe" component={requireAuthentification(UpdateRecipe)} initial={false}
                           hideNavBar={false} title="Modifier ma recette" schema="withoutAnimation"/>

                    <Route name="addextrecipe" component={requireAuthentification(AddExtRecipe)} initial={false}
                           hideNavBar={false} title="Ajouter une recette" schema="withoutAnimation"/>


                    <Route name="myrecipes" component={requireAuthentification(MyRecipes)} initial={false}
                           hideNavBar={false} title="Mon Cookbook" schema="withoutAnimation"/>

                    <Route name="myoffrecipes" component={(MyOffRecipes)} initial={false}
                           hideNavBar={false} title="Mon Cookbook" schema="withoutAnimation"/>

                    <Route name="myoffrecipe" component={(MyOffRecipe)} initial={false}
                           hideNavBar={false} title="Ma recette" schema="withoutAnimation"/>
                    <Route name="myprofile" component={requireAuthentification(MyProfile)} initial={false}
                           hideNavBar={false} title="Mon profil" schema="withoutAnimation"/>


                    <Route name="profileext" component={requireAuthentification(ProfileExternal)} initial={false}
                           hideNavBar={false} title="Profil" schema="withoutAnimation"/>

                    <Route name="profileExternalRecipes" component={requireAuthentification(ProfileExternalRecipes)}
                           initial={false}
                           hideNavBar={false} title="Profil" schema="withoutAnimation"/>

                    <Route name="myrecipesback" component={requireAuthentification(MyRecipes)} initial={false}
                           hideNavBar={false} title="Mes recettes" schema="withoutAnimation"/>

                    <Route name="myrecipe" component={requireAuthentification(MyRecipe)} initial={false}
                           hideNavBar={false} title="Ma recette" schema="withoutAnimation"/>


                    <Route name="recipeext" component={requireAuthentification(RecipeExt)} initial={false}
                           hideNavBar={false} title="Recette" schema="withoutAnimation"/>

                    <Route name="recipeextsearch" component={requireAuthentification(RecipeExtSearch)} initial={false}
                           hideNavBar={false} title="Recette" schema="withoutAnimation"/>

                    <Route name="seasonproducts" type="replace" component={requireAuthentification(SeasonsProducts)} initial={false}
                           hideNavBar={false} title="Les produits de saison" schema="withoutAnimation"/>

                    <Route name="settingmenu" component={requireAuthentification(SettingsMenu)} initial={false}
                           hideNavBar={false} title="Paramètres" schema="withoutAnimation"/>
                    <Route name="notification" component={requireAuthentification(UpdateNotification)} initial={false}
                           hideNavBar={false} title="Notifications" schema="withoutAnimation"/>

                    <Route name="settingpassword" component={requireAuthentification(UpdatePassword)} initial={false}
                           hideNavBar={false} title="Mot de passe" schema="withoutAnimation"/>
                    <Route name="search" component={requireAuthentification(Search)} initial={false}
                           hideNavBar={false} title="Recherche" schema="withoutAnimation"/>

                    <Route name="mynetwork" component={requireAuthentification(MyNetwork)} initial={false}
                           hideNavBar={false} title="Mon réseau" schema="withoutAnimation"/>

                    <Route name="networkprofileexternal" component={requireAuthentification(NetworkProfileExternal)}
                           initial={false}
                           hideNavBar={false} title="Profil" schema="withoutAnimation"/>


                    <Route name="networkprofileexternalrecipes"
                           component={requireAuthentification(NetworkProfileExternalRecipes)} initial={false}
                           hideNavBar={false} title="Profil" schema="withoutAnimation"/>

                    <Route name="networkrecipeext" component={requireAuthentification(NetworkRecipeExt)} initial={false}
                           hideNavBar={false} title="Recette" schema="withoutAnimation"/>


                    <Route name="newsfeedrecipeextfromlist"
                           component={requireAuthentification(NewsfeedRecipeExtFromList)} initial={false}
                           hideNavBar={false} title="Recette" schema="withoutAnimation"/>

                    <Route name="newsfeedrecipeext" component={requireAuthentification(NewsfeedRecipeExt)}
                           initial={false}
                           hideNavBar={false} title="Recette" schema="withoutAnimation"/>

                    <Route name="newsfeedprofileexternal" component={requireAuthentification(NewsfeedProfileExternal)}
                           initial={false}
                           hideNavBar={false} title="Profil" schema="withoutAnimation"/>


                    <Route name="newsfeedprofileexternalrecipes"
                           component={requireAuthentification(NewsfeedProfileExternalRecipes)} initial={false}
                           hideNavBar={false} title="Recettes" schema="withoutAnimation"/>


                </Router>

            </View>
        )
    }
}


export default App