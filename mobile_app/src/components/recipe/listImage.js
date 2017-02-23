import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions,Image,Navigator,TouchableOpacity} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
var Lightbox = require('react-native-lightbox');
var Carousel = require('react-native-looped-carousel');
import PhotoView from 'react-native-photo-view';
var WINDOW_WIDTH = Dimensions.get('window').width;
var BASE_PADDING = 10;

export default class ListImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.renderCarousel = this.renderCarousel.bind(this);
    }

    renderCarousel(images, key) {
        var new_image = [];
        var i = 0;
        for (i = key; i < images.length; i++) {
            new_image.push(images[i]);
        }
        for (i = 0; i < key; i++) {
            new_image.push(images[i]);
        }
        var {height, width} = Dimensions.get('window');
        return (
            <Carousel
                autoplay={false}
                style={{ width: width, height: width }}>
                {new_image.map(function (img, i) {
                   return(
                   <PhotoView
                       source={{ uri: APIRoot+"/images/recipe/"+img.path }}
                       minimumZoomScale={0.5}
                       maximumZoomScale={3}
                       key={i}
                       resizeMode="contain"
                       androidScaleType="center"
                       onLoad={() => console.log("Image loaded!")}
                       style={{width: WINDOW_WIDTH, height: WINDOW_WIDTH}} />
                       )


                }, this)}


            </Carousel>
        );
    }

    render() {
        var {height, width} = Dimensions.get('window');
        var padding = width * 0.06;

        var styles = StyleSheet.create({
            main: {

                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                marginTop: 4,
                paddingTop: 0,
                marginBottom: 15,
                width: width,

            },
            carousel: {
                height: WINDOW_WIDTH - BASE_PADDING * 2,
                width: WINDOW_WIDTH - BASE_PADDING * 2,
                backgroundColor: 'white',
            },
            nbr: {
                fontFamily: 'GuardiLTStd-BlackItalic', fontSize: 13, textAlign: "center"
            }, label: {
                fontFamily: 'OratorStd', fontSize: 11, textAlign: "center"
            },

            pict: {height: width * 0.24, borderRadius: width * 0.24 / 2, width: width * 0.24},
            name: {
                flex: 1,
                marginTop: 15,
                marginBottom: 0,
                textAlign: "left",
                fontFamily: 'GuardiLTStd-BlackItalic',
                fontStyle: "italic",
                fontSize: 13
            },
            basicText: {flex: 1, marginBottom: 5, textAlign: "left", fontFamily: 'Guardi-Roman', fontSize: 11}
        });

        var images = [];
        var to_show_img = null;
        for (var i = 0; i < Object.keys(this.props.list).length; i++) {
            images.push(this.props.list[i])
        }
        var width_block = 90 * ((width / 320));

        return (
            <View style={styles.main}>
                <View style={{width:width-2*padding,backgroundColor:"transparent"}}>
                    <View
                        style={{flex:1,backgroundColor:"transparent",flexDirection:"row"}}>{images.map(function (img, i) {
                        var marginRight = (i + 1 % 3 != 0) ? 7 : 0;
                        return (
                            <Lightbox
                                key={i}
                                style={{width:width_block,height:width_block,marginRight:marginRight,backgroundColor:"transparent",   flex: 1,}}

                                springConfig={{tension: 15, friction: 7}} underlayColor="transparent"
                                swipeToDismiss={false} renderContent={this.renderCarousel.bind(this,images,i)}>
                                <Image resizeMode="contain" source={{uri:APIRoot+"/images/recipe/"+img.path}}
                                       style={{width: null, height:width_block}}/>
                            </Lightbox> )
                    }, this)}</View></View>
            </View>
        );
    }
}