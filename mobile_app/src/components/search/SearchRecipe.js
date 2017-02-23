import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight,Dimensions} from 'react-native';

import {APIRoot} from '../../constants/config_path';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-redux-router';

export default class SearchRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.onPress = this.onPress.bind(this);


    }

    onPress(id_recipe) {
        Actions.recipeextsearch({id_recipe: id_recipe, textSearch: this.props.textSearch})
    }

    render() {

        var styles = StyleSheet.create({
            link: {
                flex: 1,
                height: 60,
                paddingLeft: 15,

                marginBottom: 0,
                backgroundColor: '#fff',
                borderColor: '#c7c7c7',
                borderTopWidth: 0,
                borderBottomWidth: 0
            },
            linkView: {
                flexDirection: 'row',
                flex: 1,
                height: 60,
                alignItems: 'center',
            },
            TextView: {
                flexDirection: 'column',
                flex: 1,
                marginLeft: 0,
                height: 60,
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
            },

            NextView: {
                height: 60,
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: 15,
            },
            text: {
                color: '#3a4750',

            }
        });

        /*var icon_menu = (this.props.icon && this.props.icon != null && this.props.icon != "") ? (
         <View style={{marginRight:15}}><Icon name={this.props.icon} size={26} marginLeft={10} marginLeft={30}
         color="#398797"/></View>) : null;*/
        var next =
            <Icon name="ios-arrow-forward" size={24}
                  marginLeft={10}
                  color="#398797"/>;
        var profilePicture = null;
        if (this.props.recipe != null && typeof this.props.recipe.path !== "undefined" && this.props.recipe.path != null && this.props.recipe.path != "") {

            profilePicture =
                <Image source={{uri:APIRoot+"/images/recipe/"+this.props.recipe.path }} style={{width: 40,height:40}}/>

        }
        else {
            profilePicture = <Image source={require('./../../../img/placeholder/placeholder-green.jpg')}
                                    style={{flex:1,width: 40,height:40}}/>
        }

        var img = null;

        return (
            <View style={{flex:1}}>
                <TouchableHighlight style={styles.link}  underlayColor='#fff'
                                    onPress={this.onPress.bind(this,this.props.recipe.id_recipe)}>

                    <View style={styles.linkView}>
                        <View style={{marginRight:15}}>
                            {profilePicture}
                        </View>
                        <View style={styles.TextView}>
                            <View style={{flex:1,marginTop:10}}><Text
                                style={{ fontSize:14}}>{this.props.recipe.title}</Text></View>
                            <View style={{flex:1}}><Text
                                style={{ fontSize:11}}>Par {this.props.recipe.first_name}</Text></View>
                        </View>
                        <View style={styles.NextView}>
                            {next}
                        </View>
                    </View>
                </TouchableHighlight>


            </View>
        );
    }
}