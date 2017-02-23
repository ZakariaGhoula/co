import React, { Component } from 'react';
import {Text,View,StyleSheet,TextInput,TouchableHighlight,ScrollView,AlertIOS} from 'react-native';
import {LoginButton,AccessToken,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';


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

        this.menuLeft = this.menuLeft.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.updateValue = this.updateValue.bind(this);

        this.submitHandle = this.submitHandle.bind(this);
        this.handle_password = this.handle_password.bind(this);
        this.handle_password_conf = this.handle_password_conf.bind(this);
        this.handle_old_password = this.handle_old_password.bind(this);
    }


    handleSave() {

    }

    updateValue(event) {


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

        if ( old_password.trim().length >= 1) {

            this.props.actions.checkPassword(this.props.token, old_password);

        }
    }

    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {

        if ((nextProps.user !== null)) {

        }
        if (nextProps.passwordChecked && nextProps.statusPassword != null) {
            this.setState({
                save_data_password: false,
                error_old_password: true
            });

            // AlertIOS.alert( nextProps.statusPassword );

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

                //  AlertIOS.alert("Nouveau mot de passe enregistré");
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
            || this.state.is_checked !== nextState.is_checked
        )

    }

    menuLeft(e) {

        Actions.menu();
        // this.setState({isOpen: !this.state.isOpen});
    }

    render() {

        var styles = StyleSheet.create({
            bg: {
                flex: 1, backgroundColor: "#f6f7f9"
            },
            view: {
                flex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 20,
                paddingTop: 20,
                bottom: 0
            },

            viewBasicInformation: {
                padding: 20,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
                marginBottom: 20
            },
            NameLastFist: {
                color: '#3a4750',
                fontSize: 20,
                marginBottom: 7
            },
            basicText: {
                color: '#3a4750',
                fontSize: 15,
                marginBottom: 7
            }, AboutTitle: {
                color: '#3a4750',
                fontSize: 16,
                marginBottom: 7
            }, aboutText: {
                color: '#3a4750',
                fontSize: 14,
                marginBottom: 7
            },
            labelText: {fontSize: 15, color: '#3a4750', textAlign: 'center', marginBottom: 15, flex: 1},
            labelTextError: {fontSize: 15, color: 'red', textAlign: 'center', marginBottom: 15, flex: 1},
            labelTextSuccess: {fontSize: 15, color: '#049372', textAlign: 'center', marginBottom: 15, flex: 1},
            viewCheckbox: {borderColor: '#c7c7c7', borderBottomWidth: 1, borderTopWidth: 1, marginBottom: 20},
            input: {
                height: 40,
                paddingRight: 10,
                paddingLeft: 10,
                flex: 1,
                fontSize: 14,
                textAlign: 'left',
                color: '#3a4750'
            }, link: {
                flex: 1,
                height: 40,

                marginBottom: 15,
                backgroundColor: '#fff',
                borderColor: '#c7c7c7',
                borderTopWidth: 1,
                borderBottomWidth: 1
            },
        });

        var titleConfig = {
            tintColor: '#398797',
            title: (this.props.title.trim())
        };
        var leftButtonConfig =
            (<Icon.Button name="ios-arrow-round-back" size={26} marginLeft={10} color="#000" backgroundColor="#fff"
                          onPress={this.menuLeft.bind(this)}/>)


        var titleConfig = {
            tintColor: '#000',

            title: (this.props.title.trim())
        };
        var ButtonConfig =
            (<TouchableHighlight style={{height:40,alignSelf: 'center',paddingRight:10,justifyContent: 'center'}}
                                 onPress={this.handleSave.bind(this)}>

                <Text style={{color:"#000"}}>OK</Text></TouchableHighlight>);

        var notification = (this.props.user != null && this.props.user.notification == 1);
        if (this.state.save_data_password) {
            AlertIOS.alert("Nouveau mot de passe enregistré");
        }
        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:40,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}

                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView style={{flex:1,paddingTop:13}}>
                    {(this.state.save_data_password) ? (
                        <Text style={styles.labelTextSuccess}>Vos modifications ont bien été
                            enregistrées.</Text>) : null}
                    {this.props.statusPassword != null ? (
                        <Text style={styles.labelTextError}>{this.props.statusPassword}</Text>) : null}
                    <Text style={styles.labelText}>Ancien mot de passe</Text>
                    <View style={styles.link}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={this.handle_old_password.bind(this)} placeholder="(obligatoire)"/></View>
                    <Text style={styles.labelText}>Nouveau mot de passe</Text>
                    <View style={styles.link}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={this.handle_password.bind(this)} placeholder="(obligatoire)"/></View>

                    <Text style={styles.labelText}>Confirmation du mot de passe</Text>
                    <View style={styles.link}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={this.handle_password_conf.bind(this)} placeholder="(obligatoire)"/></View>

                    <View style={styles.link}>
                        <TouchableHighlight style={{flex:1,height:40,backgroundColor:'#049372',justifyContent: 'center',
                alignSelf: 'stretch',
                alignItems: 'center'}} onPress={this.submitHandle.bind(this)}>
                            <Text style={{color:"#fff",fontSize:15}}>
                                Entregister
                            </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    statusPassword: state.session.statusPassword,
    passwordChecked: state.session.passwordChecked,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
