import React, { Component } from 'react';
import {Text,Animated,View,ScrollView,StyleSheet,ActivityIndicator,TouchableHighlight,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";

import {CachedImage} from "react-native-img-cache";
export default class ShowBasics extends React.Component {
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

        var styles = StyleSheet.create({
            main:{
                flex:1,
                backgroundColor:"transparent",
                alignItems:"center",

            },
            pict:{flexDirection:"row",height: width*0.20,  borderRadius: width*0.20/2, width: width*0.20 },
            name:{flex:1,marginTop:15,marginBottom:0,textAlign:"left",  fontFamily: 'GuardiLTStd-BlackItalic', backgroundColor:"transparent",fontStyle:"italic",fontSize: 11*(width/320)},
            basicText:{flex:1,marginBottom:5,textAlign:"left",  fontFamily: 'Guardi-Roman', fontStyle:"italic",fontSize: 9*(width/320)}
        });
        var profilePicture =null;
        var list_to_show = null;
        if (this.props.user != null && this.props.user.media != null && this.props.user.media.profile_pi != "") {


            var profilePicture = <View style={[{position:"relative"},styles.pict]}><CachedImage

                source={{uri:APIRoot+"/images/users/"+this.props.user.media.profile_pi}}
                style={[ styles.pict]}/>
                 </View>

        }
        else if (this.props.user != null && this.props.user.media != null && this.props.user.media.profile_pi == "") {
            if( this.props.user.gender!=null &&  this.props.user.gender=="female"){
                var profilePicture =  <Image source={require('./../../../img/default_img/placeholder-women.png')}
                                             style={styles.pict}/>;
            }
            else{
                profilePicture = <Image source={require('./../../../img/default_img/placeholder-men.png')}
                                        style={styles.pict}/>;
            }
        }

        var name=null;
        if (this.props.user != null){
            name =<Text style={styles.name}>{this.props.user.first_name +" "+this.props.user.last_name.toUpperCase().substr(0,1)+"."}</Text>
        }
        var sexe = null;
        if (this.props.user != null && this.props.user.gender != "" && this.props.user.gender != null){
            sexe = <Text style={styles.basicText}>{(this.props.user.gender.trim() == "female") ? "Femme" : "Homme"}  </Text>;
        }
        var age = null;
        if (this.props.user != null && this.props.user.range_age != "" && this.props.user.range_age != null){
            age = <Text style={styles.basicText}>{(this.props.user.range_age.trim())+" ans"}  </Text>;
        }

        var level =null;
        if (this.props.user != null && this.props.user.level != "" && this.props.user.level != null){
            var l = this.props.user.level;
            var new_level = _.filter(OPTIONS_LEVEL, function (el) {
                return (parseInt(el["value"]) == this.props.user.level);
            },this);
            level = typeof new_level[0] !== "undefined" ? <Text style={[styles.basicText,{ marginBottom: 7}]}>{(new_level[0].label)}  </Text> : null;
        }


            return (
            <View  style={styles.main}>
                {profilePicture}
                <View style={{paddingLeft:10}}>
                {name}

                    </View>
            </View>
        );
    }
}/*<Animated.Image
 onLoad={this.onLoad.bind(this)}
 source={{uri:APIRoot+"/images/users/"+this.props.user.media.profile_pi}}
 style={[{zIndex :2,position:"absolute"},styles.pict]}/>
 <Animated.Image
 onLoad={this.onTHumbnailLoad.bind(this)}
 source={{uri:APIRoot+"/images/users/blur/"+this.props.user.media.profile_pi}}
 style={[{opacity:this.state.thumbnailMain},styles.pict]}/>*/