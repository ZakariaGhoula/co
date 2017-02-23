import React, { Component } from 'react';
import {Text,Animated,View,Image,ScrollView,StyleSheet,TextInput,ActivityIndicator,TouchableHighlight,TouchableOpacity,Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-redux-router';
import {APIRoot} from './../../constants/config_path';
import {capitalize} from './../../actions/ConfigActions';
import moment from 'moment';

import {CachedImage} from "react-native-img-cache";
export default class NewsfeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadImg: true,
            thumbnailOpacity: new Animated.Value(0),
            thumbnailMain: new Animated.Value(1)
        }
        this.onLoad = this.onLoad.bind(this);
        this.onTHumbnailLoad = this.onTHumbnailLoad.bind(this);


        this.handlePress = this.handlePress.bind(this);


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

    /*  <Image
     onLoadEnd={(e) => this.setState({loadImg: false})}
     style={{flex:1,width:  this.props.width_element -10,height:(this.props.recipe.img[0].size[1]*(this.props.width_element -10)/(this.props.recipe.img[0].size[0]))}}
     source={{uri: APIRoot + "/images/recipe/" +this.props.recipe.img[0].path}}>

     {this.state.loadImg && <View
     style={{backgroundColor:'rgba(0,0,0,0.4)',
     alignItems:"center",justifyContent:"center",top:0,width:  this.props.width_element -10,
     height:(this.props.recipe.img[0].size[1]*(this.props.width_element -10)/(this.props.recipe.img[0].size[0]))}}><ActivityIndicator
     animating={ this.state.loadImg }/></View>}
     </Image>*/
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.thumbnailOpacity !== nextState.thumbnailOpacity
        || this.state.thumbnailMain !==nextState.thumbnailMain)
    }

    handlePress(id) {

        if (this.props.user.id == this.props.recipe.user.id_user) {
            Actions.myrecipe({id_recipe: id, recipe: this.props.recipe});
        }
        else {
            Actions.recipe_visitor({id_recipe: id, recipe: this.props.recipe});


        }
    }

    render() {

        var styles = StyleSheet.create({
            link: {
                flex: 1,
                alignItems: 'stretch',
                bottom: 0,

                backgroundColor: 'transparent',
                borderColor: '#c7c7c7',
                borderTopWidth: 0,

                borderBottomWidth: 0
            },
            linkView: {},
            TextView: {

                flex: 1,
                marginLeft: 0,

                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
            },

            NextView: {

                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: 15,
            },
            text: {
                color: '#3a4750',

            },
            item: {
                flexDirection: 'column',
                backgroundColor:  '#ede4e1' ,
                borderWidth: 0,

                borderBottomWidth:1,
                borderColor: '#c7c7c7',
                marginRight: 10,
                marginTop: 15,
            },
            By: {
                fontSize: 8,
                marginTop: 5,
                fontFamily: 'OratorStd',
            }
        });


        var profilePicture = null;
        var image_main = null;
        var image_main_blur = null;
        if (this.props.recipe != null && typeof this.props.recipe.img !== "undefined" && this.props.recipe.img != null && typeof this.props.recipe.img !== "undefined" && typeof this.props.recipe.img[0] !== "undefined" && this.props.recipe.img[0].path != "") {
            image_main = APIRoot + "/images/recipe/" + +this.props.recipe.img[0].path;
            image_main_blur = APIRoot + "/images/recipe/blur/" + +this.props.recipe.img[0].path;
        }
        else {
            image_main = null;
        }


        var date_created = null;
        if (typeof this.props.recipe.date_updated !== "undefined" && this.props.recipe.date_updated !== null) {
            var frLocale = require('moment/locale/fr');
            var m = moment.locale('fr');

            if (moment(this.props.recipe.date_updated).format("DD-MM-YYYY") != moment().format("DD-MM-YYYY")) {

                var date_created = <View
                    style={{ flexDirection: 'column',backgroundColor:"transparent",   marginTop:1,marginBottom:5 }}>
                    <Icon name="ios-time-outline" size={13}
                          style={{marginTop:3,marginRight:5,textAlign:"center"}}/><Text
                    style={[styles.created,{fontSize:10,textAlign:"center",fontFamily: 'Guardi-Roman',}]}>le {moment(this.props.recipe.date_updated).format("DD.MM")}</Text></View>;
            }
            else {
                var date_created = <View
                    style={{ flexDirection: 'column',backgroundColor:"transparent",marginTop:1,marginBottom:5 }}>
                    <Icon name="ios-time-outline" size={13}
                          style={{marginTop:3,marginRight:5,textAlign:"center"}}/><Text
                    style={[styles.created,{fontSize:10,flex:1,textAlign:"center",fontFamily: 'Guardi-Roman',}]}>{moment.utc(this.props.recipe.date_updated).from(
                    moment.utc())}</Text></View>;
            }

        }
        var icon_like = (this.props.recipe.liked == true) ?
            <Icon name="ios-heart" size={13}
                  style={{marginTop:3,marginRight:5,textAlign:"center"}}
                  color="#000"/> : <Icon name="ios-heart-outline" size={13}
                                         style={{marginTop:3,marginRight:5,textAlign:"center"}}
                                         color="#000"/>;
        var like = null;
        like = <View style={{ flexDirection: 'column',backgroundColor:"transparent",marginTop:0,marginBottom:0 }}>
            {icon_like}<Text
            style={[styles.created,{fontSize:10,flex:1,textAlign:"center",fontFamily: 'Guardi-Roman',}]}>{this.props.recipe.nbr}</Text></View>;

        var created_by = null
        if (typeof this.props.recipe.owner !== "undefined" && this.props.recipe.owner.id_user == null) {
            created_by =
                <TouchableOpacity
                    onPress={()=>Actions.thecookout({id_user_external: this.props.recipe.user.id_user})}><Text
                    style={styles.By}>Créée
                    par {this.props.recipe.user.first_name + " " + this.props.recipe.user.last_name.toUpperCase().substr(0, 1) + "."}</Text></TouchableOpacity>
        }
        else if (this.props.recipe.owner !== "undefined" && this.props.recipe.owner.id_user !== null) {
            created_by =
                <TouchableOpacity onPress={()=>Actions.thecookout({id_user_external: this.props.recipe.owner.id_user})}><Text
                    style={styles.By}>Créée
                    par {this.props.recipe.owner.first_name + " " + this.props.recipe.owner.last_name.toUpperCase().substr(0, 1) + "."}</Text></TouchableOpacity>
        }
        var posted_by = null

        posted_by =
            <TouchableOpacity
                onPress={()=>Actions.thecookout({id_user_external: this.props.recipe.user.id_user})}><Text
                style={styles.By}>Postée
                par {this.props.recipe.user.first_name + " " + this.props.recipe.user.last_name.toUpperCase().substr(0, 1) + "."}</Text></TouchableOpacity>


        var final_bloc = null;
        if (image_main == null) {
            final_bloc = <TouchableOpacity style={styles.link} onPress={this.handlePress.bind(this,null)}>
                <Image source={require('./../../../img/default_img/placeholder-newsfeed.png')}
                       style={{position:"relative",flex:1,width: 146*(this.props.width_element -10)/146,height:153*(this.props.width_element-10)/145}}>
                    <View
                        style={{ flexDirection: 'row',backgroundColor:"transparent",position:"absolute",paddingLeft:6,paddingTop:7,paddingRight:5,bottom:0,left:0,right:0}}>
                        <View style={{flex:0.7}}>
                            <Text
                                style={{textAlign:"left",fontFamily: 'Guardi-Roman',fontSize:12,marginBottom:4}}>{capitalize(this.props.recipe.title)}</Text>
                            <View style={{ flexDirection: 'column',backgroundColor:"transparent"}}>
                                {posted_by}
                                {created_by}
                            </View>
                        </View>
                        <View style={{flex:0.3}}>{like}{date_created}</View>
                    </View>

                </Image>

            </TouchableOpacity>

        }
        else {
            final_bloc = <TouchableOpacity style={styles.link} onPress={this.handlePress.bind(this,null)}>
                <View style={{position:"relative"}}>
                    <CachedImage

                        source={{uri:APIRoot+"/images/recipe/" +this.props.recipe.img[0].path}}
                        style={{flex:1,zIndex :2,width:  this.props.width_element -10,height:(this.props.recipe.img[0].size[1]*(this.props.width_element -10)/(this.props.recipe.img[0].size[0]))}}
                    />

                </View>

                <View
                    style={{ flexDirection: 'row',backgroundColor:"#F7E4DE",paddingTop:7, paddingLeft:6,paddingRight:5}}>
                    <View style={{flex:0.7}}>
                        <Text
                            style={{textAlign:"left",fontFamily: 'Guardi-Roman',fontSize:12,marginBottom:4}}>{this.props.recipe.title}</Text>
                        <View style={{ flexDirection: 'column',backgroundColor:"transparent"}}>
                            {posted_by}
                            {created_by}
                        </View>
                    </View>
                    <View style={{flex:0.3}}>{like}{date_created}</View>
                </View>
            </TouchableOpacity>
        }
        /*
         if (this.props.recipe != null && typeof this.props.recipe.img !== "undefined" && this.props.recipe.img != null && typeof this.props.recipe.img[0] !== "undefined" && this.props.recipe.img[0].base_64 != "") {


         profilePicture =
         <View style={{flex:1,width: this.props.width_element -10}}>
         <Image
         style={{flex:1,width:  this.props.width_element -10,height:(this.props.recipe.img[0].size[1]*(this.props.width_element -10)/(this.props.recipe.img[0].size[0]))}}
         source={{uri: APIRoot + "/images/recipe/" +this.props.recipe.img[0].path}}/>
         </View>

         }
         else {
         profilePicture = <Image source={require('./../../../img/placeholder/placeholder-green.jpg')}
         style={{flex:1,width: this.props.width_element -10,height:this.props.width_element-10}}/>
         }*/

        var img = null;

        return (
            <View style={[styles.item, {width: this.props.width_element - 10}]}>
                {final_bloc}

            </View>
        );
    }
}