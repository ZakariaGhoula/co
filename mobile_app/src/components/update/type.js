import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as RecipeActions    from './../../actions/RecipeActions';

import LoadingOverlay from 'react-native-loading-overlay';

class Type extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: (this.props.type),
            text_to_show:"",
            pressed:false,
        }

        this.handleClick = this.handleClick.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.choice != nextState.choice
            || nextProps.isRequesting !== this.props.isRequesting
            || nextProps.processing_recepie !== this.props.processing_recepie
            || this.state.text_to_show != nextState.text_to_show
            || this.state.pressed != nextState.pressed
        );
    }

    handleChoice(choice) {
        this.setState({choice: choice});
    }
    handleClick(){
        this.setState({text_to_show:""})
        if(this.state.choice==0){
            this.setState({text_to_show:"Veuillez séléctionner le mode de publication."})
        }
        else{
            var data = {};
            data['title'] = (this.state.title != null) ? this.state.title.trim() : "";
            data['confidentialite'] =this.state.choice;
            data['id_recepie'] =this.props.processing_recepie.id_recipe;

            this.props.actions_recipe.updateRecipeTYPE(this.props.token, data);
            this.setState({pressed: true});

        }
    }


    componentWillUpdate(nextProps, nextState) {

        if (nextState.pressed && nextProps.processing_recepie != null  && !nextProps.isRequesting   && nextProps.processing_recepie.statut == this.state.choice) {

            this.props.handleType(this.state.choice);
            this.setState({pressed: false})
        }
///
    }
    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) / 2);
        var margin_top_logo = height * 0.15;
        var margin_bottom_logo = height * 0.12;

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: 'transparent',
            },
            navbar: {
                borderColor: '#c7c7c7',
                backgroundColor: "#ffffff",

                shadowColor: "#c7c7c7",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 2,
                    width: 0
                },
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
                marginTop: 69 * width / 320,
                textAlign: "center",
                backgroundColor: "transparent"
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
                marginTop: 30
            }, textLogin: {
                color: (this.state.connexionPress) ? "#fff" : '#000',
                fontSize: 15,

            },
            buttonRound: {
                width: 70 * width / 320,
                height: 104 * width / 320,

                alignItems: "center",
                justifyContent: "center",
                marginRight: 15 * width / 320
            },
            buttonRoundView: {
                borderWidth: 1,
                borderColor: "#9b9b9b",
                borderRadius: (70 * width / 320) / 2,
                width: 70 * width / 320,
                height: 70 * width / 320,
                alignItems: "center",
                justifyContent: "center",
            }, buttonRoundText: {
                fontSize: 9 * width / 320,
                fontFamily: 'OratorStd',
                textAlign: "center",
                marginTop: 8 * width / 320,
                width: 120 * width / 320,
                height: 70 * width / 320,
            },
            buttonRoundInText: {
                fontSize: 11 * width / 320,
                fontFamily: 'Guardi-Roman',
                textAlign: "center",
                width: 58 * width / 320,
            }

        });


        return (


            <View style={styles.bg}>
                {this.state.text_to_show != null
                &&
                <View style={styles.viewTextStatut}>
                    <Text
                        style={{flex:1,textAlign:"center",color:"#c41e26", fontFamily: 'Guardi-Roman'}}>{this.state.text_to_show}</Text>
                </View>
                }
                <View
                    style={{marginTop:35*width/320,paddingLeft:padding,paddingRight:padding,marginBottom:0,alignItems:"center",}}>
                    <View style={{alignItems:"center",flexDirection:"row"}}>
                        <TouchableOpacity
                            onPress={this.handleChoice.bind(this,1)}
                            style={[styles.buttonRound,{marginRight:17,marginLeft:17}]}>
                            <View
                                style={[styles.buttonRoundView,{borderColor:(this.state.choice==1)?"#fdaa69":"#9b9b9b"}]}><Text
                                style={[styles.buttonRoundInText,{color:(this.state.choice==1)?"#fdaa69":"#000"}]}>Publique</Text></View>
                            <Text style={styles.buttonRoundText}>Tout le monde{'\n'}
                                voit votre{'\n'}
                                recette</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handleChoice.bind(this,2)}
                            style={[styles.buttonRound,{marginRight:17,marginLeft:17,borderColor:(this.state.choice==2)?"#fdaa69":"#9b9b9b"}]}>
                            <View
                                style={[styles.buttonRoundView,{borderColor:(this.state.choice==2)?"#fdaa69":"#9b9b9b"}]}><Text
                                style={[styles.buttonRoundInText,{color:(this.state.choice==2)?"#fdaa69":"#000"}]}>Privée</Text></View>
                            <Text style={styles.buttonRoundText}>Vous êtes{'\n'}
                                seul(e) à pouvoir{'\n'}
                                consulter{'\n'}
                                votre recette</Text>
                        </TouchableOpacity>



                    </View>
                    {this.props.isRequesting &&
                    <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                        <LoadingOverlay visible={true} text=""/>
                    </View>
                    }
                    <View
                        style={{alignItems:"center",marginTop:20, marginBottom:70*(width/320),justifyContent:'center',flex:1,flexDirection: 'row'}}>

                        <TouchableOpacity style={[styles.viewLogin,{marginTop:5,marginLeft:10}]}
                                          underlayColor='transparent'
                                          onPress={this.handleClick.bind(this)}>
                            <Text style={{fontFamily: 'OratorStd',
                fontSize: 14,
                lineHeight: 15,
                textAlign: "center",
                backgroundColor: "transparent",
                color: "#000",

                textDecorationLine:"underline"}}>Terminer</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Type);
