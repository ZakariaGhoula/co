import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight,Dimensions,AlertIOS} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-redux-router';

export default class ProfileExternalRecipesItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handlePress = this.handlePress.bind(this);

    }

    handlePress(id) {
        if (!this.props.access) {
            AlertIOS.alert("Désolé, vous n'avez pas accès à cette recette");
        }//Actions.myrecipe({id_recipe: id});
        else {
            Actions.recipeext({
                id_recipe: this.props.recipe.id_recipe,
                id_user_external: this.props.id_user_external,
                textSearch: this.props.textSearch,
                title_recipe: this.props.title_recipe,
                recipe: this.props.recipe});
        }
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
                flexDirection: (!this.props.public) ? 'column' : 'row',
                flex: 1,
                marginLeft: 0,
                height: 60,
                alignItems: (this.props.public) ? 'center' : 'stretch',
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
            },

            NextView: {
                height: 60,
                borderBottomWidth: 1,
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
                  color="#000"/>;
        var profilePicture = null;
        if (this.props.recipe != null && typeof this.props.recipe.img !== "undefined" && this.props.recipe.img != null && typeof this.props.recipe.img[0] !== "undefined" && this.props.recipe.img[0].base_64 != "") {

            profilePicture = <Image source={{uri: this.props.recipe.img[0].base_64}} style={{width: 40,height:40}}/>

        }
        else {
            profilePicture = <Image source={require('./../../../img/placeholder/placeholder-green.jpg')}
                                    style={{flex:1,width: 40,height:40}}/>
        }

        var img = null;

        return (
            <View style={{flex:1}}>

                <TouchableHighlight style={styles.link}  underlayColor='#fff'
                                    onPress={this.handlePress.bind(this,this.props.recipe.id_recipe)}>
                    <View style={styles.linkView}>
                        <View style={{marginRight:15}}>
                            {profilePicture}
                        </View>
                        <View style={styles.TextView}>
                            <View style={{flex:1,marginTop:(!this.props.public) ?10:0}}>
                                <Text style={styles.text}>{this.props.recipe.title}</Text></View>
                            {(this.props.private || this.props.semiprivate) ?
                                (<View style={{flex:1}}>
                                    <Text
                                        style={{fontStyle:'italic',fontSize:11}}>{(this.props.private ? "Privé" : "Accessible par les membres de son réséaux").trim()}</Text></View>) : null}

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