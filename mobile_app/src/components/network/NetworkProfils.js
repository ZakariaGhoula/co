import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,ActivityIndicator,TextInput,TouchableOpacity,Dimensions} from 'react-native';

import {APIRoot} from '../../constants/config_path';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-redux-router';

export default class NetworkProfils extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loadImg: true}
        this.onPress = this.onPress.bind(this);

    }

    onPress(id) {

        Actions.thecookout({id_user_external: id});
    }


    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
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
                flexDirection: 'row',
                flex: 1,
                marginLeft: 0,
                height: 60,
                alignItems: 'center',
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

            }, pict: {height: 40, borderRadius: 20, width: 40},
        });

        var {height, width} = Dimensions.get('window');
        var next =
            <Icon name="ios-arrow-forward" size={24}
                  marginLeft={10}
                  color="#000"/>;
        var profilePicture = null;


        if (this.props.user != null && typeof this.props.user.path !== "undefined" && this.props.user.path != null && this.props.user.path != "") {

            profilePicture =
                <Image source={{uri:APIRoot+"/images/users/"+this.props.user.path }} style={styles.pict}
                       onLoadEnd={(e) => this.setState({loadImg: false})}>
                    {this.state.loadImg && <View
                        style={{backgroundColor:'rgba(0,0,0,0.4)',borderRadius :width*0.20,alignItems:"center",justifyContent:"center",top:0,height:width*0.20,width:width*0.20}}><ActivityIndicator
                        animating={ this.state.loadImg }/></View>}
                </Image>

        }
        else if (this.props.user != null && this.props.user.path == "") {
            if (this.props.user.gender != null && this.props.user.gender == "female") {
                var profilePicture = <Image source={require('./../../../img/default_img/placeholder-women.png')}
                                            style={styles.pict}/>;
            }
            else {
                profilePicture = <Image source={require('./../../../img/default_img/placeholder-men.png')}
                                        style={styles.pict}/>;
            }
        }
        var img = null;

        var color_abos = (this.props.user!=null && typeof this.props.user.abo !=="undefined" && this.props.user.abo ==1)?"#27ae60":"#a91d31";
        var color_follow = (this.props.user!=null && typeof this.props.user.follow !=="undefined" && this.props.user.follow ==1)?"#27ae60":"#a91d31";
        return (
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.link} onPress={this.onPress.bind(this,this.props.user.id)}>

                    <View style={styles.linkView}>
                        <View style={{marginRight:15}}>
                            {profilePicture}
                        </View>
                        <View style={styles.TextView}>

                            <Text>     {this.capitalize(this.props.user.first_name) + " " + this.capitalize(this.props.user.last_name)}</Text>
                        </View>
                        <View style={styles.NextView}>
                            <View
                                style={{borderRadius:17,paddingRight:4,marginRight:5,height:17,width:17,alignItems:"center",justifyContent:"center",paddingLeft:4,backgroundColor:color_follow}}><Text
                                style={{ marginTop:0, fontWeight:"bold",fontSize:11,  color:'#fff'}}>F</Text></View>
                            <View
                                style={{borderRadius:17,paddingRight:4, height:17,width:17,alignItems:"center",justifyContent:"center",paddingLeft:4,backgroundColor:color_abos}}>
                                <Text
                                    style={{ marginTop:0, fontWeight:"bold",fontSize:11,  color:'#fff'}}>A</Text></View>
                        </View>

                        <View style={styles.NextView}>
                            {next}
                        </View>
                    </View>
                </TouchableOpacity>


            </View>
        );
    }
}