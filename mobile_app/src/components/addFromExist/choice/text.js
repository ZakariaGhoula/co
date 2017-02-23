import React, { Component } from 'react';
import {Text,TextInput,ScrollView,View,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as RecipeActions    from './../../../actions/RecipeActions';
import LoadingOverlay from 'react-native-loading-overlay';

class TextOption extends React.Component {
    constructor(props) {
        super(props);

        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handlePreparationChange = this.handlePreparationChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            preparation: this.props.preparation,
            ingredient: this.props.ingredient,
            isValidLink: false,
            connexionPress: false,
            textToShow: null
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.preparation !== this.state.preparation
            || nextState.ingredient !== this.state.ingredient
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
            || nextProps.isRequesting !== this.props.isRequesting
            || nextProps.processing_recepie !== this.props.processing_recepie
        )
    }


    handleIngredientChange(text) {
        this.setState({
            ingredient: text,

        });
    }

    handlePreparationChange(text) {
        this.setState({
            preparation: text,

        });
    }


    handleClick(event) {
        this.setState({textToShow: null});
        if (this.state.preparation.trim().length == 0 && this.state.ingredient.trim().length == 0)
            this.props.handleText(this.state.preparation, this.state.ingredient);
        else if (this.props.token != null && this.props.processing_recepie !== null) {
            var data = {};
            data['content'] = this.state.preparation
            data['ingredient'] = this.state.ingredient
            data['id_recepie'] = this.props.processing_recepie.id_recipe
            this.props.actions_recipe.updateRecipeTEXT(this.props.token, data);
            this.setState({connexionPress: true})
            this.props.handleText(this.state.preparation, this.state.ingredient);
        }

    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.connexionPress && nextProps.processing_recepie != null
            && nextProps.processing_recepie.content !== "undefined"
            && nextProps.processing_recepie.content == this.state.preparation
            && nextProps.processing_recepie.ingredient == this.state.ingredient
        ) {
            this.props.handleText(this.state.preparation, this.state.ingredient);
            this.setState({connexionPress: false})
        }
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
                borderColor: '#dddddd',
                borderWidth: 1,
                height: 100,
                marginBottom: 10,
                paddingTop: 0,

            }, textInput: {
                fontSize: 14,

                fontFamily: 'Guardi-Roman',
                color: '#20201e',
                borderWidth: 0,
                backgroundColor: "#fff",
                paddingLeft: 5,
                textAlign: 'left',
                height: 320,
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
                marginTop: 70
            }, textLogin: {

                fontSize: 15,

            }

        });


        return (
            <View style={{ height:1000}}>
                <View style={[styles.bg]}>
                    {this.state.textToShow != null
                    &&
                    <View style={styles.viewTextStatut}>
                        <Text
                            style={{flex:1,textAlign:"center",color:"#c41e26", fontFamily: 'Guardi-Roman'}}>{this.state.textToShow}</Text>
                    </View>
                    }
                    <View style={{flex:1}}>
                        <View style={[styles.viewInput,{marginTop:20,height:200}]}>
                            <TextInput
                                autoCorrect={true}
                                ref="email"
                                multiline={true}
                                enablesReturnKeyAutomatically={true}
                                value={this.state.ingredient}
                                defaultValue={this.state.ingredient}
                                onChangeText={this.handleIngredientChange.bind(this)}
                                placeholder="Ingrédients (facultatif)"
                                placeholderTextColor="#20201e"

                                style={[styles.textInput,{height:320}]}
                            />
                        </View>

                        <View style={[styles.viewInput,{marginTop:0,height:320}]}>
                            <TextInput
                                autoCorrect={true}
                                ref="email"
                                multiline={true}
                                value={this.state.preparation}
                                defaultValue={this.state.preparation}
                                onChangeText={this.handlePreparationChange.bind(this)}
                                placeholder="Préparation (facultatif)"
                                placeholderTextColor="#20201e"
                                style={[styles.textInput,{height:320}]}
                            />
                        </View>

                        <TouchableOpacity style={[styles.viewLogin,{marginTop:5,marginLeft:10}]}
                                          underlayColor='transparent'
                                          onPress={this.handleClick.bind(this)}>
                            <Text style={{fontFamily: 'OratorStd',
                fontSize: 14,
                lineHeight: 15,
                textAlign: "center",
                backgroundColor: "transparent",
                color: "#000",

                textDecorationLine:"underline"}}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.isRequesting &&
                    <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                        <LoadingOverlay visible={true} text=""/>
                    </View>
                    }
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextOption);

