import React, { Component } from 'react';
import {Text,TextInput,View,ScrollView,StyleSheet,TouchableOpacity,TouchableHighlight,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL,OPTIONS_CIVILITE,OPTIONS_TRANCHE_AGE} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalPicker from 'react-native-modal-picker';
import ImageResizer from 'react-native-image-resizer';

import {CachedImage} from "react-native-img-cache";
export default class UpdateBasics extends React.Component {
    constructor(props) {
        super(props);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        var l = this.props.user.level;
        var new_level = _.filter(OPTIONS_LEVEL, function (el) {
            return (parseInt(el["value"]) == this.props.user.level);
        }, this);
        this.state = {
            img_64: null,
            img: (this.props.user != null && this.props.user.media != null && this.props.user.media.profile_pi != "") ? APIRoot + "/images/users/" + this.props.user.media.profile_pi : null,
            last_name: (this.props.user != null ) ? this.props.user.last_name : "",
            first_name: (this.props.user != null ) ? this.props.user.first_name : "",
            sexe: (this.props.user != null ) ? (this.props.user.gender.trim() == "female") ? "Femme" : "Homme" : null,
            sexe_value: (this.props.user != null ) ? this.props.user.gender : null,
            age: (this.props.user != null ) ? (this.props.user.range_age.trim()) + " ans" : null,
            age_value: (this.props.user != null ) ? this.props.user.range_age : null,
            level: ( typeof new_level[0] !== "undefined" ) ? new_level[0].label : null,
            level_value: (this.props.user != null) ? this.props.user.level : null,
        }


    }

    handleFirstName(v) {
        this.props.updateDataBasicName(this.state.last_name, v);
        this.setState({first_name: v});

    }

    handleLastName(v) {
        this.props.updateDataBasicName(v, this.state.first_name);
        this.setState({last_name: v});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ( nextState.img_64 !== this.state.img_64
        || nextState.last_name !== this.state.last_name
        || nextState.first_name !== this.state.first_name
        || nextState.sexe_value !== this.state.sexe_value
        || nextState.age !== this.state.age
        || nextState.age_value !== this.state.age_value
        || nextState.sexe !== this.state.sexe
        || nextState.img !== this.state.img)
    }

    selectPhotoTapped() {
        this.setState({isPickingImage: true});
        const options = {
            title: 'Modifier ma  photo',
            takePhotoButtonTitle: 'Prendre une Photo...',
            chooseFromLibraryButtonTitle: 'Depuis ma bibliothèque',
            cancelButtonTitle: 'Annuler',
            quality: 1,

            maxWidth: 200,
            allowsEditing: false,
            storageOptions: {
                skipBackup: false
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

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
                const React = require('react-native');

                const {ReactNativeImageCropping} = React.NativeModules;
                ReactNativeImageCropping.cropImageWithUrl((source.uri))
                    .then(image => {

                            ImageResizer.createResizedImage(image.uri, 200, 200, "JPEG", 70, 0).then((resizedImageUri) => {

                                 var RNFS = require('react-native-fs');

                                 RNFS.readFile(resizedImageUri, "base64")  //substring(7) -> to remove the file://
                                 .then(res => {
                                 var data_uri = 'data:image/jpeg;base64,' + res;
                                 this.props.updateDataBasicImage(image.uri, data_uri);

                                 this.setState({img: image.uri, img_64: data_uri});

                                 });
                                // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
                            }).catch((err) => {
                                console.log(err);
                                // Oops, something went wrong. Check that the filename is correct and
                                // inspect err to get more details.
                            });


                            // var RNFS = require('react-native-fs');
                            /*
                             RNFS.readfile(image.uri, "base64")  //substring(7) -> to remove the file://
                             .then(res => {
                             var data_uri = 'data:image/jpeg;base64,' + res;
                             this.props.updatedatabasicimage(image.uri, data_uri);

                             this.setstate({img: image.uri, img_64: data_uri});
                             });
                             // this.setstate({img: image.uri})
                             */
                        },
                        err => console.log(b));


            }

        });

    }


    render() {
        var {height, width} = Dimensions.get('window');

        var styles = StyleSheet.create({
            main: {
                flex: 0.4
            },
            pict: {height: width * 0.20, borderRadius: width * 0.20 / 2, width: width * 0.20},
            name: {
                flex: 1,

                textAlign: "left",
                fontFamily: 'Guardi-Roman',
                fontStyle: "italic",
                fontSize: 13 * (width / 320)
            },
            basicText: {
                flex: 1,
                marginBottom: 5,
                textAlign: "left",
                fontFamily: 'Guardi-Roman',
                fontStyle: "italic",
                fontSize: 11 * (width / 320)
            }, select: {

                backgroundColor: "transparent",

                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
            }, selectStyle: {
                marginTop: -8,
                marginLeft: -5,

                backgroundColor: "transparent",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
            }, textSelected: {
                fontFamily: 'Guardi-Roman',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#000",
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
            }, selectTextStyle: {
                fontFamily: 'Guardi-Roman',
                fontSize: 14,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#000",
            }, optionTextStyle: {
                fontFamily: 'Guardi-Roman',
                fontSize: 15,
                lineHeight: 15,
                marginBottom: 0,
                marginTop: 7,
                textAlign: "center",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
                backgroundColor: "transparent",
                color: "#000",
            }, cancelTextStyle: {
                fontFamily: 'OratorStd'
            }, text: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#808183",
                width: 210,
                textDecorationLine: "underline"
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
        var profilePicture = null;
        var list_to_show = null;

        if (this.state.img != null) {

            var profilePicture = <CachedImage source={{uri:this.state.img}}
                                        style={styles.pict} mutable/>

        }
        else {
            if (this.props.user.gender != null && this.props.user.gender == "female") {
                var profilePicture = <Image source={require('./../../../img/default_img/placeholder-women.png')}
                                            style={styles.pict}/>;
            }
            else {
                profilePicture = <Image source={require('./../../../img/default_img/placeholder-men.png')}
                                        style={styles.pict}/>;
            }
        }

        var name = null;
        var last_name = null;
        if (this.props.user != null) {
            name = <View
                style={{paddingBottom:4, marginBottom:7,marginTop:18,height:20,borderBottomWidth:1,borderColor:"#000",backgroundColor:"transparent"}}><TextInput
                style={styles.name}
                placeholder="Prénom"
                onChangeText={this.handleFirstName.bind(this)}
                value={this.state.first_name} defaultValue={this.state.first_name}/></View>;
            last_name = <View
                style={{paddingBottom:4, marginBottom:7,marginTop:10,height:20,borderBottomWidth:1,borderColor:"#000",backgroundColor:"transparent"}}><TextInput
                style={styles.name}
                placeholder="Nom"
                onChangeText={this.handleLastName.bind(this)}
                value={this.state.last_name} defaultValue={this.state.last_name}/></View>
        }
        let index = 0;
        var data = [];
        OPTIONS_CIVILITE.map(function (civilite, i) {
            var value = {key: civilite.value, label: civilite.label}
            data.push(value);
        });
        var sexe = null;

        sexe = <View
            style={{paddingBottom:4,flexDirection:'row', marginBottom:7,marginTop:10,height:20,borderBottomWidth:1,backgroundColor:"transparent",borderColor:"#000"}}><ModalPicker
            data={data}
            style={{marginTop:0,flex:0.7}}
            selectStyle={styles.selectStyle}

            selectTextStyle={styles.selectTextStyle}
            cancelTextStyle={styles.cancelTextStyle}
            optionTextStyle={styles.optionTextStyle}
            initValue={this.state.sexe}
            cancelText="Annuler"
            onChange={(option)=>{   this.props.updateDataBasicSexe(option.key);this.setState({sexe_value: option.key,sexe:option.label}) }}/><Icon
            name="ios-arrow-down" style={{
                backgroundColor:"transparent"}} size={12}/></View>;


        var data_age = [];
        OPTIONS_TRANCHE_AGE.map(function (age, i) {
            var value = {key: age.value, label: age.label}
            data_age.push(value);
        });
        var age = null;
        age = <View
            style={{paddingBottom:4,flexDirection:'row', marginBottom:7,marginTop:10,height:20, backgroundColor:"transparent",borderBottomWidth:1,borderColor:"#000"}}><ModalPicker
            data={data_age}
            style={{marginTop:0,flex:0.7}}
            selectStyle={[styles.selectStyle,{height:300}]}
            optionStyle={{height:40}}
            selectTextStyle={styles.selectTextStyle}
            cancelTextStyle={styles.cancelTextStyle}
            optionTextStyle={styles.optionTextStyle}
            initValue={this.state.age}
            cancelText="Annuler"
            onChange={(option)=>{this.props.updateDataBasicAge(option.key); this.setState({age_value: option.key,age:option.label+" ans"}) }}/><Icon
            name="ios-arrow-down" style={{
                backgroundColor:"transparent"}} size={12}/></View>;

        var level = null;

        var data_level = [];
        OPTIONS_LEVEL.map(function (level, i) {
            var value = {key: level.value, label: level.label}
            data_level.push(value);
        });
        level = <View
            style={{paddingBottom:4,flexDirection:'row',  backgroundColor:"transparent",marginBottom:7,marginTop:10,borderBottomWidth:1,borderColor:"#000"}}><ModalPicker
            data={data_level}
            style={{marginTop:0,flex:0.7}}
            selectStyle={[styles.selectStyle]}
            optionStyle={{height:40}}
            selectTextStyle={[styles.selectTextStyle,{fontSize:11,}]}
            cancelTextStyle={styles.cancelTextStyle}
            optionTextStyle={styles.optionTextStyle}
            initValue={this.state.level}
            cancelText="Annuler"
            onChange={(option)=>{this.props.updateDataBasicLevel(option.key); this.setState({level_value: option.key,level:option.label}) }}/><Icon
            name="ios-arrow-down" style={{
                backgroundColor:"transparent"}} size={12}/></View>;


        return (
            <View style={styles.main}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>{profilePicture}<View
                    style={{backgroundColor:'rgba(255,255,255,0.6)',position:"absolute",alignItems:"center",justifyContent:"center",top:0,height:width*0.20,width:width*0.20}}><Image
                    source={require('image!./../../img/addrecipe/photo.png')}/></View></TouchableOpacity>
                <View style={{paddingLeft:10}}>
                    {name}
                    {last_name}
                    {sexe}
                    {age}
                    {level}

                </View>

            </View>
        );
    }
}