import React, { Component } from 'react';
import {Dimensions,Text,View,Image,StyleSheet,Animated,TextInput,TouchableHighlight,ScrollView,TouchableOpacity,AlertIOS,Linking} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';
import { connect }            from 'react-redux';

import LoadingOverlay from 'react-native-loading-overlay';
import NavigationBar from 'react-native-navbar';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuTab from './../default/MenuTab';
import moment from 'moment';

import ModalPicker from 'react-native-modal-picker'
import PostedBy from './postedby';
import Like from './like';
import ListImage from './listImage'
import _                      from 'underscore';
import {CachedImage} from "react-native-img-cache";
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class MyRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadImg: true,
            thumbnailOpacity: new Animated.Value(0),
            thumbnailMain: new Animated.Value(1)
        }

        this.menuLeft = this.menuLeft.bind(this);
        //  this.menuRight = this.menuRight.bind(this);
        this.extractDomain = this.extractDomain.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);

        // this.handleSelectModal = this.handleSelectModal.bind(this);


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


    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Une des mes recettes Page');
    }
    componentDidMount() {
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
        //if (this.props.token != null && this.props.id_recipe != null) {
        //this.props.actions_recipe.retrieveMyRecipe(this.props.token, this.props.id_recipe);
        //}
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextProps.recipe_delete != null) {
            if (nextProps.recipe_delete.deleted) {
                Actions.moncookout({from_delete: true});
            }
            else {
                AlertIOS.alert("Une erreur est survenue lors de la suppression");
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user ||
            nextProps.recipe_delete !== this.props.recipe_delete
            || (this.state.thumbnailOpacity !== nextState.thumbnailOpacity)/* ||
             nextProps.my_recipe !== this.props.my_recipe*/
        )
    }

    deleteRecipe(e) {
        this.props.actions_recipe.deleteRecipe(this.props.token, this.props.recipe.id_recipe);
    }

    handleSelectModal(option) {
        if (option == 0) {
            Actions.updaterecepie({recepie: this.props.recipe})
        }
        else if (option == 1) {
            AlertIOS.prompt(
                'Supprimer la recette',
                'Êtes-vous sûr ?',
                [
                    {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Oui', onPress: password => this.deleteRecipe()},
                ],
                null,
                'default'
            );
            //  Actions.addexistrecepie({recepie: this.props.recipe})
        }

    }

    extractDomain(url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
    }


    menuLeft(e) {
        Actions.pop();
        // this.setState({isOpen: !this.state.isOpen});
    }

    handleClick = (url) => {

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    };

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.06) );
        var styles = StyleSheet.create({
            bg: {
                flex: 1, backgroundColor: "#fff"
            },
            navbar: {
                borderColor: '#c7c7c7',
                backgroundColor: "#ffffff",


                borderBottomWidth: 1,
            },
            updateProfileLink: {
                flex: 1
            },
            updateProfileLinkText: {
                flex: 1,
                textAlign: "center",
                textDecorationLine: "underline",
                fontFamily: 'OratorStd',
                fontSize: 13
            }, placeholder: {
                height: 106,
                width: width,
                backgroundColor: "#ede4e1",
                opacity: 0.9,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 0

            }, title: {
                marginBottom: 4,
                color: "#000",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",

                fontFamily: 'Guardi-Roman',
            }, created: {
                marginBottom: 4,
                color: "#000",

                fontSize: 14,
                fontFamily: 'Guardi-Roman',
            }, By: {
                marginTop: 4,
                color: "#000",

                fontSize: 14,
                fontFamily: 'GuardiLTStd-BlackItalic',
            }
            , block: {
                alignItems: "center",
                marginBottom: 15,
                marginTop: 15,
            },
            block_title: {
                textAlign: "center",
                fontSize: 15,
                fontFamily: 'OratorStd',
            }, block_text: {
                textAlign: "center",
                fontSize: 13,
                fontFamily: 'Guardi-Roman',
                lineHeight: 19
            }, tag: {
                marginRight: 5,
                marginBottom: 9,
                justifyContent: "center",
                padding: 4,
                height: 20,
                paddingRight: 6,
                paddingTop: 1,
                paddingBottom: 0,
                paddingLeft: 6,
                borderRadius: 4,
                backgroundColor: '#c69d8e'
            },
            tagText: {
                fontFamily: 'Guardi-Roman',
                fontSize: 11,

            },
            viewInput: {
                borderColor: '#20201e',
                borderBottomWidth: 1,

                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            }

        });
        let index = 0;
        const data = [
            {key: index++, label: 'Modifier la recette'},
            {key: index++, label: 'Supprimer la recette'},

        ];
        var titleConfig = <Image style={{marginBottom:2,width:92}} resizeMode={"contain"} source={require('image!./../../img/season/logo.png')}/>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop:15,marginLeft:10}} onPress={this.menuLeft}><Image
            source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>

        var rightButtonConfig = <ModalPicker
            data={data}
            style={{marginTop:-18,marginRight:10}}
            optionStyle={{height:50,justifyContent:"center"}}
            optionTextStyle={{paddingTop:0}}
            cancelText="Annuler"
            onChange={(option)=>{ this.handleSelectModal(option.key) }}><Image
            style={{marginTop:0,width:22}} resizeMode={"contain"}
            source={require('image!./../../img/moncookout/edit.png')}/></ModalPicker>;
        if (this.props.user == null || this.props.recipe == null) {
            return (
                <View style={styles.bg}>

                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        tintColor={"#fff"}/>
                    <View style={{flex:1,justifyContent:'center',width:null,height:null}}>
                        <LoadingOverlay visible={true} text=""/>
                    </View>
                    <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                        <MenuTab option_back={this.props.name} page={"moncookout"}/>
                    </View>
                </View>)
        }

        else {
            var recipe = this.props.recipe;
            var image_main = null;
            var image_main_blur = null;
            if (typeof recipe.img[0] !== "undefined") {

                image_main = APIRoot + "/images/recipe/" + recipe.img[0].path;
                image_main_blur = APIRoot + "/images/recipe/blur/" + recipe.img[0].path;

                // image_main = APIRoot + "/images/recipe/" + recipe.img[0].path;
            }
            else {
                image_main = null;
            }
            var height_image = height - 55;


            var bloc_image = null;
            if (image_main !== null) {
                bloc_image = <View style={{position:"relative"}}>
                    <CachedImage
                        source={{uri:image_main}} style={[{height:height_image,flex: 1}]}/>

                </View>

            }// <Image source={{uri:image_main}} style={{height:height_image,flex: 1}}/>
            else {
                bloc_image = <Image source={require('image!./../../img/default_img/placeholder-recipe.png')}
                                    style={{height:height_image,width:width,flex: 1}}/>

            }
            var name = "";

            if (typeof recipe.owner !== "undefined" && recipe.owner.id_user == null) {
                name = <TouchableOpacity onPress={()=>Actions.thecookout({id_user_external: recipe.user.id_user})}><Text
                    style={styles.By}>{recipe.user.first_name + " " + recipe.user.last_name.toUpperCase().substr(0, 1) + "."}</Text></TouchableOpacity>
            }
            else {
                name =
                    <TouchableOpacity onPress={()=>Actions.thecookout({id_user_external: recipe.owner.id_user})}><Text
                        style={styles.By}>{recipe.owner.first_name + " " + recipe.owner.last_name.toUpperCase().substr(0, 1) + "."}</Text></TouchableOpacity>
            }
            var date_created = null;
            if (typeof recipe.date_updated !== "undefined" && recipe.date_updated !== null) {
                var frLocale = require('moment/locale/fr');
                var m = moment.locale('fr');

                if (moment(recipe.date_updated).format("DD-MM-YYYY") != moment().format("DD-MM-YYYY")) {

                    var date_created = <View style={{ flexDirection: 'row'}}>
                        <Icon name="ios-time-outline" size={13} style={{marginTop:3,marginRight:5}}/><Text
                        style={[styles.created,{fontSize:12}]}>{moment(recipe.date_updated).format("DD.MM.YY")}</Text></View>;
                }
                else {

                    var date_created = <View style={{ flexDirection: 'row'}}>
                        <Icon name="ios-time-outline" size={13} style={{marginTop:3,marginRight:5}}/><Text
                        style={[styles.created,{fontSize:12}]}>{moment.utc(recipe.date_updated).from(
                        moment.utc())}</Text></View>;
                }

            }
            var ingredient = null;
            if (recipe.ingredient != null && recipe.ingredient.trim().length > 0) {
                ingredient = <View style={styles.block}>
                    <Text style={styles.block_title}>Ingrédients</Text>
                    <Text style={styles.block_text}>{recipe.ingredient.trim()}</Text>
                </View>;
            }
            var content = null;
            if (recipe.content != null && recipe.content.trim().length > 0) {
                content = <View style={styles.block}>
                    <Text style={styles.block_title}>Description</Text>
                    <Text style={[styles.block_text,{textAlign:"justify"}]}> {recipe.content.trim()}</Text>
                </View>;
            }
            var url = null;
            if (recipe.website != null && recipe.website.trim().length > 0) {
                var url = <View
                    style={[styles.block,{alignItems:"stretch",borderBottomWidth:1,borderColor:"#000",paddingLeft:10,paddingBottom:7,width:(width-4*padding)}]}>
                    <TouchableOpacity

                        onPress={this.handleClick.bind(this,recipe.website)}>
                        <View style={{flexDirection: 'row',flex:1}}>
                            <Icon name="ios-link" size={18} style={{marginRight:10}}/>
                            <Text
                                style={{textAlign:"left", fontSize: 13,fontFamily: 'Guardi-Roman',}}>{this.extractDomain(recipe.website)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }

            var list_tags = [];
            var color = ['#a0d0cb', '#e4e392', '#d0d0ce', '#fdcf8b', "#e4bfc3", '#c69d8e'];
            var color_bg = _.sample(color);

            var tag = null;
            for (var i in this.props.recipe.tags) {
                list_tags.push(this.props.recipe.tags[i]);
            }
            tag =
                <View
                    style={{  paddingTop:5,paddingBottom:5,marginTop:10,marginBottom:10,flex:1,left:0,  flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        list_tags.map(function (tag, index) {
                            return (
                                <View key={index} style={[styles.tag,{backgroundColor:_.sample(color)}]}>
                                    <Text style={styles.tagText}>#{tag}</Text>
                                </View>)
                        }, this)
                    }</View>;
        }

        return (


            <View style={styles.bg}>

                <ParallaxScrollView

                    contentBackgroundColor="#fff"
                    parallaxHeaderHeight={height_image}
                    renderBackground={()=>bloc_image}
                    renderFixedHeader={()=>(  <NavigationBar
                       leftButton={leftButtonConfig}
                       rightButton={rightButtonConfig}
                    style={styles.navbar}
                    title={titleConfig}
                    tintColor={"#fff"}/>)
                    }
                    renderForeground={() => (<View style={styles.placeholder}>
                        <Text style={styles.title}>{recipe.title}</Text>
                        <View style={{flexDirection: 'row'}}><Text style={styles.created}>créée par </Text><View>{ name}</View></View>
                       {date_created}
                    </View>)}>
                    <View >
                        <Like id_user={this.props.user.id} id_recipe={recipe.id_recipe}/>
                        <PostedBy id_user={recipe.user.id_user} id_recipe={recipe.id_recipe}/>
                        {recipe != null && recipe.img != null && Object.keys(recipe.img).length > 0 &&
                        <ListImage list={recipe.img}/>}
                        <View style={{paddingLeft:padding,paddingRight:padding,alignItems:"center" }}>
                            {ingredient}
                            {content}
                        </View>

                        <View
                            style={[styles.viewInput,{borderBottomWidth:0,paddingRight:padding,paddingLeft:padding,justifyContent:'center'}]}>
                            {tag}
                        </View>
                        <View
                            style={{paddingLeft:padding,paddingRight:padding,alignItems:"center",marginBottom:25,paddingBottom:40 }}>
                            {url}
                        </View>
                    </View>
                </ParallaxScrollView>
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name} page={"moncookout"}/>
                </View>
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    token: state.session.token,
    user: state.session.user,
    recipe_delete: state.recipe.recipe_delete,
    my_recipe: state.recipe.my_recipe,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_recipe: bindActionCreators(RecipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
