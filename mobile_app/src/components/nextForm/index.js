import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableHighlight} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import _                      from 'underscore';
import Storage from 'react-native-storage'
import Icon from 'react-native-vector-icons/Ionicons';
import Sexe from './sexe';
import Age from './age';
import Niveau from './niveau';
import Code from './code';

import GiftedSpinner from 'react-native-gifted-spinner';
class NextForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            langue_selected: '',
            sexe: '',
            age: '',
            level: '',
            code: '',

            to_show: 1
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleSexe = this.handleSexe.bind(this);
        this.handleAge = this.handleAge.bind(this);
        this.handleLevel = this.handleLevel.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }


    componentDidMount() {


    }

    componentWillUpdate(nextProps, nextState) {


        if (nextState.to_show == 5 && !nextProps.isRequesting && nextState.level.length > 0) {
            var data = {
                'level': (nextState.level != null) ? nextState.level : null,
                'code': (nextState.code != null) ? nextState.code : null,
                'age': (this.state.age != null) ? this.state.age : null,
                'civilite': (this.state.sexe != null) ? this.state.sexe : null,
                'langue': 'fr_FR'
            }

            if (this.props.token != "null") {
                storage.remove({
                    key: 'loginState'
                });

                this.props.actions.saveForm(this.props.token, data);

                this.setState({to_show: 6})
            }
            else {
                alert('Connexion impossible');
            }


        }

        else if (nextState.to_show == 6 && nextProps.form_skiped == 1 && !nextProps.isRequesting) {
            storage.save({
                key: 'loginState',   // Note: Do not use underscore("_") in key!
                rawData: {
                    from: 'Cookout',
                    userid: nextProps.user_id,
                    token: nextProps.token,
                    form_skiped: 1
                },

                // if not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: null
            });


            Actions.moncookout();
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.langue_selected !== nextState.langue_selected
            || this.state.sexe !== nextState.sexe
            || this.state.age !== nextState.age
            || this.state.level !== nextState.level
            || this.state.to_show !== nextState.to_show
            || this.props.form_skiped !== nextProps.form_skiped
            || this.props.token !== nextProps.token
            || this.props.isRequesting !== nextProps.isRequesting

        );
    }

    handleNext(next) {
        this.setState({to_show: next});
    }

    handleSexe(sexe) {

        this.setState({to_show: 2, sexe: sexe});
    }

    handleAge(age) {

        this.setState({to_show: 3, age: age});
    }

    handleCode(code) {

        this.setState({to_show: 5, code: code});
    }

    handleLevel(level) {

        this.setState({to_show: 4, level: level});
    }

    handlePrev(prev) {

        this.setState({to_show: prev});
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
                backgroundColor: '#ccd1b5',


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
            }

        });

        var data_to_show = null;
        if (this.state.to_show == 1) {
            data_to_show = <Sexe handleSexe={this.handleSexe.bind(this)}
                                 sexe={this.state.sexe}/>;
        }
        else if (this.state.to_show == 2) {

            data_to_show = <Age
                handlePrev={this.handlePrev.bind(this)}
                handleAge={this.handleAge.bind(this)}
                age={this.state.age}/>;


        } else if (this.state.to_show == 3) {
            data_to_show = <Niveau
                handlePrev={this.handlePrev.bind(this)}
                handleLevel={this.handleLevel.bind(this)}
                level={this.state.level}/>
        }else if (this.state.to_show == 4) {
            data_to_show = <Code
                handlePrev={this.handlePrev.bind(this)}
                handleCode={this.handleCode.bind(this)}
                code={this.state.code}/>
        }
        else if (this.state.to_show == 5 || this.state.to_show == 6) {
            data_to_show = <View style={{flex:1}}><View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                    <Image source={require('image!./../../img/options/logo.png')}/>
                </View>
            </View>
                <View style={{flex:1,justifyContent:'center',width:null,height:null}}>
                    <GiftedSpinner style={{marginTop:0}}/>
                </View></View>;
        }

        return (


            <View style={styles.bg}>
                <Image source={require('image!./../../img/nextForm/background.png')}
                       style={{flex:1,width:null,height:null,padding:padding}}>

                    <View style={{flex:1}}>

                        {this.state.to_show == 1 &&
                        <TouchableHighlight
                            underlayColor='transparent'
                            onPress={()=> (Actions.login())}
                            style={{position:"absolute",backgroundColor:"transparent",top:30,left:20}}>
                            <Image source={require('image!./../../img/subscribe/back.png')}/>
                        </TouchableHighlight>
                        }
                        {data_to_show}
                    </View>
                </Image>
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    user_id: state.session.user_id,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    form_skiped: state.session.form_skiped,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NextForm);
