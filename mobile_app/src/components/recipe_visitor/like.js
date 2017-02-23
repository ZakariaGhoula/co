import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';
import { connect }            from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

class Like extends React.Component {
    constructor(props) {
        super(props);

        this.handleLike = this.handleLike.bind(this);
        this.handleUnLike = this.handleUnLike.bind(this);
    }

    componentWillMount() {
        this.props.actions_recipe.getLikeRecipe(this.props.token, this.props.id_user, this.props.id_recipe);
    }




    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.like_recipe !== nextProps.like_recipe)
    }

    handleLike(){
        this.props.actions_recipe.addLikeRecipe(this.props.token, this.props.id_user, this.props.id_recipe);
    }handleUnLike(){
        this.props.actions_recipe.removeLikeRecipe(this.props.token, this.props.id_user, this.props.id_recipe);
    }

    render() {
        var {height, width} = Dimensions.get('window');

        var padding = ((width * 0.06) );


        var styles = StyleSheet.create({
            main: {

                flexDirection: 'row',
                marginTop: 3,
                padding: padding,
                paddingBottom: 0

            },
             label: {
                fontFamily: 'OratorStd', fontSize: 13, textAlign: "center",marginTop:6
            }


        });

        var number = null;
        var button = null;
        if (this.props.like_recipe != null) {
            number = <Text style={styles.label}>{this.props.like_recipe.nbr}</Text>
            if(this.props.like_recipe.liked){
                button = <TouchableOpacity onPress={this.handleUnLike}><Icon name="ios-heart" size={22} style={{marginRight:5,color:"#fdaa69"}}/></TouchableOpacity>
            }
            else{
                button = <TouchableOpacity onPress={this.handleLike}><Icon name="ios-heart-outline" size={22} style={{marginRight:5}}/></TouchableOpacity>
            }

        }

        return (
            <View style={styles.main}>
                <View style={{flex:0.8}}></View>
                <View style={{flex:0.2,flexDirection: 'row',}}>
                    {button}
                    {number}
                </View>


            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.session.token,
    like_recipe: state.recipe.like_recipe,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_recipe: bindActionCreators(RecipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Like);
