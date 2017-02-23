import React, { Component } from 'react';
import {Animated,Text,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import {Actions} from 'react-native-redux-router';
import {CachedImage} from "react-native-img-cache";

export default class BlockSlider extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            loadImg: true,
            thumbnailOpacity: new Animated.Value(0),
            thumbnailMain: new Animated.Value(1)
        }
        this.onLoad = this.onLoad.bind(this);
        this.onTHumbnailLoad = this.onTHumbnailLoad.bind(this);

    }

    onLoad() {
        Animated.timing(this.state.thumbnailMain, {
            toValue: 0,
            duration: 250
        }).start();
    }

    onTHumbnailLoad() {
        Animated.timing(this.state.thumbnailOpacity, {
            toValue: 1,
            duration: 250
        }).start();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.thumbnailOpacity !== nextState.thumbnailOpacity
        || this.state.thumbnailMain !== nextState.thumbnailMain)
    }


    render() {
        var {height, width} = Dimensions.get('window');

        var padding = ((width * 0.06) );
        var recipe = (this.props.recipe);
        var user = this.props.user;

        var image = null;
        var image_blur = null;
        if (typeof recipe !== "undefined" && recipe != null && typeof recipe.img !== "undefined" && typeof recipe.img[0] !== "undefined"
        ) {

            image = APIRoot + "/images/recipe/" + recipe.img[0].path;
            image_blur = APIRoot + "/images/recipe/blur/" + recipe.img[0].path;

        }
        else {
            image = null;
        }

        var height_image = width * (175 / 320);
        var styles = StyleSheet.create({
            main: {
                alignItems: "center",
                width: width,
                height: height_image,
                justifyContent: "center"
            },
            image_css: {
                height: height_image,
                width: width,

                flex: 1,
                marginBottom: (3 + ((3 + width) / 320))
            },
            placeholder: {
                height: height_image,
                width: width,
                backgroundColor: 'rgba(0,0,0,0.25)',

                alignItems: "center",
                justifyContent: "center"

            }, daily: {
                marginBottom: 1,
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 12,
                fontFamily: 'OratorStd',
            }, title: {
                marginBottom: 4,
                color: "#fff",
                textAlign: "center",
                fontSize: 15,
                fontFamily: 'Guardi-Roman',
            }, created: {
                marginBottom: 6,
                color: "#fff",

                fontSize: 11,
                fontFamily: 'Guardi-Roman',
            }, By: {
                marginTop: 4,
                color: "#fff",

                fontSize: 11,
                fontFamily: 'GuardiLTStd-BlackItalic',
            }

        });
        var bloc = null;

        var name = "";
        if (this.props.recipe != null && typeof this.props.recipe.user !== "undefined" && this.props.recipe.user != null) {
            name = this.props.recipe.user.first_name + " " + this.props.recipe.user.last_name.toUpperCase().substr(0, 1) + "."
        }
        var is_mine = false;
        if (this.props.recipe != null && typeof this.props.recipe.user !== "undefined" && this.props.recipe.user != null) {
            if (this.props.user.id == recipe.user.id_user) {
                is_mine = true;
            }
        }

        var post_by = null;

        if (recipe.user.id_user == 58) {
            post_by = <View style={{       flexDirection: 'row'}}><Text style={styles.created}>postée
                par </Text><View><Text style={styles.By}>l'équipe Cookout</Text></View></View>;
        }
        else {
            post_by = <View style={{       flexDirection: 'row'}}><Text style={styles.created}>postée
                par </Text><View><Text style={styles.By}>{ name}</Text></View><Text
                style={styles.created}>de
                l'équipe Cookout</Text></View>;
        }
        if (image == null) {
            bloc = <Image source={require('image!./../../img/moncookout/bloc.png')} style={styles.image_css}>
                <TouchableHighlight style={styles.main}
                                    onPress={()=>(is_mine)?Actions.myrecipe({"recipe":recipe}):Actions.recipe_visitor({"recipe":recipe})}
                                    underlayColor='transparent'>
                    <View style={styles.placeholder}>
                        <Text style={styles.daily}>Recette du jour</Text>
                        <Text style={styles.title}>{recipe.title}</Text>

                        {post_by}
                    </View>
                </TouchableHighlight>
            </Image>
        }
        else {
            bloc =

                <View style={{position:"relative"}}>
                    <CachedImage
                        source={{uri:image}} style={[{zIndex:2,position:"absolute"},styles.image_css]}>

                        <TouchableHighlight style={styles.main}
                                            onPress={()=>(is_mine)?Actions.myrecipe({"recipe":recipe}):Actions.recipe_visitor({"recipe":recipe})}
                                            underlayColor='transparent'>
                            <View style={styles.placeholder}>
                                <Text style={styles.daily}>Recette du jour</Text>
                                <Text style={styles.title}>{recipe.title}</Text>

                                {post_by}

                            </View>
                        </TouchableHighlight>
                    </CachedImage>

                </View>;
        }

        return (<View>
                {bloc}
            </View>
        );
    }
}