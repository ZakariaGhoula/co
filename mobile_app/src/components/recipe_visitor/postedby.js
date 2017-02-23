import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableHighlight,TouchableOpacity,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';
import { connect }            from 'react-redux';
import {Actions} from 'react-native-redux-router';

 class PostedBy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

     componentWillMount(){

       this.props.actions_recipe.getPosterRecipe(this.props.token,this.props.id_user);
     }


     shouldComponentUpdate(nextProps,nextState){
         return (this.props.poster_recipe!==nextProps.poster_recipe)
     }

    render() {
        var {height, width} = Dimensions.get('window');

        var padding = ((width * 0.06) );


        var styles = StyleSheet.create({
            main: {

                flexDirection: 'row',
                marginTop:1,

                padding:padding

            },
            nbr: {
                fontFamily: 'GuardiLTStd-BlackItalic', fontSize: 13*(width/320), textAlign: "center"
            }, label: {
                fontFamily: 'OratorStd', fontSize: 11*(width/320), textAlign: "center"
            },

            pict: {height: width * 0.14, borderRadius: width * 0.14 / 2, width: width * 0.14},
            name: {

                marginBottom: 0,
                marginTop: 2,
                textAlign: "left",
                fontFamily: 'GuardiLTStd-BlackItalic',
                fontStyle: "italic",
                fontSize: 12*(width/320)
            },
            basicText: {flex: 1, marginBottom: 1, textAlign: "left", fontFamily: 'Guardi-Roman', fontSize: 11*(width/320)},
            basicDesc: { marginBottom: 1, textAlign: "left", fontFamily: 'Guardi-Roman', fontSize: 11*(width/320)}
        });


        var name = null;
        var age = null;
        var level = null;
        var image = null;

        var profilePicture = null;
        var follower = <View style={{flex:1,flexDirection: 'row',alignItems:"stretch"}}><Text style={styles.basicDesc}>{"0 follower"}</Text></View>;
        if(this.props.poster_recipe!=null){


            if (  this.props.poster_recipe.user.path != null &&  this.props.poster_recipe.user.path != "") {
                var profilePicture = <Image source={{uri:APIRoot+"/images/users/"+ this.props.poster_recipe.user.path}}
                                            style={styles.pict}/>

            }
            else if ( this.props.poster_recipe.user.path  != null &&  this.props.poster_recipe.user.path == "") {
               if(this.props.poster_recipe.user.gender!=null && this.props.poster_recipe.user.gender=="female"){
                    var profilePicture =  <Image source={require('./../../../img/default_img/placeholder-women.png')}
                                                 style={styles.pict}/>;
                }
                else{
                    profilePicture = <Image source={require('./../../../img/default_img/placeholder-men.png')}
                                            style={styles.pict}/>;
                }
            }


            name = <Text style={styles.name}>{this.props.poster_recipe.user.first_name}</Text>;
            age = <Text style={styles.basicDesc}>{", "+this.props.poster_recipe.user.range_age+" ans"}</Text>;
            var l = this.props.poster_recipe.user.level;
            var new_level = _.filter(OPTIONS_LEVEL, function (el) {
                return (parseInt(el["value"]) == this.props.poster_recipe.user.level);
            },this);
            level = typeof new_level[0] !== "undefined" ? <Text style={[styles.basicDesc]}>{(new_level[0].label)}</Text> : null;


            if(this.props.poster_recipe.follower>1){
                follower = <View style={{flex:1,flexDirection: 'row',alignItems:"stretch"}}><Text
                    style={styles.basicDesc}>{this.props.poster_recipe.follower +" followers"}</Text></View>;
            }
            else {
                follower = <View style={{flex:1,flexDirection: 'row',alignItems:"stretch"}}><Text
                    style={styles.basicDesc}>{this.props.poster_recipe.follower +" follower"}</Text></View>;
            }
        }
/*   <View style={{flex:1,flexDirection: 'row',alignItems:"stretch"}}>{level}</View>*/
        return (
            <TouchableOpacity onPress={()=>Actions.thecookout({id_user_external:this.props.poster_recipe.user.id})} style={styles.main}>

                <View style={{flex:0.2,justifyContent:"center",}}>{profilePicture}</View>
                <View style={{flex:0.8}}>
                    <Text style={styles.basicText}>Postée par</Text>
                    <View style={{flex:1,flexDirection: 'row',alignItems:"stretch"}}>{name}</View>
                    {follower}
                </View>


            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.session.token,
    poster_recipe: state.recipe.poster_recipe,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_recipe: bindActionCreators(RecipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostedBy);
