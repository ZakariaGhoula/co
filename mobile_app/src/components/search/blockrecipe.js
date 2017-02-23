import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import {Actions} from 'react-native-redux-router';
export default class BlockRecipe extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        var {height, width} = Dimensions.get('window');

        var padding = ((width * 0.06) );
        var recipe = (this.props.recipe);
        var user = this.props.user;

        var image = null;
        if (typeof recipe.img[0] !== "undefined") {
            image =  APIRoot+"/images/recipe/"+recipe.img[0].path;
        }
        else {
            image = null;
        }

        var height_image = width * (121 / 320);
        var styles = StyleSheet.create({
            main: {
                alignItems: "center",
                width: width,
                height: height_image, backgroundColor:"transparent",
                justifyContent: "center"
            },
            image_css: {
                height: height_image,
                width: width,
                backgroundColor:"transparent",
                flex: 1,
                marginBottom: (3 + ((3 + width) / 320))
            },
            placeholder: {
                height: 87 * (height_image / 121),
                width: 252 * (width / 320),
                backgroundColor: "#efc396",
                opacity: 0.9,
                alignItems: "center",
                justifyContent: "center"

            }, title: {
                marginBottom:6,
                color: "#000",
                textAlign:"center",
                fontSize:14,
                paddingLeft:5,
                paddingRight:5,
                fontFamily: 'Guardi-Roman',
            }, created: {
                marginBottom:6,
                color: "#000",

                fontSize:13,
                fontFamily: 'Guardi-Roman',
            },By: {
                marginTop:4,
                color: "#000",

                fontSize:13,
                fontFamily: 'GuardiLTStd-BlackItalic',
            }

        });

        var name = "";

        if(typeof recipe.owner.id_user ==="undefined"){
         name=this.props.user.first_name +" "+ this.props.user.last_name.toUpperCase().substr(0,1)+"."
        }
        else{
            name=recipe.owner.first_name +" "+ recipe.owner.last_name.toUpperCase().substr(0,1)+"."
        }
        var bloc = null;
        if (image == null) {
            bloc = <Image source={require('image!./../../img/moncookout/bloc.png')} style={styles.image_css}>
                <TouchableHighlight style={styles.main}  onPress={()=>Actions.myrecipe({"recipe":recipe})} underlayColor='transparent'>
                    <View style={styles.placeholder}>
                        <Text style={styles.title}>{recipe.title}</Text>
                        <View style={{       flexDirection: 'row'}}><Text style={styles.created}>créée par </Text><View><Text style={styles.By}>{ name}</Text></View></View>
                    </View>
                </TouchableHighlight>
            </Image>
        }
        else {
            bloc = <Image source={{uri:image}} style={styles.image_css}>
                <TouchableHighlight style={styles.main}   onPress={()=>Actions.myrecipe({"recipe":recipe})}  underlayColor='transparent'>
                    <View style={styles.placeholder}>
                        <Text style={styles.title}>{recipe.title}</Text>
                        <View style={{       flexDirection: 'row'}}><Text style={styles.created}>créée par </Text><View><Text style={styles.By}>{name}</Text></View></View>

                    </View>
                </TouchableHighlight>
            </Image>
        }
        return (<View>
                {bloc}
            </View>
        );
    }
}

