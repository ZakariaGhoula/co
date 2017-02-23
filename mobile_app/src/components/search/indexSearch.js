import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,Dimensions,TouchableHighlight,TouchableOpacity,Keyboard} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as SessionActions    from './../../actions/SessionActions';

import NavigationBar from 'react-native-navbar';
import MenuTab from './../default/MenuTab';

class IndexSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",

        }
        this.handleNext = this.handleNext.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

    }


    componentDidMount() {


    }


    componentWillMount() {
        if (typeof this.props.search !== "undefined" && this.props.search !== null && this.props.search.length >0) {

            this.setState({search:this.props.search})
        }
    }
    componentWillUpdate(nextProps) {

        if (typeof nextProps.search !== "undefined" && nextProps.search !== null && nextProps.search.length >0) {

            this.setState({search:nextProps.search})
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.search !== nextState.search)


    }

    handleNext() {

        if(this.state.search.length>0){
            Actions.newsearch({search:this.state.search});
            return;
        }
    }
    handleChange(next) {

        this.setState({search: next});
    }


    handleMenuChoice(list_image, link, preparation, ingredients) {
        this.setState({
            to_show: 3,
            list_image: list_image,
            link: link,
            preparation: preparation,
            ingredient: ingredients
        });
    }

    handlePrev(prev) {
       Actions.pop();
    }

    render() {

//bg-tapis-gris.png
        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) / 2);
        var margin_top_logo = height * 0.15;
        var margin_bottom_logo = height * 0.12;

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#fff',
            },
            navbar: {
                borderColor: '#c7c7c7',
                backgroundColor: "#ffffff",
/*
                shadowColor: "#c7c7c7",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 2,
                    width: 0
                },
  */              borderBottomWidth: 1,
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
            }
            , bravoControler: {
                flex: 1,
                position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#e9b682", opacity: 0.9
            },
            viewInput: {
                borderColor: '#20201e',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            }, textInput: {
                fontSize: 12,
                height: 40,
                fontFamily: 'OratorStd',
                color: '#20201e',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            },
            bravoaddTextLink: {

                fontFamily: 'OratorStd',
                fontSize: 14 * width / 320,
                textDecorationLine: "underline",
                textAlign: "center",
                alignSelf: 'stretch',
                backgroundColor: "transparent"

            },  viewLogin: {
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

            }


        });

        var titleConfig = <Image style={{marginBottom:2,width:92}} resizeMode={"contain"} source={require('image!./../../img/season/logo.png')}/>;

        var data_to_show = null;

        /*
         data_to_show = <Title
         user_id={this.props.user_id}
         handleTitle={this.handleTitle.bind(this)} title={this.state.title}/>;
         }*/


        var leftButtonConfig = <TouchableOpacity style={{marginTop:15,marginLeft:10}}
                                                 onPress={this.handlePrev.bind(this)}>
            <Image source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>

        return (


            <View style={styles.bg}>

                <Image source={require('image!./../../img/default_img/bg-tapis-gris.png')}
                       style={{flex:1,height:null,width:null}}>


                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        tintColor={"#fff"}/>


                    <ScrollView ref="scrollView">
                        <View style={{alignItems:"center"}}>
                            <Text
                                style={styles.produit_de_saison}>Rechercher</Text>

                        </View>
                        <View style={{ paddingLeft: padding,marginTop:padding,
                paddingRight: padding}}>
                            <View style={[styles.viewInput,{marginTop:20}]}>
                                <TextInput

                                    ref="text"
                                    returnKeyType="next"
                                    autoCorrect={true}
                                    value={this.state.search}
                                    defaultValue={this.state.search}
                                    onChangeText={this.handleChange.bind(this)}
                                    placeholder="Une recette, une personne, un mot clé"
                                    placeholderTextColor="#20201e"
                                    style={styles.textInput}
                                    onSubmitEditing={
    this.handleNext.bind(this)
  }
                                />

                            </View>
                            <TouchableHighlight

                                style={styles.viewLogin} underlayColor='transparent'
                                onPress={this.handleNext.bind(this)}>
                                <Image source={require('image!./../../img/subscribe/next.png')}/>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>

                </Image>
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name}/>
                </View>

            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    isRequesting: state.loading.shown,

});

const mapDispatchToProps = (dispatch) => ({

    actions: bindActionCreators(SessionActions, dispatch)

});

export
default

connect(mapStateToProps, mapDispatchToProps)

(
    IndexSearch
)
;
