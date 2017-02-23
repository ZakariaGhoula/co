import React, { Component } from 'react';
import {Text,View,StyleSheet,TextInput,TouchableHighlight,ScrollView,AlertIOS} from 'react-native';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';

import LoadingOverlay from 'react-native-loading-overlay';
class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error_old_password: false,
            error_password: false,
            error_password_conf: false,
            save_data_password: false,
            requireCapitals: 1,
            requireNumbers: 1,
            is_checked: false,
            old_password: "",
            new_password: "",
            new2_password: ""

        }


        this.submitHandle = this.submitHandle.bind(this);
        this.handle_password = this.handle_password.bind(this);
        this.handle_password_conf = this.handle_password_conf.bind(this);
        this.handle_old_password = this.handle_old_password.bind(this);
    }


    handle_password(e) {
        var value = e;
        this.setState({
            error_password: (value.trim().length < 1),
            save_data_password: false,
            new_password: value.trim(),

        });
    }

    handle_old_password(e) {
        var value = e;

        this.setState({
            error_old_password: (value.trim().length < 1 ),
            save_data_password: false,
            old_password: value.trim()

        });
    }

    handle_password_conf(e) {
        var value = e
        this.setState({
            error_password_conf: (value.trim().length < 1 || (this.state.new_password).trim() != value.trim() ),
            error_password: (value.trim() != this.state.new_password.trim()),
            save_data_password: false,
            new2_password: value.trim()
        });

    }


    submitHandle(e) {
        var old_password = this.state.old_password.trim();
        this.setState({
            error_old_password: (old_password.trim().length < 1),
            save_data_password: false
        });
        if (old_password.trim().length >= 1) {
            this.props.actions.checkPassword(this.props.token, old_password);
        }
    }

    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.passwordChecked && nextProps.statusPassword != null) {
            this.setState({
                save_data_password: false,
                error_old_password: true
            });
        }
        else if (nextProps.passwordChecked && nextProps.statusPassword == null) {
            var password = this.state.new_password.trim();
            var password_conf = this.state.new2_password.trim();
            this.setState({
                error_password: (password.trim().length < 1 ),
                error_password_conf: (password != password_conf),
                save_data_password: false,
            });

            if (!this.state.error_password && !this.state.error_password_conf && password.trim().length >= 1 && nextProps.passwordChecked && !this.state.save_data_password && !nextState.save_data_password) {
                this.props.actions.updatePassword(this.props.token, password.trim());
                this.setState({
                    save_data_password: true,
                    error_old_password: false
                });
            }
            else {
                this.setState({
                    error_password: true,
                    error_password_conf: true,
                    save_data_password: false,
                });
            }
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || nextProps.passwordChecked !== this.props.passwordChecked
            || nextProps.statusPassword !== this.props.statusPassword
            || this.state.notification !== nextState.notification
            || this.state.old_password !== nextState.old_password
            || this.state.new_password !== nextState.new_password
            || this.state.new2_password !== nextState.new2_password
            || this.state.error_old_password !== nextState.error_old_password
            || this.state.error_password !== nextState.error_password
            || this.state.error_password_conf !== nextState.error_password_conf
            || this.state.save_data_password !== nextState.save_data_password
        )

    }


    render() {

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: "transparent",
                paddingLeft: 23,
                paddingRight: 23,
            },
            labelTextSuccess: {
                fontFamily: 'OratorStd',
                fontSize: 12,
                lineHeight: 15,
                textAlign: "center",
                backgroundColor: "transparent",
                color: "#fdaa69"
            }, labelTextError: {
                fontFamily: 'OratorStd',
                fontSize: 12,
                lineHeight: 15,
                textAlign: "center",
                backgroundColor: "transparent",
                color: "#fdaa69"
            },
            input: {
                height: 30,
                paddingRight: 10,
                paddingLeft: 10,
                flex: 1,
                textAlign: 'left',
                backgroundColor: "transparent",
                borderTopWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
                color: '#fff',
                fontFamily: 'Guardi-Roman',
                fontSize: 13,
            }, link: {
                flex: 1,
                height: 30,
                marginBottom: 15,
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderColor: '#c7c7c7'
            }, textSave: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "center",
                backgroundColor: "transparent",
                color: "#eee",
                width: 210,
                textDecorationLine: "underline"
            }
        });


        if (this.state.save_data_password) {
            AlertIOS.alert("Nouveau mot de passe enregistré");
        }
        if (this.props.isRequesting) {
            return ( <View><LoadingOverlay visible={true} text=""/></View>);
        }
        return (

            <View style={styles.bg}>
                {this.props.statusPassword != null ? (
                    <Text style={styles.labelTextError}>{this.props.statusPassword}</Text>) : null}
                <View style={styles.link}>
                    <TextInput
                        placeholderTextColor="#eee"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={this.handle_old_password.bind(this)} placeholder="Mot de passe actuel"/></View>

                <View style={styles.link}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#eee"
                        secureTextEntry={true}
                        onChangeText={this.handle_password.bind(this)} placeholder="Nouveau mot de passe"/></View>
                <View style={styles.link}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#eee"
                        secureTextEntry={true}
                        onChangeText={this.handle_password_conf.bind(this)} placeholder="Confirmer"/></View>
                <View style={[styles.link,{borderBottomWidth:0}]}>
                    <TouchableHighlight
                        underlayColor='transparent'
                        style={{flex:1,height:40,backgroundColor:'transparent',justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center'}}
                        onPress={this.submitHandle.bind(this)}>
                        <Text style={styles.textSave}>
                            Enregister
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    statusPassword: state.session.statusPassword,
    passwordChecked: state.session.passwordChecked,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
