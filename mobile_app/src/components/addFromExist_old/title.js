import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as RecipeActions    from './../../actions/RecipeActions';

import GiftedSpinner from 'react-native-gifted-spinner';
class Title extends React.Component {
    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.state = {
            title: this.props.title,
            isValidTitle: false,
            connexionPress: false,
            textToShow: null
        }
    }

    componentDidMount() {
        this.setState({
            title: this.state.title.trim(),
            isValidTitle: this.validateTitle(this.state.title),
        });
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.title !== this.state.title
            || nextState.isValidTitle !== this.state.isValidTitle
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
            || nextProps.isRequesting !== this.props.isRequesting
            || nextProps.processing_recepie !== this.props.processing_recepie
        )
    }


    validateTitle(text) {
        return (  text.trim().length > 2)
    }

    isEmpty(value) {

        return !_.isEmpty(value);
    }

    handleTitleChange(text) {
        this.setState({
            title: text,
            isValidTitle: this.validateTitle(text),
        });
    }


    handleClick(event) {
        this.setState({textToShow: null});
        if (this.state.title.trim().length == 0) {
            this.setState({textToShow: "Veuillez renseigner un titre"})
        }
        else {
            if (this.state.isValidTitle) {

                var data = {};
                data['title'] = (this.state.title != null) ? this.state.title.trim() : "";
                data['id_owner'] = this.props.user_id;

                if (this.props.token != null && this.props.processing_recepie == null)
                    this.props.actions_recipe.addRecipeTitle(this.props.token, data);
                else if (this.props.token != null && this.props.processing_recepie !== null && this.props.processing_recepie.title !== "undefined" ){
                    data['id_recepie']=this.props.processing_recepie.id_recipe
                    this.props.actions_recipe.updateRecipeTitle(this.props.token, data);
                }


                this.setState({connexionPress: true})

            } else if (!this.state.isValidTitle) {
                this.setState({textToShow: "Veuillez renseigner un titre"})
            }
        }
    }

    componentWillUpdate(nextProps, nextState) {


        if (nextState.connexionPress && nextProps.processing_recepie != null && nextProps.processing_recepie.title !== "undefined" && nextProps.processing_recepie.title == this.state.title) {
            this.props.handleTitle(this.state.title);
            this.setState({connexionPress: false})
        }
///
    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) );
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: "transparent",
                paddingLeft: padding,
                paddingRight: padding,
            },
            viewTextStatut: {
                marginTop: 10,
                marginBottom: 0,
                flexDirection: 'row',
                position: 'relative'
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

            }

        });
        {/*this.state.textToShow != null
         &&
         <View style={styles.viewTextStatut}>
         <Text
         style={{flex:1,textAlign:"center",color:"#c41e26", fontFamily: 'Guardi-Roman'}}>{this.state.textToShow}</Text>
         </View>
         */
        }

        return (


            <View style={styles.bg}>
                <View style={{ paddingLeft: padding,marginTop:padding,
                paddingRight: padding,width:width,flexDirection:"row"}}>
                    <Text
                        style={{color:(this.state.textToShow != null)?"#c41e26":"#000",fontSize:12*(width/320), marginRight:7,fontFamily: 'Guardi-Roman'}}>Ajouter
                        un titre à votre
                        recette</Text><Text
                    style={{color:(this.state.textToShow != null)?"#c41e26":"#000",fontSize:11*(width/320),marginTop:4*(width/320),  fontFamily: 'GuardiLTStd-BlackItalic'}}>(Obligatoire)</Text></View>
                <View style={[styles.viewInput,{marginTop:20}]}>

                    <TextInput

                        ref="email"
                        returnKeyType="next"
                        autoCorrect={true}
                        value={this.state.title}
                        defaultValue={this.state.title}
                        onChangeText={this.handleTitleChange.bind(this)}
                        placeholder="ex : Tarte au citron"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                        onSubmitEditing={
    this.handleClick.bind(this)
  }
                    />
                </View>


                <TouchableHighlight

                    style={styles.viewLogin} underlayColor='transparent'
                    onPress={this.handleClick.bind(this)}>
                    <Image source={require('image!./../../img/subscribe/next.png')}/>
                </TouchableHighlight>

                {this.props.isRequesting &&
                <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                    <GiftedSpinner style={{marginTop:0}}/>
                </View>
                }

            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    token: state.session.token,
    isRequesting: state.loading.shown,
    processing_recepie: state.recipe.processing_recepie,
});

const mapDispatchToProps = (dispatch) => ({

    actions_recipe: bindActionCreators(RecipeActions, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
