import React, { Component } from 'react';
import {Dimensions,Animated,Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView,TouchableOpacity,Linking,PickerIOS} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';
import { connect }            from 'react-redux';

import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

import {CachedImage} from "react-native-img-cache";
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

class RecipeVisitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open_menu_right: false,
            position: 0,
            nbr_recipe: (this.props.my_recipes == null) ? 0 : Object.keys(this.props.my_recipes).length,
            loadImg: true,
            thumbnailOpacity: new Animated.Value(0),
            thumbnailMain: new Animated.Value(1)
        }

        this.menuLeft = this.menuLeft.bind(this);
        this.menuRight = this.menuRight.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.extractDomain = this.extractDomain.bind(this);
        this.handleSelectModal = this.handleSelectModal.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onTHumbnailLoad = this.onTHumbnailLoad.bind(this);
    }


    componentWillMount() {

        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Recette externe Page');
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
        if (this.props.token != null && this.props.id_recipe != null) {
            //this.props.actions_recipe.retrieveMyRecipe(this.props.token, this.props.id_recipe);
        }


    }

    componentDidMount() {

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

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.last_recipe !== null && nextState.position == 1) {
            this.setState({position: 2});
        }
        if (nextState.position == 2) {
            nextProps.actions_recipe.retrieveMyRecipesRefresh(nextProps.token);
            this.setState({position: 3});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextState.open_menu_right !== this.state.open_menu_right ||
            nextState.position !== this.state.position ||
            nextProps.user_external !== this.props.user_external ||
            nextProps.last_recipe !== this.props.last_recipe ||
            nextState.nbr_recipe !== this.state.nbr_recipe ||
            nextState.thumbnailOpacity !== this.state.thumbnailOpacity ||
            nextState.thumbnailMain !== this.state.thumbnailMain ||

            nextProps.user !== this.props.user/* ||
             nextProps.my_recipe !== this.props.my_recipe*/
        )
    }

    handleSelectModal(option) {
        if (option == 0) {
            if (this.props.token !== null && this.props.recipe.id_recipe)
                this.props.actions_recipe.addQuickRecipe(this.props.token, {id_recepie: this.props.recipe.id_recipe});


            this.setState({position: 1});
        }
        else if (option == 1) {
            Actions.addexistrecepie({recepie: this.props.recipe})
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

    componentWillUnmount() {
        //  this.keyboardDidHideListener.remove()

        this.props.actions_recipe.destroy_lastRecipe();
    }

    menuLeft(e) {
        Actions.pop();
        // this.setState({isOpen: !this.state.isOpen});
    }

    menuRight(e) {

        this.setState({open_menu_right: !this.state.open_menu_right});
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

            }, bravoControler: {
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
        var bravo = null;
        if (this.state.position == 1) {
            bravo = <View style={[styles.bravoControler,{backgroundColor:"transparent"}]}>
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>

                    <LoadingOverlay visible={true} text=""/>


                </View>
            </View>
        }
        let index = 0;
        const data = [
            {key: index++, label: 'Ajouter rapidement la recette'},
            {key: index++, label: 'Modifier et ajouter la recette'},

        ];

        if (this.state.position == 3) {
            if (this.props.last_recipe != null) {
                var nbr_recipes = this.state.nbr_recipe;
                var knifePicture = null;
                var text_knife = null;
                var text_knife2 = null;
                var text_final = null;
                nbr_recipes += 1;

                if (nbr_recipes == 1) {
                    text_final = "C’est votre 1ère recette publiée !"
                    text_knife = "Plus que 4 recettes à poster \n et vous obtiendrez le couteau d'office !";
                    knifePicture = <Image
                        source={require('image!./../../img/moncookout/knife/couteaux_0.png')}/>;
                }
                if (nbr_recipes >= 1 && nbr_recipes < 5)
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
                if (nbr_recipes >= 5 && nbr_recipes < 15) {
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
                if (nbr_recipes >= 15 && nbr_recipes < 30) {
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
                if (nbr_recipes >= 30 && nbr_recipes < 50) {
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
                if (nbr_recipes > 50) {
                    text_final = "C’est votre " + nbr_recipes + "ème recette publiée !";
                    text_knife = null;
                    knifePicture = <Image resizeMode={"contain"}
                                          source={require('image!./../../img/addrecipe/knife/couteaux_5.png')}/>;
                }


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
                        style={{marginTop:15}}
                        underlayColor='transparent'
                        onPress={()=> (Actions.moncookout())}>
                        <Text style={[styles.bravoaddTextLink,{fontSize:12}]}>Retour à mon cookout</Text>

                    </TouchableHighlight>
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


        var titleConfig = <Image style={{marginBottom:2,width:92}} resizeMode={"contain"} source={require('image!./../../img/season/logo.png')}/>;

        var leftButtonConfig = <TouchableOpacity style={{marginTop:15,marginLeft:10}} onPress={this.menuLeft}><Image
            source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>

        var rightButtonConfig = <ModalPicker
            data={data}
            style={{marginTop:12,marginRight:13}}
            optionStyle={{height:50,justifyContent:"center"}}
            optionTextStyle={{paddingTop:0}}
            cancelText="Annuler"
            onChange={(option)=>{ this.handleSelectModal(option.key) }}><Icon size={24}
                                                                              name="ios-bookmark-outline"/></ModalPicker>;


        if (this.props.recipe == null || this.props.user == null) {
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
            }
            else {
                image_main = null;
            }
            var height_image = height - 55;



            var bloc_image = null;
            if (image_main !== null) {
                bloc_image = <View style={{position:"relative",height:height_image,flex: 1}}>
                    <CachedImage

                        source={{uri:image_main}} style={[{height:height_image}]}/>

                </View>
            }
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
                    <Text style={styles.block_text}> {recipe.content.trim()}</Text>
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
                        {recipe != null && recipe.img != null && Object.keys(recipe.img).length >= 1 &&
                        <ListImage list={recipe.img}/>}
                        <View style={{paddingLeft:padding,paddingRight:padding,alignItems:"center" }}>
                            {ingredient}
                            {content}
                        </View>
                        <View style={{paddingLeft:padding,paddingRight:padding}}>
                            {tag}
                        </View>
                        <View
                            style={{paddingLeft:padding,paddingRight:padding,alignItems:"center",marginBottom:25,paddingBottom:35 }}>

                            {url}
                        </View>
                    </View>
                </ParallaxScrollView>
                {bravo}
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name} page={"thecookout"}/>
                </View>
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    token: state.session.token,
    user: state.session.user,
    last_recipe: state.recipe.last_recipe,
    user_external: state.visitor.profile_visitor,
    isRequesting: state.loading.shown,

    my_recipes: state.recipe.my_recipes
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_recipe: bindActionCreators(RecipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeVisitor);
