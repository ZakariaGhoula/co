import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import {Actions} from 'react-native-redux-router';
export default class ShowFollower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}


    }


    render() {
        var {height, width} = Dimensions.get('window');


        var nbr_recipes = Object.keys(this.props.my_recipes).length;
        var nbr_followers = Object.keys(this.props.my_network.followers).length;
        var nbr_abos = Object.keys(this.props.my_network.abos).length;
        var id_user = this.props.id_user;



        var styles = StyleSheet.create({
            main: {
                height: 50,
                flexDirection: 'row',
                alignItems:"center",
                justifyContent:"center",
                marginTop:15,
                paddingTop:10,
                marginBottom:0,
                marginRight:5,
                backgroundColor:"transparent"

            },
            nbr: {
                fontFamily: 'GuardiLTStd-BlackItalic', fontSize: 12, textAlign: "center",backgroundColor:"transparent"
            }, label: {
                fontFamily: 'OratorStd', fontSize: 10, textAlign: "center",backgroundColor:"transparent"
            },

            pict: {height: width * 0.24, borderRadius: width * 0.24 / 2, width: width * 0.24},
            name: {
                flex: 1,
                marginTop: 15,
                marginBottom: 0,
                textAlign: "left",
                fontFamily: 'GuardiLTStd-BlackItalic',
                fontStyle: "italic",
                fontSize: 13,
                backgroundColor:"transparent"
            },
            basicText: {flex: 1, marginBottom: 5, textAlign: "left", fontFamily: 'Guardi-Roman', fontSize: 11}
        });

        return (
            <View style={styles.main}>
                <View style={{marginRight:10}}>
                    <View style={{flex:1}}>
                        <Text style={styles.nbr}>{nbr_recipes}</Text>
                        <Text style={styles.label}>Recettes</Text>
                    </View>
                </View>
                <TouchableHighlight underlayColor='transparent' onPress={()=>Actions.followers({list:this.props.my_network.followers})}style={{marginRight:15}}>
                    <View style={{flex:1}}>
                        <Text style={styles.nbr}>{nbr_followers}</Text>
                        <Text style={styles.label}>Followers</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={()=>Actions.abos({list:this.props.my_network.abos})}>
                    <View style={{flex:1}}>
                        <Text style={styles.nbr}>{nbr_abos}</Text>
                        <Text style={styles.label}>Abos</Text>
                    </View>
                </TouchableHighlight>


            </View>
        );
    }
}