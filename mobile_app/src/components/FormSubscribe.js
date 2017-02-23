import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight,Picker} from 'react-native';
import {APIRoot} from './../constants/config_path';
import {Actions} from 'react-native-redux-router';
import {OPTIONS_TRANCHE_AGE,OPTIONS_CIVILITE,OPTIONS_LEVEL,OPTIONS_LANGUE} from './../constants/config';
import NavigationBar from 'react-native-navbar';
import * as ConfigActions    from './../actions/ConfigActions';
import * as SessionActions    from './../actions/SessionActions';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { RadioButtons,SegmentedControls } from 'react-native-radio-buttons'
import Storage from 'react-native-storage';
class FormSubscribe extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeLangue = this.handleChangeLangue.bind(this);
        this.handleChangeCivilite = this.handleChangeCivilite.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleValid = this.handleValid.bind(this);
        this.state = {
            langue: {
                label: 'Français',
                value: 'fr_FR'
            },
            civilite: {label: "Femme", value: "female"},
            age: null,
            level: null,
        }
    }


    handleChangeLangue(e) {
        this.setState({
            langue: e
        })
    }

    handleSkip() {
        if (this.props.token != "null") {
            storage.remove({
                key: 'loginState'
            });
            this.props.actions_sessions.skipForm(this.props.token);
        }
        else {
            alert('Connexion impossible');
        }
    }

    handleChangeCivilite(e) {

        this.setState({
            civilite: e
        })
    }

    handleChangeAge(e) {
        this.setState({
            age: e
        })
    }

    handleChangeLevel(e) {

        this.setState({
            level: e
        })
    }

    handleValid(e) {

        var data = {
            'level': (this.state.level != null) ? this.state.level.value : null,
            'age': (this.state.age != null) ? this.state.age.value : null,
            'civilite': (this.state.civilite != null) ? this.state.civilite.value : null,
            'langue': (this.state.langue != null) ? this.state.langue.value : 'fr_FR',
        }

        if (this.props.token != "null") {
            storage.remove({
                key: 'loginState'
            });
            this.props.actions_sessions.saveForm(this.props.token, data);
        }
        else {
            alert('Connexion impossible');
        }
    }

    componentDidMount() {

        this.props.actions.retrieveListLangue();

    }


    componentWillUpdate(nextProps, nextState) {

        if (nextProps.list_langue == null && !nextProps.isRequesting && nextProps.statusText == null) {
            this.props.actions.retrieveListLangue();
        }

        if (nextProps.token != null && nextProps.user_id != null && nextProps.form_skiped != null && nextProps.form_skiped == 1) {


            storage.save({
                key: 'loginState',   // Note: Do not use underscore("_") in key!
                rawData: {
                    from: 'Cookout',
                    userid: nextProps.user_id,
                    token: nextProps.token,
                    form_skiped:1
                },

                // if not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: null
            });

            Actions.newsfeed();
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.langue !== this.state.langue
            || nextState.civilite !== this.state.civilite
            || nextState.age !== this.state.age
            || nextProps.list_langue !== this.props.list_langue
            || nextProps.isRequesting !== this.props.isRequesting
            || nextProps.user !== this.props.user
            || nextProps.form_skiped !== this.props.form_skiped

        )
    }

    render() {


        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#ccd1b5'
            },
            view: {
                flex: 1,
                justifyContent: 'center',

                paddingBottom: 20,
                paddingTop: 20,

            },
            beer: {
                flex: 1,
            },
            text: {
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
            },
            textInput: {
                fontSize: 14,
                height: 40,

                color: 'white',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            }, hr: {
                borderColor: '#838182',
                borderWidth: 1,
            },
            viewInput: {
                borderColor: '#ccc',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 10,
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            },
            viewFacebook: {
                height: 40,
                marginBottom: 20,

                flexDirection: 'row',
                position: 'relative',
                /*backgroundColor: '#2d609b',
                 */backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 30,
            }, btnFacebook: {
                height: 40,
                marginBottom: 40,
                flexDirection: 'row',
                position: 'relative',

                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',

            },
            viewOr: {
                height: 16,
                marginBottom: 20,
                marginTop: 20,
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',

            },
            viewLogin: {
                height: 35,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: '#ccd1b5',
                borderColor: "#fff",
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 30,
                paddingTop: 10,
                marginRight: 20,
                paddingLeft: 5, paddingRight: 5

            }, viewLogin2: {
                height: 35,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: '#ccd1b5',
                borderColor: "#fff",
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 30,
                paddingTop: 10,
                paddingLeft: 5, paddingRight: 5
            },
            textLogin: {
                fontSize: 13,
                color: '#fff',
                marginBottom: 7,
                marginTop: 10,
                paddingLeft: 15, paddingRight: 15
            },
            textLogin2: {
                fontSize: 13,
                color: '#fff',
                marginBottom: 10,
                paddingLeft: 15, paddingRight: 15
            },

            picker: {
                height: 50, marginBottom: 15, backgroundColor: "#ccd1b5",
                paddingLeft: 40, paddingRight: 40,

                justifyContent: 'center',
            },
            pickerItem: {
                height: 40, paddingTop: 10, color: "white", backgroundColor: "#ccd1b5", fontSize: 16, textAlign: 'left'
            },
            viewSubscribe: {
                height: 40,
                bottom: 0,
                position: 'absolute',
                justifyContent: 'center',
                left: 0, right: 0,
                alignSelf: 'center',
                flexDirection: 'row',
            },
            textbtnSubscribe: {
                fontSize: 17,
                position: 'absolute',
                flex: 1,
                color: "#fff",
            },
            btnSubscribe: {}
            , viewButtonSelect: {
                paddingLeft: 20, paddingRight: 20, marginBottom: 8
            }
        });
        var back = APIRoot + "/image/login3.jpg";
        var Item = Picker.Item;




        return (
            <View style={styles.bg}>
                <NavigationBar style={{height:37,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    title={<Image
                                source={require('./../../img/logo/cookout-co.png')}
                            />}
                    tintColor={"#FFF"}/>
                <ScrollView  >

                    <Text
                        style={{textAlign:'center',fontSize:20,color:"#fff",marginTop:30,marginBottom:30}}>
                      quel cuisinier êtes-vous ?
                    </Text>

                    <Text style={styles.textLogin}>langue</Text>

                    {(this.props.list_langue != null) ?
                        <View style={styles.viewButtonSelect}>
                            <SegmentedControls
                                options={ this.props.list_langue }
                                tint={'#ccd1b5'}
                                selectedTint={'white'}
                                containerBorderTint={'white'}
                                backTint={'white'}
                                extractText={ (option) => option.label }
                                allowFontScaling={ false }
                                selectedOption={this.state.langue}
                                testOptionEqual={ (a, b) => {
                        if (!a || !b) {
                        return false;
                    }
                        return a.label === b.label
                    }}
                            /></View>
                        : <View style={styles.viewButtonSelect}>
                        <SegmentedControls
                            options={ OPTIONS_LANGUE }
                            tint={'#ccd1b5'}
                            selectedTint={'white'}
                            containerBorderTint={'white'}
                            backTint={'white'}
                            extractText={ (option) => option.label }
                            allowFontScaling={ false }
                            selectedOption={this.state.langue}
                            testOptionEqual={ (a, b) => {
            if (!a || !b) {
              return false;
            }
            return a.label === b.label
          }}
                        /></View>
                    }
                    <Text style={styles.textLogin}>sexe</Text>

                    <View style={styles.viewButtonSelect}>
                        <SegmentedControls
                            options={ OPTIONS_CIVILITE }
                            tint={'#ccd1b5'}
                            selectedTint={'white'}

                            containerBorderTint={'white'}
                            backTint={'white'}
                            extractText={ (option) => option.label }
                            allowFontScaling={ false }
                            selectedOption={this.state.civilite}
                            onSelection={this.handleChangeCivilite.bind(this)}
                            testOptionEqual={ (a, b) => {
            if (!a || !b) {
              return false;
            }
            return a.label === b.label
          }}
                        /></View>
                    <Text style={styles.textLogin}>âge</Text>

                    <View style={styles.viewButtonSelect}>
                        <SegmentedControls
                            options={ OPTIONS_TRANCHE_AGE }
                            tint={'#ccd1b5'}
                            selectedTint={'white'}

                            containerBorderTint={'white'}
                            backTint={'white'}
                            extractText={ (option) => option.label }
                            allowFontScaling={ false }
                            selectedOption={this.state.age}
                            onSelection={this.handleChangeAge.bind(this)}
                            testOptionEqual={ (a, b) => {
            if (!a || !b) {
              return false;
            }
            return a.label === b.label
          }}
                        /></View>

                    <Text style={styles.textLogin}>je suis...</Text>
                    <View style={styles.viewButtonSelect}>
                        <SegmentedControls
                            options={ OPTIONS_LEVEL }
                            tint={'#ccd1b5'}
                            selectedTint={'white'}

                            containerBorderTint={'white'}
                            backTint={'white'}
                            extractText={ (option) => option.label }
                            allowFontScaling={ false }
                            selectedOption={this.state.level}
                            onSelection={this.handleChangeLevel.bind(this)}
                            testOptionEqual={ (a, b) => {
            if (!a || !b) {
              return false;
            }
            return a.label === b.label
          }}
                        /></View>

                    <View style={{marginTop:0,marginBottom:30,height:40,bottom:0,paddingTop:0,paddingLeft:20,   justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',alignItems: 'center', flexDirection: 'row',paddingRight:20}}>
                        <TouchableHighlight style={styles.viewLogin} underlayColor='#ccd1b5' onPress={this.handleSkip.bind(this)}>
                            <Text style={styles.textLogin2}>
                                Passer
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.viewLogin2} underlayColor='#ccd1b5' onPress={this.handleValid.bind(this)}>
                            <Text style={styles.textLogin2}>
                                Valider
                            </Text>
                        </TouchableHighlight>
                    </View>

                </ScrollView>

            </View>


        )
    }
}
const mapStateToProps = (state) => ({
    token: state.session.token,
    user_id: state.session.user_id,
    user: state.session.user,
    form_skiped: state.session.form_skiped,
    isRequesting: state.config.isRequesting,
    statusText: state.config.statusText,
    list_langue: state.config.list_langue
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ConfigActions, dispatch),
    actions_sessions: bindActionCreators(SessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSubscribe);



