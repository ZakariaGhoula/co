import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions,Image,AlertIOS} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import Search from './search';
import BlockRecipe from './blockrecipe';

import Swipeout from 'react-native-swipeout';
export default class MyRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list_default_recipe: [],

        }

        this.updateRecipe = this.updateRecipe.bind(this);
        this.udpateList = this.udpateList.bind(this);
        this.deleteRecepie = this.deleteRecepie.bind(this);
    }

    componentDidMount() {

        this.updateRecipe(this.props.my_recipes)
    }

    shouldComponentUpdate(nexProps, nextState) {
        return (nexProps.user !== this.props.user
        || this.props.my_recipes !== nexProps.my_recipes
        || this.state.list_default_recipe !== nextState.list_default_recipe)
    }

    componentWillUpdate(nexProps, nextStatte) {
        if (this.props.my_recipes !== nexProps.my_recipes) {
            this.updateRecipe(nexProps.my_recipes)
        }
    }


    udpateList(id) {
        this.props.delete_recipe(id);


    }

    deleteRecepie(id) {

        if (typeof id !== "undefined") {
            AlertIOS.prompt(
                'Supprimer la recette',
                'Êtes-vous sûr ?',
                [
                    {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Oui', onPress: () => this.udpateList(id)}
                ],
                null,
                'default'
            );
        }

    }


    updateRecipe(recipes) {
        var array_recipes = [];


        for (var i in recipes) {
            array_recipes.push(recipes[i]);
        }

        this.setState({list_default_recipe: array_recipes});


    }

    render() {
        var {height, width} = Dimensions.get('window');

        var padding = ((width * 0.06) );
        var nbr_recipes = Object.keys(this.state.list_default_recipe).length;

        var recipes = (this.props.my_recipes);

        var user = this.props.user;
        var height_image = width * (121 / 320);

        var styles = StyleSheet.create({
            main: {

                flex: 1,
                marginTop: 15,
                paddingTop: 10,
                marginBottom: 22,
                paddingBottom: 42,
            },
            no_recipe_view: {
                flex: 1,
                paddingTop: 15,
                paddingBottom: 15,
                backgroundColor: "transparent"
            }, no_recipe_text: {
                textAlign: "center",
                fontFamily: 'OratorStd',
                fontSize: 13,
                backgroundColor: "transparent"
            }

        });
        let swipeBtns = [{
            text: 'Supprimer',
            backgroundColor: 'red',
            onPress: () => {
                alert(('ok'));
            }
        }];
        var list_to_show = null;
        if (nbr_recipes == 0 && Object.keys(recipes).length == 0) {
            list_to_show = (<View style={styles.main}><View style={styles.no_recipe_view}>
                <Text style={styles.no_recipe_text}>Aucune recette pour le moment.</Text>
            </View></View>);
        }
        else if (nbr_recipes == 0 && Object.keys(recipes).length > 0) {
            list_to_show = (<View style={styles.main}><View style={styles.no_recipe_view}>
                <Text style={styles.no_recipe_text}>Recette introuvable.</Text>
            </View></View>);
        }
        else {
            list_to_show = <View style={{flex:1}}>
                {this.state.list_default_recipe.map(function (recipe, index) {

                    return ( <Swipeout style={{height:( (height_image )),marginBottom: 7}} right={[{
            text: 'X \nSupprimer',
            backgroundColor: '#a91d31',
            style: {fontFamily: 'OratorStd',height:(84 * (height_image / 121)),   },
            underlayColor: 'transparent',
            onPress: ()=>this.deleteRecepie(recipe.id_recipe) }
            ]}
                                       autoClose={true}
                                       key={index}
                                       backgroundColor='transparent'><BlockRecipe key={index} user={user}
                                                                                  recipe={recipe}/></Swipeout>)
                }, this)}
            </View>;

        }

        return (
            <View style={styles.main}>
                <View style={{  paddingLeft:padding,  paddingRight:padding,flex:1}}>
                    <Search updateRecipe={this.updateRecipe.bind(this)} recipes={this.props.my_recipes}/>
                </View>
                {list_to_show}
            </View>
        );
    }
}