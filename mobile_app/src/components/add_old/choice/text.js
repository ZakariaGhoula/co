import React, { Component } from 'react';
import {Text,TextInput,ScrollView,View,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";


export default class TextOption extends React.Component {
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
        this.props.handleText(this.state.preparation, this.state.ingredient);

    }

    componentWillUpdate(nextProps, nextState) {

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
                </View>
            </View>

        );
    }
}

