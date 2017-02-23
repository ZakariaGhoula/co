import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import {LoginButton,AccessToken,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';


class UpdateAbout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            save: false,
            height: 0,
            about: (this.props.user != null && this.props.user.profile != null && this.props.user.profile.about != "") ? this.props.user.profile.about : "",
        };


        this.menuLeft = this.menuLeft.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.updateAbout = this.updateAbout.bind(this);
    }


    handleSave() {
        var data = {
            about: (this.state.about.trim().length > 0) ? this.state.about.trim() : "",

        }
        this.props.actions.saveUserAbout(this.props.token, data.about);

        this.setState({save:true})
    }

    updateAbout(event) {


        this.setState({
            about: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height,
        });

    }


    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {

        if ((nextProps.user !== null) && nextState.save ) {
             Actions.myprofile();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || this.state.height !== nextState.height
            || this.state.about !== nextState.about
            || this.state.save !== nextState.save
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
            tintColor: '#398797',
            title: (this.props.title.trim())
        };
        var leftButtonConfig =
            (<Icon.Button name="ios-arrow-round-back" size={26} marginLeft={10} color="#398797" backgroundColor="#fff"
                          onPress={this.menuLeft.bind(this)}/>)


        var titleConfig = {
            tintColor: '#398797',

            title: (this.props.title.trim())
        };
        var ButtonConfig =
            (<TouchableHighlight style={{height:40,alignSelf: 'center',paddingRight:10,justifyContent: 'center'}}
                                 onPress={this.handleSave.bind(this)}>

                <Text style={{color:"#398797"}}>OK</Text></TouchableHighlight>);


        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:40,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}
                    rightButton={ButtonConfig}
                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView style={{flex:1,padding:13}}>
                    <TextInput
                        multiline={true}
                        style={{flex:1,fontSize:15,color:'#3a4750',height: Math.max(35, this.state.height)}}
                        onChange={this.updateAbout.bind(this)}
                        defaultValue={this.state.about}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAbout);
