import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableHighlight,TouchableOpacity,Keyboard} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';

import Icon from 'react-native-vector-icons/Ionicons';
import * as RecipeActions    from './../../actions/RecipeActions';
import { connect }            from 'react-redux';
import _                      from 'underscore';
import Storage from 'react-native-storage'
import NavigationBar from 'react-native-navbar';
import MenuTab from './../default/MenuTab';

import Title from './title';
import MenuChoice from './menuChoice';
import Tags from './tags';
import Type from './type';

import LoadingOverlay from 'react-native-loading-overlay';
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class UpdateRecipe extends React.Component {
    constructor(props) {
        super(props);

        var l_img = [];

        var color = ['#a0d0cb', '#e4e392', '#d0d0ce', '#fdcf8b', "#e4bfc3", '#c69d8e'];

        var l_tags = [];

        if (this.props.recepie.tags != null && Object.keys(this.props.recepie.tags).length > 0) {
            var i = 0;
            for (var j in this.props.recepie.tags) {
                l_tags.push({value: this.props.recepie.tags[j], color: color[i]});
                i++;
                if (i > 5) {
                    i = 0;
                }
            }

        }

        this.state = {
            title: this.props.recepie.title,
            link: (this.props.recepie.website != "" && this.props.recepie.website != null) ? this.props.recepie.website : "",
            ingredient: (this.props.recepie.ingredient != "" && this.props.recepie.ingredient != null) ? this.props.recepie.ingredient : "",
            preparation: (this.props.recepie.content != "" && this.props.recepie.content != null) ? this.props.recepie.content : "",
            list_image: l_img,
            list_img_base64: [],
            listTagsSelected: l_tags,
            type: this.props.recepie.statut,
            id_owner: (this.props.recepie.id_owner != 0) ? this.props.recepie.id_owner : this.props.recepie.user.id_user,
            to_show: 0,
            to_show_total: 4
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleMenuChoice = this.handleMenuChoice.bind(this);
        this.scrolldown = this.scrolldown.bind(this);
        this.keyboardDidHide = this.keyboardDidHide.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleType = this.handleType.bind(this);
    }


    componentWillMount() {

        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Mise à jour Recette Page');
        this.props.actions_recipe.retrieveRecipeProcessing(this.props.token, this.props.recepie.id_recipe);

    }

    componentWillUnmount(nextProps, nextState) {

        // this.props.actions_recipe.destroy_cookout();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.to_show == 0 && nextProps.processing_recepie !== null) {

            this.setState({
                to_show: 1
            })


        }


        if (nextState.to_show == 5 && nextProps.processing_recepie !== null && nextProps.processing_recepie.statut !== null) {

            nextProps.actions_recipe.retrieveMyRecipesRefresh(nextProps.token);
            this.setState({to_show: 7});
        }


    }


    componentWillUnmount() {
        //  this.keyboardDidHideListener.remove()
        this.props.actions_recipe.destroy_processingRecepie();
        this.props.actions_recipe.destroy_lastRecipe();
    }


    keyboardDidHide(e) {
        this.refs.scrollView.scrollTo({y: 0});
    }

    scrolldown(oy) {
        const self = this;
        self.refs.scrollView.scrollTo({y: 500});
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.to_show !== nextState.to_show
            || this.state.title !== nextState.title
            || this.state.list_image !== nextState.list_image
            || this.state.ingredient !== nextState.ingredient
            || this.state.preparation !== nextState.preparation
            || this.state.list_img_base64 !== nextState.list_img_base64
            || this.state.link !== nextState.link
            || this.state.type !== nextState.type
            || this.state.listTagsSelected !== nextState.listTagsSelected
            || this.props.token !== nextState.token
            || this.props.form_skiped !== nextProps.form_skiped
            || this.props.last_recipe !== nextProps.last_recipe
            || this.props.list_images_recipe !== nextProps.list_images_recipe
            || this.props.processing_recepie !== nextProps.processing_recepie

        );
    }

    handleNext(next) {
        this.setState({to_show: next});
    }

    handleTitle(title) {
        this.setState({to_show: 2, title: title});
    }

    handleTags(listTagsSelected) {

        this.setState({to_show: 4, listTagsSelected: listTagsSelected});
    }

    handleType(type) {

        this.setState({to_show: 5, type: type});
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
        this.setState({to_show: prev});
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
                marginTop: 29 * width / 320,
                textAlign: "center",
                backgroundColor: "transparent"
            }
            , bravoControler: {
                flex: 1,
                position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#e9b682", opacity: 0.9
            },
            bravoaddText: {

                fontSize: 17 * width / 320,

                fontFamily: 'Guardi-Roman',
                color: '#000',
                borderWidth: 0,
                backgroundColor: "transparent",
                paddingLeft: 5,
                textAlign: 'center',

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

            }


        });


        var titleConfig = <Image style={{marginBottom:2,width:92}} resizeMode={"contain"} source={require('image!./../../img/season/logo.png')}/>;

        var data_to_show = null;
        if (this.state.to_show == 1 && this.props.processing_recepie != null) {
            data_to_show = <Title handleTitle={this.handleTitle.bind(this)} title={this.state.title}/>;
        }
        else if (this.state.to_show == 2) {
            data_to_show = <MenuChoice
                ingredient={this.state.ingredient}
                preparation={this.state.preparation}
                link={this.state.link}
                list_image={this.state.list_image}
                handlePrev={this.handlePrev.bind(this)}
                handleMenuChoice={this.handleMenuChoice.bind(this)}
            />;
        } else if (this.state.to_show == 3) {
            data_to_show = <Tags
                handlePrev={this.handlePrev.bind(this)}
                handleTags={this.handleTags.bind(this)}
                listTagsSelected={this.state.listTagsSelected}
                handleMenuChoice={this.handleMenuChoice.bind(this)}
                scrolldown={this.scrolldown.bind(this)}
                keyboardDidHide={this.keyboardDidHide.bind(this)}
            />;
        }
        else if (this.state.to_show == 4 || this.state.to_show == 5 || this.state.to_show == 6 || this.state.to_show == 7) {
            data_to_show = <Type
                handlePrev={this.handlePrev.bind(this)}
                handleType={this.handleType.bind(this)}
                type={this.state.type}

            />;
        }
        var bravo = null;
        if (this.props.my_recipes !== null) {
            var nbr = Object.keys(this.props.my_recipes).length + 1;
        }
        else {
            var nbr = 0;
        }
        if (this.state.to_show == 6 || this.props.processing_recepie == null) {
            bravo = <View style={[styles.bravoControler,{backgroundColor:"transparent"}]}>
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>

                    <LoadingOverlay visible={true} text=""/>


                </View>
            </View>
        }
        if (this.state.to_show == 7) {
            if (this.props.processing_recepie != null) {
                bravo = <View style={styles.bravoControler}>
                    <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/season/logo.png')}/>
                    </View>
                    <View style={{marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/addrecipe/new_bravo.png')}/>
                    </View>
                    <View style={{marginTop:0,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/addrecipe/clap.gif')}/>
                    </View>

                    <View style={{marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Text style={styles.bravoaddText}>Votre recette{"\n"} a bien été
                            {"\n"} modifiée !</Text>
                    </View>
                    <View style={{marginTop:40,alignItems:"center",justifyContent:'center'}}>
                        <TouchableHighlight
                            style={{marginTop:15}}
                            underlayColor='transparent'
                            onPress={()=> (Actions.moncookout())}>
                            <Text style={[styles.bravoaddTextLink,{fontSize:12}]}>Retour à mon cookout</Text>

                        </TouchableHighlight>
                    </View>
                </View>
            }
            else {
                bravo = <View style={styles.bravoControler}>
                    <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/season/logo.png')}/>
                    </View>
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={()=> (Actions.addnewrecipe())}
                        style={{position:"absolute",backgroundColor:"transparent",top:20,left:20}}>
                        <Icon name="ios-close" size={50} color="#000" backgroundColor="transparent"/>
                    </TouchableHighlight>

                    <View style={{marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Text style={styles.bravoaddText}>Une erreur est survenu {"\n"} lors de la création!</Text>
                    </View>

                </View>
            }
        }

        var leftButtonConfig = <TouchableOpacity style={{marginTop:15,marginLeft:10}}
                                                 onPress={this.handlePrev.bind(this,3)}>
            <Image source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>

        return (


            <View style={styles.bg}>

                <Image source={require('image!./../../img/default_img/bg-tapis-gris.png')}
                       style={{flex:1,height:null,width:null}}>

                    {(this.state.to_show == 4) &&
                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        tintColor={"#fff"}/>
                    }
                    {(this.state.to_show !== 4) &&
                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        tintColor={"#fff"}/>
                    }
                    <ScrollView ref="scrollView">
                        <View style={{alignItems:"center"}}>
                            <Text
                                style={styles.produit_de_saison}>Modifier votre recette</Text>
                            <View
                                style={{marginTop:40*(width/320),   width:16,  borderBottomWidth: 1,borderTopWidth:0,borderColor:"#000"}}>
                                <Text
                                    style={[styles.produit_de_saison,{marginTop:0*(width/320)}]}>{(this.state.to_show > 4) ? 4 : this.state.to_show}</Text>
                            </View>
                            <Text
                                style={[styles.produit_de_saison,{marginTop:7}]}>{this.state.to_show_total}</Text>
                        </View>
                        {data_to_show}
                    </ScrollView>

                </Image>
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name} page="addnewrecipe"/>
                </View>
                {bravo}
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    user_id: state.session.user_id,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    form_skiped: state.session.form_skiped,
    isRequesting: state.loading.shown,
    last_recipe: state.recipe.last_recipe,
    my_recipes: state.recipe.my_recipes,
    list_images_recipe: state.recipe.list_images_recipe,

    processing_recepie: state.recipe.processing_recepie
});

const mapDispatchToProps = (dispatch) => ({

    actions_recipe: bindActionCreators(RecipeActions, dispatch),
    actions: bindActionCreators(SessionActions, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe);
