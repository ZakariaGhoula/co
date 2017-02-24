import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,Dimensions} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import GiftedSpinner from 'react-native-gifted-spinner';
export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}


    }




    render() {

        var Dimensions = require('Dimensions');
        var w = Dimensions.get('window');
        var tab_W = w.width / 5;
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0.5,
                backgroundColor: 'black',
                width: w.width,
                height:w.height,
                zIndex:100,
                justifyContent:"center",
                alignItems:'center'
            },
            spinner: {
                marginBottom: 50
            },
        });


        return (

            <View style={styles.bg}>
                <GiftedSpinner size={"large"}/>
            </View>


        )
    }
}