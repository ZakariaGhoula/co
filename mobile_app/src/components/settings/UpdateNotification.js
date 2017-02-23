import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView,Switch} from 'react-native';
import {LoginButton,AccessToken,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';


class UpdateNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notification: false,
                };


        this.menuLeft = this.menuLeft.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }


    handleSave() {

    }

    updateValue(event) {
        var notification = event ? 1 : 0;

        if (this.props.token != null){
            this.setState({
                notification:event
            });
            this.props.actions.saveUserNotification(this.props.token, notification);
        }


    }


    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {

        if ((nextProps.user !== null)){
          this.setState({
              notification:(nextProps.user.notification==1)
          });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || this.state.notification !== nextState.notification
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
            viewCheckbox: {borderColor: '#c7c7c7', borderBottomWidth: 1, borderTopWidth: 1, marginBottom: 20}

        });

        var titleConfig = {
            tintColor: '#000',
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

                <Text style={{color:"#398797"}}>OK</Text></TouchableHighlight>);

        var notification = (this.props.user != null && this.props.user.notification == 1);
        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:40,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}

                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView style={{flex:1,padding:13}}>
                    <Switch style={{marginBottom: 10}} onValueChange={this.updateValue.bind(this)}
                            value={this.state.notification}/>
                </ScrollView>
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNotification);
