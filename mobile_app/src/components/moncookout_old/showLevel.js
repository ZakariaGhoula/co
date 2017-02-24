import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
export default class ShowLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}


    }


    render() {
        var {height, width} = Dimensions.get('window');

        var styles = StyleSheet.create({
            main: {
                flex: 0.6,
                alignItems:"center",
                backgroundColor: "transparent",
                paddingTop:15,
               marginLeft:10
            },
            pict: {height: width * 0.15, borderRadius: width * 0.15 / 2, width: width * 0.15},
            name: {
                flex: 1,
                marginTop: 15,
                marginBottom: 0,
                textAlign: "left",
                fontFamily: 'GuardiLTStd-BlackItalic',
                backgroundColor: "transparent",
                fontStyle: "italic",
                fontSize: 11 * (width / 320)
            },
            basicText: {
                flex: 1,
                marginBottom: 5,
                textAlign: "left",
                fontFamily: 'Guardi-Roman',
                fontStyle: "italic",
                fontSize: 9 * (width / 320)
            }
        });
        var knifePicture = null;

        var nbr_recipes = Object.keys(this.props.my_recipes).length;
        if(nbr_recipes==0)
        knifePicture = <Image
            source={require('image!./../../img/moncookout/knife/couteaux_0.png')}/>;

        if(nbr_recipes>=1 && nbr_recipes<5)
            knifePicture = <Image resizeMode={"contain"}
                source={require('image!./../../img/moncookout/knife/couteaux_1.png')}/>;
        if(nbr_recipes>=5 && nbr_recipes<15)
            knifePicture = <Image resizeMode={"contain"}
                source={require('image!./../../img/moncookout/knife/couteaux_2.png')}/>;
        if(nbr_recipes>=15 && nbr_recipes<30)
            knifePicture = <Image resizeMode={"contain"}
                source={require('image!./../../img/moncookout/knife/couteaux_3.png')}/>;
        if(nbr_recipes>=30 && nbr_recipes<50)
            knifePicture = <Image resizeMode={"contain"}
                source={require('image!./../../img/moncookout/knife/couteaux_4.png')}/>;
        if(nbr_recipes>=50 )
            knifePicture = <Image resizeMode={"contain"}
                source={require('image!./../../img/moncookout/knife/couteaux_5.png')}/>;
        return (
            <View style={styles.main}>
                {knifePicture}

            </View>
        );
    }
}