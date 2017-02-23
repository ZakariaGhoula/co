import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';




export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: 0,
        }


    }



    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) / 2);
        var margin_top_logo = height * 0.15;
        var margin_bottom_logo = height * 0.12;

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: 'transparent',
            },
            navbar: {
                borderColor: '#c7c7c7',
                backgroundColor: "#ffffff",

                shadowColor: "#c7c7c7",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 2,
                    width: 0
                },
                borderBottomWidth: 1,
            },
            view_logo: {
                marginTop: margin_top_logo,
                marginBottom: margin_bottom_logo,
                alignItems: "center",
                justifyContent: 'center'
            },
            view_button: {
                alignItems: "center",
                justifyContent: 'center'
            },
            produit_de_saison: {
                fontFamily: 'OratorStd',
                fontSize: 16,
                marginTop: 69 * width / 320,
                textAlign: "center",
                backgroundColor: "transparent"
            },
            viewLogin: {
                height: 36,
                marginBottom: 20,
                flexDirection: 'row',
                position: 'relative',
                borderColor: '#b8b0aa',
                borderWidth: 0,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 30
            }, textLogin: {
                color: (this.state.connexionPress) ? "#fff" : '#000',
                fontSize: 15,

            },
            buttonRound: {
                width: 64 * width / 320,
                height: 104 * width / 320,

                alignItems: "center",
                justifyContent: "center",
                marginRight: 15 * width / 320
            },
            buttonRoundView: {
                borderWidth: 1,
                borderColor: "#9b9b9b",
                borderRadius: (64 * width / 320) / 2,
                width: 64 * width / 320,
                height: 64 * width / 320,
                alignItems: "center",
                justifyContent: "center",
            }, buttonRoundText: {
                fontSize: 11 * width / 320,
                fontFamily: 'Guardi-Roman',
                textAlign: "center",
                marginTop: 5 * width / 320,
                width: 58 * width / 320,
                height: 40 * width / 320,
            }

        });


        return (


            <View style={styles.bg}>
                <View
                    style={{marginTop:35,paddingLeft:padding,paddingRight:padding,marginBottom:0,alignItems:"center",}}>
                    <View style={{alignItems:"center",flexDirection:"row"}}>
                        <TouchableOpacity
                            onPress={this.props.selectPhotoTapped}
                            style={styles.buttonRound}>
                            <View style={styles.buttonRoundView}><Image
                                source={require('image!./../../img/addrecipe/photo.png')}/></View>
                            <Text style={styles.buttonRoundText}>Modifier {"\n"}les photos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.props.handleChoice.bind(this,2)}
                            style={styles.buttonRound}>
                            <View style={styles.buttonRoundView}><Image
                                source={require('image!./../../img/addrecipe/text.png')}/></View>
                            <Text style={styles.buttonRoundText}>Modifier {"\n"}le texte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.props.handleChoice.bind(this,3)}
                            style={[styles.buttonRound,{marginRight:0}]}>
                            <View style={styles.buttonRoundView}><Image
                                source={require('image!./../../img/addrecipe/link.png')}/></View>
                            <Text style={styles.buttonRoundText}>Modifier {"\n"}le lien url</Text>
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{alignItems:"center",marginTop:0, justifyContent:'center',flex:1,flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.viewLogin,{marginRight:10}]} underlayColor='transparent'
                                          onPress={this.props.handlePrev.bind(this,1)}>
                            <Image source={require('image!./../../img/subscribe/back.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.viewLogin,{marginLeft:10}]} underlayColor='transparent'
                                          onPress={this.props.handleNext.bind(this)} >
                            <Image source={require('image!./../../img/subscribe/next.png')}/>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>


        )
    }
}

