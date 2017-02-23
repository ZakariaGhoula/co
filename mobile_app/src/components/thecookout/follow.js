import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native';

import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';
import { connect }            from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import LoadingOverlay from 'react-native-loading-overlay';
import * as VisitorActions    from './../../actions/VisitorActions';
class Follow extends React.Component {
    constructor(props) {
        super(props);


        this.state ={
            has_click:false
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleUnLike = this.handleUnLike.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.network_visitor !== nextProps.network_visitor || this.state.has_click!==nextState.has_click)
    }

    componentWillUpdate(nextProps,nextState){

        if(!this.state.has_click && nextState.has_click)(
            this.setState({
                has_click:false
            })
        )
    }

    handleLike() {
        if(!this.props.isRequesting && !this.state.has_click){
            this.props.actions_visitor.addNetwork(this.props.token, this.props.id_user, this.props.id_user_external);
            this.setState({has_click:true});
        }

        // this.props.actions_recipe.addLikeRecipe(this.props.token, this.props.id_user, this.props.id_recipe);
    }

    handleUnLike() {
        if(!this.props.isRequesting && !this.state.has_click){

            this.props.actions_visitor.removeNetwork(this.props.token, this.props.id_user, this.props.id_user_external)
            this.setState({has_click:true});
        }

        //this.props.actions_recipe.removeLikeRecipe(this.props.token, this.props.id_user, this.props.id_recipe);
    }

    render() {

        var {height, width} = Dimensions.get('window');

        var padding = ((width * 0.06) );


        var styles = StyleSheet.create({
            main: {

                alignItems:"center",
backgroundColor:"transparent",
                marginTop: 20,
                padding: padding,
                paddingTop:0,
                paddingBottom: 0

            },
            label: {
                fontFamily: 'OratorStd', fontSize: 12, textAlign: "center", marginTop: 6,
                backgroundColor:"transparent"
            }

            , button: {
                padding: 3,
                paddingLeft:3,
                paddingRight:3,
                borderWidth: 1,
                borderColor: "#aaa",
                alignItems: "center",
                backgroundColor:"transparent"
            }
        });

        var number = null;
        var button = null;
        if (this.props.follow != null) {

            /* if(this.props.followers.liked){
             button = <TouchableOpacity onPress={this.handleUnLike}><Icon name="ios-heart" size={22} style={{marginRight:5,color:"#fdaa69"}}/></TouchableOpacity>
             }
             else{
             button = <TouchableOpacity onPress={this.handleLike}><Icon name="ios-heart-outline" size={22} style={{marginRight:5}}/></TouchableOpacity>
             }*/
            var follower = false;
            follower = this.props.follow.filter(function (follower) {


                    return follower.id == this.props.id_user;

                }, this).length > 0;

            if (follower)
                button = <TouchableOpacity style={[styles.button,{borderColor:"#fdaa69",backgroundColor:"#fdaa69"}]}onPress={this.handleUnLike}><Text
                    style={[styles.label,{color:"#fff"}]}>{this.props.user.gender == "female" ? "Abonnée" : "Abonné"}</Text></TouchableOpacity>
            else
                button = <TouchableOpacity style={styles.button}  onPress={this.handleLike}><Text style={[styles.label]}>S'abonner</Text></TouchableOpacity>
        }

        return (
            <View style={styles.main}>
                <View style={{flex:0.8}}></View>
                <View style={{flex:0.2,flexDirection: 'row',}}>
                    {button}
                    {number}
                </View>
                {this.props.isRequesting &&   <LoadingOverlay visible={true} text=""/>}


            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.session.token,
    network_visitor: state.visitor.network_visitor,
    user: state.session.user,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),

    actions_visitor: bindActionCreators(VisitorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Follow);
