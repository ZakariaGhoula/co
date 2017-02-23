import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {OPTIONS_TRANCHE_AGE,OPTIONS_CIVILITE,OPTIONS_LEVEL} from './../../constants/config';
import {LoginButton,AccessToken,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';

import NavigationBar from 'react-native-navbar';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { RadioButtons,SegmentedControls } from 'react-native-radio-buttons'
import CustomProfileItem from './CustomProfileItem';
import CustomProfileInput from './CustomProfileInput';


class CustomProfile extends React.Component {
    constructor(props) {
        super(props);

        var range = null;
        var civilite = null;
        var level = null;

        if (this.props.user != null && this.props.user.range_age != null && this.props.user.range_age != "") {

            for (var i = 0; i < OPTIONS_TRANCHE_AGE.length; i++) {
                if (OPTIONS_TRANCHE_AGE[i].value.trim() == this.props.user.range_age) {
                    range = OPTIONS_TRANCHE_AGE[i];
                }
            }
        }
        if (this.props.user != null && this.props.user.gender != null && this.props.user.gender != "") {

            for (var i = 0; i < OPTIONS_CIVILITE.length; i++) {
                if (OPTIONS_CIVILITE[i].value.trim() == this.props.user.gender) {
                    civilite = OPTIONS_CIVILITE[i];
                }
            }
        }
        if (this.props.user != null && this.props.user.level != null && this.props.user.level != "") {

            for (var i = 0; i < OPTIONS_LEVEL.length; i++) {
                if (OPTIONS_LEVEL[i].value.trim() == this.props.user.level) {
                    level = OPTIONS_LEVEL[i];
                }
            }
        }


        this.state = {
            isPickingImage: false,
            avatarSource: null,
            videoSource: null,
            last_name: (this.props.user != null && this.props.user.last_name != "") ? this.props.user.last_name : "",
            first_name: (this.props.user != null && this.props.user.first_name != "") ? this.props.user.first_name : "",
            civilite: civilite,
            range_age: range,
            level: level

        };


        this.menuLeft = this.menuLeft.bind(this);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleChangeCivilite = this.handleChangeCivilite.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.updateAbout = this.updateAbout.bind(this);
    }

    updateAbout(){
        Actions.updateabout();
    }
    handleSave() {
        var data = {
            last_name: (this.state.last_name.trim().length > 1) ? this.state.last_name.trim() : this.props.last_name,
            first_name: (this.state.first_name.trim().length > 1) ? this.state.first_name.trim() : this.props.first_name,
            gender: (this.state.civilite != null) ? this.state.civilite.value : null,
            range_age: (this.state.range_age != null) ? this.state.range_age.value : null,
            level: (this.state.level != null) ? this.state.level.value : null,
        }

        this.props.actions.updateBasicProfile(this.props.token, data);
    }

    handleLastName(val) {


        this.setState({
            last_name: val
        });

    }

    handleFirstName(val) {
        this.setState({
            first_name: val
        });
    }

    handleChangeCivilite(e) {

        this.setState({
            civilite: e
        })
    }

    handleChangeAge(e) {
        this.setState({
            range_age: e
        })
    }

    handleChangeLevel(e) {

        this.setState({
            level: e
        })
    }

    selectPhotoTapped() {
        this.setState({isPickingImage: true});
        const options = {
            title: 'Photo de profil',
            takePhotoButtonTitle: 'Prendre une Photo...',
            chooseFromLibraryButtonTitle: 'Choose from Library...',
            quality: 0.6,
            maxWidth: 300,
            maxHeight: 300,
            allowsEditing: true,
            storageOptions: {
                skipBackup: false
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                var dataURI = "data:image/jpg;base64," + response.data;

                this.props.actions.uploadAndSaveUserData(this.props.token, dataURI);
                // Or:
                // if (Platform.OS === 'android') {
                //   source = {uri: response.uri, isStatic: true};
                // } else {
                //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {

        if ((nextProps.user !== null && nextState.isPickingImage && nextProps.user.media !== null && this.props.user.media !== null && nextProps.user.media.profile_pi !== this.props.user.media.profile_pi)) {
            Actions.pop();
        }

        else if ((nextProps.user !== null && nextProps.user.last_name !== null && this.props.user.last_name !== null && nextProps.user.last_name !== this.props.user.last_name)) {
            Actions.pop();
        } else if ((nextProps.user !== null && nextProps.user.first_name !== null && this.props.user.first_name !== null && nextProps.user.first_name !== this.props.user.first_name)) {
            Actions.pop();
        } else if ((nextProps.user !== null && nextProps.user.gender !== this.props.user.gender)) {
            Actions.pop();
        }else if ((nextProps.user !== null && nextProps.user.range_age !== this.props.user.range_age)) {
            Actions.pop();
        }else if ((nextProps.user !== null && nextProps.user.level !== this.props.user.level)) {
            Actions.pop();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || this.state.isPickingImage !== nextState.isPickingImage
            || this.state.last_name !== nextState.last_name
            || this.state.first_name !== nextState.first_name
        )
    }

    menuLeft(e) {
        Actions.pop();
        // this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        var frLocale = require('moment/locale/fr');
        var styles = StyleSheet.create({
            bg: {
                flex: 1, backgroundColor: "#fff"
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
                fontSize: 14,
                marginBottom: 7
            }, AboutTitle: {
                color: '#000',
                fontSize: 14,
                marginBottom: 7
            }, aboutText: {
                color: '#3a4750',
                fontSize: 13,
                marginBottom: 7
            },
            labelText: {fontSize:15, color: '#3a4750', textAlign: 'center', marginBottom: 15, flex: 1},
            viewCheckbox: {borderColor: '#c7c7c7', borderBottomWidth: 1, borderTopWidth: 1, marginBottom: 20}

        });
        var back = APIRoot + "/image/login3.jpg";
        var titleConfig = {
            tintColor: '#398797',
            title: (this.props.title.trim())
        };
        var leftButtonConfig =
            (<Icon.Button name="ios-arrow-round-back" size={26} marginLeft={10} color="#000" backgroundColor="#fff"
                          onPress={this.menuLeft.bind(this)}/>)

        var titleConfig =
                <Image
                    source={require('./../../../img/logo/cookout-co.png')}
                />
            ;
        var ButtonConfig =
            (<TouchableHighlight style={{height:37,alignSelf: 'center',paddingRight:10,justifyContent: 'center'}}
                                 onPress={this.handleSave.bind(this)}>

                <Text style={{color:"#000",fontSize:13}}>OK</Text></TouchableHighlight>);


        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:37,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}
                    rightButton={ButtonConfig}
                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView style={{flex:1}}>
                    <View style={{flex:1,backgroundColor:"#dcdfce",paddingTop:12,paddingBottom:12,marginBottom:4}}><Text
                        style={{fontSize: 13,fontWeight:'bold', color: '#000', textAlign: 'center', marginBottom: 0, flex: 1}}>{(this.props.title.trim())}</Text></View>

                    <CustomProfileItem title={'Changer la photo de profil'} icon={'ios-camera'}
                                       actionFired={  this.selectPhotoTapped.bind(this)} last={true}
                                       alone={true}/>

                    <CustomProfileInput title={'Prénom'} icon={null} val={this.state.first_name}
                                        actionFired={ this.handleFirstName.bind(this)} last={false}
                                        alone={false}/>
                    <CustomProfileInput title={'Nom'} icon={null} val={this.state.last_name}
                                        actionFired={ this.handleLastName.bind(this)} last={true}
                                        alone={false}/>
                    <Text style={styles.labelText}>Sexe</Text>
                    <View style={styles.viewCheckbox}>

                        <SegmentedControls
                            options={ OPTIONS_CIVILITE }
                            tint={'#dcdfce'}
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
                    <Text style={styles.labelText}>Age</Text>
                    <View style={styles.viewCheckbox}>
                        <SegmentedControls
                            options={ OPTIONS_TRANCHE_AGE }
                            tint={'#dcdfce'}
                            selectedTint={'white'}

                            containerBorderTint={'white'}
                            backTint={'white'}
                            extractText={ (option) => option.label }
                            allowFontScaling={ false }
                            selectedOption={this.state.range_age}
                            onSelection={this.handleChangeAge.bind(this)}
                            testOptionEqual={ (a, b) => {
            if (!a || !b) {
              return false;
            }
            return a.label === b.label
          }}
                        /></View>

                    <Text style={styles.labelText}>Je cuisine comme…</Text>
                    <View style={styles.viewCheckbox}>
                        <SegmentedControls
                            options={ OPTIONS_LEVEL }
                            tint={'#dcdfce'}
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

                    <Text style={styles.labelText}>Un peu plus sur moi…</Text>

                    <CustomProfileItem title={'Modifier'} icon={null} action={'go'}
                                       actionFired={  this.updateAbout.bind(this)} last={true}
                                       alone={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomProfile);
