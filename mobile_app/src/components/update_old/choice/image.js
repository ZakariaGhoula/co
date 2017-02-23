import React, { Component } from 'react';
import {Text,TextInput,ScrollView,View,StyleSheet,Image,Dimensions,TouchableOpacity,AlertIOS} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";
import {APIRoot} from './../../../constants/config_path';
import ImagePicker from 'react-native-image-picker';
import ModalPicker from 'react-native-modal-picker'
export default class ImageOption extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteUrl = this.handleDeleteUrl.bind(this);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.handleModalChoice = this.handleModalChoice.bind(this);

        this.state = {
            list_image: this.props.list_image,
            isValidLink: false,
            connexionPress: false,
            textToShow: null
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.list_image !== this.state.list_image)
    }

    componentWillUpdate(nexProps, nexState) {

    }

    handleDeleteUrl(val) {


        var listImage2 = this.state.list_image;


        var listImage = [];
        for (var i = 0; i < listImage2.length; i++) {
            if (i !== val)
                listImage.push(listImage2[i]);
        }

        this.setState({
            list_image: listImage
        });


    }

    selectPhotoTapped() {
        this.setState({isPickingImage: true});
        const options = {
            title: 'Ajouter une photo',
            takePhotoButtonTitle: 'Prendre une Photo...',
            chooseFromLibraryButtonTitle: 'Depuis ma bibliothèque',
            cancelButtonTitle: 'Annuler',
            quality: 0.8,

            maxWidth: 1000,
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
                            //Image is saved in NSTemporaryDirectory!
                            //image = {uri, width, height}
                            /*  var RNFS = require('react-native-fs');
                             RNFS.readFile(image.uri, "base64")  //substring(7) -> to remove the file://
                             .then(res => {

                             var listImage = this.state.listImage;

                             if (listImage.indexOf(res) !== -1) {
                             var index = listImage.indexOf(res);
                             if (index > -1) {
                             //listImage.splice(index, 1);
                             }
                             }
                             else {
                             listImage.push(res);

                             }*/

                            var listImage = this.state.list_image;
                            var new_list_image = [];

                            for (var d = 0; d < listImage.length; d++) {
                                new_list_image.push(listImage[d]);
                            }


                            if (new_list_image.indexOf(image.uri) !== -1) {
                                var index = new_list_image.indexOf(image.uri);
                                if (index > -1) {
                                    //listImage.splice(index, 1);
                                }
                            }
                            else {
                                new_list_image.push(image.uri);

                            }

                            this.setState({
                                list_image: new_list_image,

                            });

                        },
                        err => console.log(b));


            }

        });

    }


    handleClick(event) {
        this.setState({textToShow: null});
        this.props.handleImage(this.state.list_image);

    }

    handleModalChoice(choice, val) {
        if (choice == 1) {

            this.handleDeleteUrl(val)
        }
        else {

            var listImage2 = this.state.list_image;


            var listImage = [];
            listImage.push(listImage2[val]);

            for (var i = 0; i < listImage2.length; i++) {
                if (i !== val)
                    listImage.push(listImage2[i]);
            }

            this.setState({
                list_image: listImage
            });


        }
    }


    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.05) );
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

                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative',
                flex: 1,
            }, textInput: {
                fontSize: 14,

                fontFamily: 'Guardi-Roman',
                color: '#20201e',
                borderWidth: 0,
                backgroundColor: "#fff",
                paddingLeft: 5,
                textAlign: 'left',

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

        const data = [
            {key: 0, label: 'Designer comme photo principale'},
            {key: 1, label: 'Supprimer la photo'},

        ];


        return (
            <View style={styles.bg}>

                <View style={{flex:1}}>
                    <View style={[styles.viewInput,{marginTop:20}]}>
                        <View style={{flex:0.5,alignItems:"center",backgroundColor:"transparent"}}>

                            {(typeof this.state.list_image[0] !== "undefined") && this.state.list_image[0] !== null &&

                            <TouchableOpacity
                                onPress={()=>AlertIOS.prompt(
  'Supprimer la photo ?',
  null,
  [
    {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Oui', onPress: ()=>this.handleDeleteUrl(0)},
  ],
  null,
  'default'
)}
                                style={{borderWidth:1,borderColor:"#999999",width:(((width-padding)/2)-padding+5),height:(((width-padding)/2)-padding+5)}}>
                                <Image source={{uri:( this.state.list_image[0])}}
                                       resizeMode="contain"
                                       style={{width:(((width-padding)/2)-padding+3),height:(((width-padding)/2)-padding+3),flex:1}}/></TouchableOpacity>}

                            {(typeof this.state.list_image[0] === "undefined") &&
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                              style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",width:(((width-padding)/2)-padding+5),height:(((width-padding)/2)-padding+5)}}>
                                <Image
                                    source={require('image!./../../img/addrecipe/photo.png')}/></TouchableOpacity>
                            }

                        </View>
                        <View style={{flex:0.5}}>
                            <View style={{flex:0.5,alignItems:"center",backgroundColor:"transparent"}}>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    {(typeof this.state.list_image[1] !== "undefined") && this.state.list_image[1] !== null &&
                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",marginBottom:5,marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,1)
                                    }}>
                                            <Image source={{uri:( this.state.list_image[1])}}
                                                   resizeMode="contain"
                                                   style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/></ModalPicker></View>}

                                    {(typeof this.state.list_image[1] === "undefined")
                                    && <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                         style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",marginBottom:5,marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>
                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/></TouchableOpacity>}


                                    {(typeof this.state.list_image[2] !== "undefined") && this.state.list_image[2] !== null &&

                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",marginBottom:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>
                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,2)
                                    }}>
                                            <Image source={{uri:(  this.state.list_image[2])}}
                                                   resizeMode="contain"
                                                   style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/></ModalPicker></View>}


                                    {(typeof this.state.list_image[2] === "undefined") &&
                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                      style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",marginBottom:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>
                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/>
                                    </TouchableOpacity>}


                                </View>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    {(typeof this.state.list_image[3] !== "undefined") && this.state.list_image[3] !== null &&
                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>
                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,3)
                                    }}>
                                            <Image source={{uri:( this.state.list_image[3])}}
                                                   resizeMode="contain"
                                                   style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/></ModalPicker>
                                    </View>}

                                    {(typeof this.state.list_image[3] === "undefined") &&
                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                      style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/>
                                    </TouchableOpacity>}


                                    {(typeof this.state.list_image[4] !== "undefined") && this.state.list_image[4] !== null &&

                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>
                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,4)
                                    }}>
                                            <Image source={{uri:(this.state.list_image[4])}}
                                                   resizeMode="contain"
                                                   style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/>
                                        </ModalPicker>
                                    </View>}

                                    {(typeof this.state.list_image[4] === "undefined") &&

                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                      style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/></TouchableOpacity>}

                                </View>
                            </View>
                        </View>

                    </View>

                </View>
                <View
                    style={{alignItems:"center",marginTop:0, marginBottom:70*(width/320),justifyContent:'center',flex:1,flexDirection: 'row'}}>

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

        );
    }
}

