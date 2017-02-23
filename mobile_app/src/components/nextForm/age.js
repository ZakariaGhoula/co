import React, { Component } from 'react';
import {Text,TextInput,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GiftedSpinner from 'react-native-gifted-spinner';
import {OPTIONS_TRANCHE_AGE} from './../../constants/config';
export default class Age extends React.Component {
    constructor(props) {
        super(props);

        this.handleNext = this.handleNext.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            age: this.props.age,
            connexionPress: false,
            textToShow: null

        }
    }

    componentDidMount() {
        this.setState({
            age: this.state.age,
            connexionPress:typeof this.state.age !== "undefined" && this.state.age.trim() != ""
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (  nextState.age !== this.state.age
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
        )
    }


    handleNext() {
        if (typeof this.state.age !== "undefined" && this.state.age.trim() != "") {
            this.props.handleAge(this.state.age);
        }
        else {
            this.setState({
                textToShow: "Veuillez selectionner votre tranche d'âge."

            });
        }

    }

    handleClick(event) {
        this.setState({textToShow: null, connexionPress: true, age: event});

    }

    componentWillUpdate(nextProps, nextState) {

    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) );
        var margin_top_logo = height * 0.2;
        var margin_bottom_logo = height * 0.12;
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: "transparent",
                paddingLeft: padding,
                paddingRight: padding,
            },
            viewTextStatut: {
                marginTop: 0,
                marginBottom: 10,
                flexDirection: 'row',
                backgroundColor: "transparent",
                position: 'relative'
            },
            textQuestion: {
                color: "#fff",
                fontSize: 15.5,
                fontFamily: 'OratorStd',
            },
            view_logo: {
                marginTop: margin_top_logo,
                marginBottom: margin_bottom_logo,
                alignItems: "center",
                backgroundColor: "transparent",
                justifyContent: 'center'
            },
            viewInput: {
                borderColor: '#20201e',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 5,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            }, textInput: {
                fontSize: 14,
                height: 40,

                color: '#20201e',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            },
            txt_btn: {
                fontSize: 15,
            },
            btn_sexe: {
                height: 36,
                marginBottom: 10,
                flexDirection: 'row',
                position: 'relative',
                borderColor: '#b8b0aa',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                backgroundColor: '#dbd0cd',
                borderColor: '#b8b0aa',
                borderWidth: 1,
                alignItems: "center",
                justifyContent: 'center',
            }, viewLogin: {
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
                color: '#000',
                fontSize: 15,

            }

        });

        var list_btn = null;
        list_btn = <View style={{flex:1}}>{OPTIONS_TRANCHE_AGE.map(function (v, i) {
            return ( <TouchableHighlight
                key={i}
                style={[styles.btn_sexe,{ backgroundColor: (this.state.connexionPress &&  v.value==this.state.age)?"#fdaa69":'#dbd0cd',}]}
                underlayColor='transparent'
                onPress={this.handleClick.bind(this,v.value)}>
                <Text
                    style={{color:(this.state.connexionPress  &&  v.value==this.state.age) ? "#fff" : '#000',}}>{v.label + " ans"}</Text></TouchableHighlight>)

        }, this)}<View
            style={{alignItems:"center", justifyContent:'center',flex:1,flexDirection: 'row'}}><TouchableHighlight
            style={[styles.viewLogin,{marginRight:10}]}
            underlayColor='transparent'
            onPress={this.props.handlePrev.bind(this,1)}>
            <Icon name="ios-arrow-round-back-outline" size={50} color="#fff"/>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.viewLogin,{marginLeft:10}]}
                         underlayColor='transparent'
                         onPress={this.handleNext.bind(this)}>
            <Icon name="ios-arrow-round-forward-outline" size={50} color="#fff"/>
        </TouchableHighlight></View></View>;


        return (


            <ScrollView style={styles.bg}>


                <View style={styles.view_logo}>
                    <Text
                        style={styles.textQuestion}
                    >Quel cuisinier êtes-vous ?</Text>
                </View>
                {this.state.textToShow != null
                &&
                <View style={styles.viewTextStatut}>
                    <Text
                        style={{flex:1,textAlign:"center", fontFamily: 'OratorStd',color:"#fff",fontSize:16,}}>{this.state.textToShow}</Text>
                </View>
                }
                {list_btn}


            </ScrollView>

        );
    }
}
