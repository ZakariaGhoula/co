import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableHighlight,TouchableOpacity,Keyboard} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as RecipeActions    from './../../actions/RecipeActions';
import * as SessionActions    from './../../actions/SessionActions';

import {OPTIONS_COUTEAU} from './../../constants/config';

import Icon from 'react-native-vector-icons/Ionicons';

import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
import _                      from 'underscore';
import Storage from 'react-native-storage'

import LoadingOverlay from 'react-native-loading-overlay';

import NavigationBar from 'react-native-navbar';
import MenuTab from './../default/MenuTab';

import Title from './title';
import MenuChoice from './menuChoice';
import Tags from './tags';
import Type from './type';
class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: "",
            ingredient: "",
            preparation: "",
            list_image: [],
            list_img_base64: [],
            listTagsSelected: [],
            type: 0,
            to_show: 1,
            to_show_total: 4,
            nbr_recipe: (this.props.my_recipes == null) ? 0 : Object.keys(this.props.my_recipes).length,
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
        tracker1.trackScreenView('Ajout Nouvelle Recette Page');

    }
    componentDidMount() {


    }

    componentWillUpdate(nextProps, nextState) {

        if (nextState.to_show == 5 && nextProps.processing_recepie !== null && nextProps.processing_recepie.statut !== null) {

            nextProps.actions_recipe.retrieveMyRecipesRefresh(nextProps.token);
            this.setState({to_show: 7});
        }


    }


    componentWillUnmount() {
        //  this.keyboardDidHideListener.remove()

        this.props.actions_recipe.destroy_lastRecipe();
        this.props.actions_recipe.destroy_processingRecepie();
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
            || this.props.token !== nextProps.token
            || this.props.form_skiped !== nextProps.form_skiped
            || this.props.last_recipe !== nextProps.last_recipe
            || this.state.nbr_recipe !== nextState.nbr_recipe
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

              /*  shadowColor: "#c7c7c7",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 2,
                    width: 0
                },
                */borderBottomWidth: 1,
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

                fontSize: 14 * width / 320,

                fontFamily: 'Guardi-Roman',
                color: '#000',
                borderWidth: 0,
                backgroundColor: "transparent",
                paddingLeft: 5,
                textAlign: 'center',

                alignSelf: 'stretch',
                flex: 1,


            }, bravoaddTextBold: {

                fontSize: 14 * width / 320,

                fontFamily: 'GuardiLTStd-BlackItalic',
                color: '#000',
                borderWidth: 0,
                backgroundColor: "transparent",
                paddingLeft: 5,
                textAlign: 'center',

                alignSelf: 'stretch',
                flex: 1,
                fontWeight: "bold"


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
      //  var titleConfig = <Image style={{marginBottom:8}} source={require('image!./../../img/season/logo.png')}/>;

        var data_to_show = null;

        if (this.state.to_show == 1) {
            data_to_show = <Title
                user_id={this.props.user_id}
                handleTitle={this.handleTitle.bind(this)} title={this.state.title}/>;
        }
        else if (this.state.to_show == 2) {
            data_to_show = <MenuChoice
                ingredient={this.state.ingredient}
                preparation={this.state.preparation}
                content={this.props.processing_recepie}
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
        if (this.state.to_show == 6) {
            bravo = <View style={[styles.bravoControler,{backgroundColor:"transparent"}]}>
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>

                    <LoadingOverlay visible={true} text=""/>


                </View>
            </View>
        }


        /*<TouchableHighlight
         underlayColor='transparent'
         onPress={()=> (Actions.moncookout())}
         style={{position:"absolute",backgroundColor:"transparent",top:20,left:20}}>
         <Icon name="ios-close" size={50} color="#000" backgroundColor="transparent"/>
         </TouchableHighlight>*/
        if (this.state.to_show == 7) {
            var nbr_recipes = this.state.nbr_recipe;
            var knifePicture = null;
            var text_knife = null;
            var text_knife2 = null;
            var text_final = null;
            if (this.props.processing_recepie != null) {

                nbr_recipes += 1;

                if (nbr_recipes == 1) {
                    text_final = "C’est votre 1ère recette publiée !"
                    text_knife = "Plus que 4 recettes à poster \n et vous obtiendrez le couteau d'office !";
                    knifePicture = <Image
                        source={require('image!./../../img/moncookout/knife/couteaux_0.png')}/>;
                }
                else if (nbr_recipes >= 1 && nbr_recipes < 5){
                    text_final = "C’est votre " + nbr_recipes + "ème recette publiée !";
                text_knife2 = " le couteau d'office !";
                if (5 - nbr_recipes == 1) {

                    text_knife = "Plus qu'une recette postée et vous obtiendrez";
                }
                else {
                    text_knife = "Plus que " + (5 - nbr_recipes) + " recettes à poster  \n  et vous obtiendrez";
                }

                knifePicture = <Image resizeMode={"contain"}
                                      source={require('image!./../../img/addrecipe/knife/couteaux_1.png')}/>;
                }
                else if (nbr_recipes >= 5 && nbr_recipes < 15) {
                    text_knife2 = " le couteau à pain !";
                    text_final = "C’est votre " + nbr_recipes + "ème recette publiée !"
                    knifePicture = <Image resizeMode={"contain"}
                                          source={require('image!./../../img/addrecipe/knife/couteaux_2.png')}/>;
                    if ((15 - nbr_recipes) == 1) {
                        text_knife = "Plus qu'une recette à poster   \n et vous obtiendrez";
                    }
                    else {
                        text_knife = "Plus que " + (15 - nbr_recipes) + " recettes à poster  \n et vous obtiendrez";
                    }
                }
                else if (nbr_recipes >= 15 && nbr_recipes < 30) {
                    if ((30 - nbr_recipes) == 1) {
                        text_knife = "Plus qu'une recette postée \n et vous obtiendrez";
                    }
                    else {
                        text_knife = "Plus que " + (30 - nbr_recipes) + " recettes à poster \n et vous obtiendrez";
                    }
                    text_knife2 = " le couteau éminceur !";
                    text_final = "C’est votre " + nbr_recipes + "ème recette publiée !"
                    knifePicture = <Image resizeMode={"contain"}
                                          source={require('image!./../../img/addrecipe/knife/couteaux_3.png')}/>;
                }
                else  if (nbr_recipes >= 30 && nbr_recipes < 50) {
                    text_knife2 = " le couteau feuille !";
                    if ((50 - nbr_recipes) == 1) {
                        text_knife = "Plus qu'une recette à poster \n et vous obtiendrez";
                    }
                    else {
                        text_knife = "Plus que " + (50 - nbr_recipes) + " recettes à poster \n et vous obtiendrez";
                    }
                    text_final = "C’est votre " + nbr_recipes + "ème recette publiée !"
                    knifePicture = <Image resizeMode={"contain"}
                                          source={require('image!./../../img/addrecipe/knife/couteaux_4.png')}/>;
                }
                else if (nbr_recipes >= 50) {
                    text_final = "C’est votre " + nbr_recipes + "ème recette publiée !";
                    text_knife = null;
                    knifePicture = <Image resizeMode={"contain"}
                                          source={require('image!./../../img/addrecipe/knife/couteaux_5.png')}/>;
                }


                bravo = <ScrollView style={styles.bravoControler}>
                    <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/season/logo.png')}/>
                    </View>

                    <View style={{marginTop:10,flex:1,alignItems:"center",justifyContent:'center'}}>
                        <Image style={{width:100}}
                               source={require('image!./../../img/addrecipe/new_bravo.png')}/>
                    </View>
                    <View style={{marginTop:0,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/addrecipe/clap.gif')}/>
                    </View>

                    <View style={{marginTop:0,alignItems:"center",justifyContent:'center'}}><Text
                        style={styles.bravoaddText}>{text_final}</Text></View>

                    {text_knife !== null && (nbr_recipes <= 50) &&
                    <View style={{marginTop:5,alignItems:"center",justifyContent:'center'}}><Text
                        style={styles.bravoaddText}>{text_knife}<Text
                        style={styles.bravoaddTextBold}>{text_knife2}</Text></Text></View>
                    }


                    <View style={{marginTop:30,alignItems:"center",justifyContent:'center'}}>
                        <Image resizeMode={"contain"} style={{marginTop:0,alignItems:"center",justifyContent:'center'}}
                               source={require('image!./../../img/addrecipe/flag.png')}>
                            {knifePicture}
                        </Image>


                    </View>


                    <TouchableHighlight
                        style={{marginTop:25}}
                        underlayColor='transparent'
                        onPress={()=> (Actions.moncookout())}>
                        <Text style={[styles.bravoaddTextLink,{fontSize:14}]}>Retour à mon cookout</Text>

                    </TouchableHighlight>
                </ScrollView>
            }
            else {
                bravo = <View style={styles.bravoControler}>
                    <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/season/logo.png')}/>
                    </View>
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={()=> (Actions.moncookout())}
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
                                style={styles.produit_de_saison}>Créez votre recette</Text>
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
    processing_recepie: state.recipe.processing_recepie,
    my_recipes: state.recipe.my_recipes,

});

const mapDispatchToProps = (dispatch) => ({

    actions_recipe: bindActionCreators(RecipeActions, dispatch),
    actions: bindActionCreators(SessionActions, dispatch)

});

export
default

connect(mapStateToProps, mapDispatchToProps)

(
    AddRecipe
)
;
