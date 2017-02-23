import React, { Component } from 'react';
import {Text,TextInput,ScrollView,View,StyleSheet,Image,Dimensions,TouchableOpacity,AlertIOS} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";
import {APIRoot} from './../../../constants/config_path';
import ModalPicker from 'react-native-modal-picker';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as RecipeActions    from './../../../actions/RecipeActions';
import LoadingOverlay from 'react-native-loading-overlay';
import ImageResizer from 'react-native-image-resizer';
class ImageOption extends React.Component {
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
            textToShow: null,
            lengthImageTab: null,
            pressImage: null,
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextState.list_image !== this.state.list_image
            || nextState.pressImage !== this.state.pressImage
            || nextState.lengthImageTab !== this.state.lengthImageTab

            || nextProps.isRequesting !== this.props.isRequesting
            || nextProps.processing_recepie !== this.props.processing_recepie
        )
    }

    componentWillUpdate(nexProps, nexState) {

    }

    handleDeleteUrl(val, e) {
        if (this.props.token !== null) {

            var data = {};
            data['id_media'] = val;
            data['id_recepie'] = this.props.processing_recepie.id_recipe;
            this.props.actions_recipe.updateRecipeDELETEIMAGE(this.props.token, data);
        }


    }

    handleModalChoice(choice, val) {
        if (choice == 1) {

            this.handleDeleteUrl(val)
        }
        else {
            if (this.props.token !== null) {
                var listImage_old = this.props.processing_recepie.img;


                var listImage = [];
                var ordering = 1;


                listImage.push( {id_media:val, ordering: ordering++});

                for (var i = 0; i < Object.keys(this.props.processing_recepie.img).length; i++) {

                    if (listImage_old[i].id_media !== val) {

                        listImage.push( {id_media: listImage_old[i].id_media, ordering: ordering++});
                    }
                   //;

                }
                var data = {};
                data['id_recepie'] = this.props.processing_recepie.id_recipe;
                data['list_ordering_img'] = listImage;

                this.props.actions_recipe.updateRecipeORDERINGIMAGE(this.props.token, data);
            }
        }
    }

    selectPhotoTapped() {
        this.setState({isPickingImage: true});
        const options = {
            title: 'Ajouter une photo',
            takePhotoButtonTitle: 'Prendre une Photo...',
            chooseFromLibraryButtonTitle: 'Depuis ma bibliothèque',
            cancelButtonTitle: 'Annuler',
            quality: 1,

            maxWidth: 600,
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
                var dataURI = "data:image/jpeg;base64," + response.data;
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

                            if (image != null) {
                                var length_img = (Object.keys(this.props.processing_recepie.img).length);
                                ImageResizer.createResizedImage(image.uri, 600, 600, "JPEG", 70, 0).then((resizedImageUri) => {

                                var RNFS = require('react-native-fs');


                                RNFS.readFile(resizedImageUri, "base64")  //substring(7) -> to remove the file://
                                    .then(res => {

                                        var data = {};
                                        var data_uri = 'data:image/jpeg;base64,' + res;
                                        data['image'] = data_uri;
                                        data['id_recepie'] = this.props.processing_recepie.id_recipe;
                                        this.props.actions_recipe.updateRecipeADDIMAGE(this.props.token, data);
                                        this.setState({pressImage: true, lengthImageTab: length_img})
                                    });

                                }).catch((err) => {
                                    console.log(err);
                                    // Oops, something went wrong. Check that the filename is correct and
                                    // inspect err to get more details.
                                });

                            }

                        },
                        err => console.log(b));


            }

        });

    }


    handleClick(event) {
        this.setState({textToShow: null});
        this.props.handleImage(this.state.list_image);

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

                            {(typeof this.props.processing_recepie.img[0] !== "undefined") && this.props.processing_recepie.img[0] !== null &&

                            <TouchableOpacity
                                onPress={()=>AlertIOS.prompt(
  'Supprimer la photo ?',
  null,
  [
    {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Oui', onPress: ()=>this.handleDeleteUrl(this.props.processing_recepie.img[0].id_media)},
  ],
  null,
  'default'
)}
                                style={{borderWidth:1,borderColor:"#999999",width:(((width-padding)/2)-padding+5),height:(((width-padding)/2)-padding+5)}}>
                                <Image
                                    source={{uri:APIRoot+"/images/recipe/"+this.props.processing_recepie.img[0].path}}
                                    resizeMode="contain"
                                    style={{width:(((width-padding)/2)-padding+3),height:(((width-padding)/2)-padding+3),flex:1}}/></TouchableOpacity>}

                            {(typeof this.props.processing_recepie.img[0] === "undefined") &&
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                              style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",width:(((width-padding)/2)-padding+5),height:(((width-padding)/2)-padding+5)}}>
                                <Image
                                    source={require('image!./../../img/addrecipe/photo.png')}/></TouchableOpacity>
                            }

                        </View>
                        <View style={{flex:0.5}}>
                            <View style={{flex:0.5,alignItems:"center",backgroundColor:"transparent"}}>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    {(typeof this.props.processing_recepie.img[1] !== "undefined") && this.props.processing_recepie.img[1] !== null &&
                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",marginBottom:5,marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,this.props.processing_recepie.img[1].id_media)
                                    }}>
                                            <Image
                                                source={{uri:APIRoot+"/images/recipe/"+this.props.processing_recepie.img[1].path}}
                                                resizeMode="contain"
                                                style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/></ModalPicker></View>}

                                    {(typeof this.props.processing_recepie.img[1] === "undefined")
                                    && <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                         style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",marginBottom:5,marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>
                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/></TouchableOpacity>}


                                    {(typeof this.props.processing_recepie.img[2] !== "undefined") && this.props.processing_recepie.img[2] !== null &&

                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",marginBottom:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,this.props.processing_recepie.img[2].id_media)
                                    }}>
                                            <Image
                                                source={{uri:APIRoot+"/images/recipe/"+this.props.processing_recepie.img[2].path}}
                                                resizeMode="contain"
                                                style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/></ModalPicker></View>}


                                    {(typeof this.props.processing_recepie.img[2] === "undefined") &&
                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                      style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",marginBottom:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>
                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/>
                                    </TouchableOpacity>}


                                </View>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    {(typeof this.props.processing_recepie.img[3] !== "undefined") && this.props.processing_recepie.img[3] !== null &&
                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,this.props.processing_recepie.img[3].id_media)
                                    }}>
                                            <Image
                                                source={{uri:APIRoot+"/images/recipe/"+this.props.processing_recepie.img[3].path}}
                                                resizeMode="contain"
                                                style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/></ModalPicker>
                                    </View>}

                                    {(typeof this.props.processing_recepie.img[3] === "undefined") &&
                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                      style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",marginRight:5,marginLeft:5,width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/>
                                    </TouchableOpacity>}


                                    {(typeof this.props.processing_recepie.img[4] !== "undefined") && this.props.processing_recepie.img[4] !== null &&

                                    <View
                                        style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <ModalPicker
                                            data={data}

                                            optionStyle={{height: 50, justifyContent: "center"}}
                                            optionTextStyle={{paddingTop: 0}}
                                            cancelText="Annuler"
                                            onChange={(option)=> {
                                        this.handleModalChoice(option.key,this.props.processing_recepie.img[4].id_media)
                                    }}>
                                            <Image
                                                source={{uri:APIRoot+"/images/recipe/"+this.props.processing_recepie.img[4].path}}
                                                resizeMode="contain"
                                                style={{width:(((width-padding)/2)-padding)/2-2,height:(((width-padding)/2)-padding)/2-2,flex:1}}/></ModalPicker></View>}

                                    {(typeof this.props.processing_recepie.img[4] === "undefined") &&

                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                                      style={{borderWidth:1,borderColor:"#999999",alignItems:"center",justifyContent:"center",width:(((width-padding)/2)-padding)/2,height:(((width-padding)/2)-padding)/2}}>

                                        <Image
                                            source={require('image!./../../img/addrecipe/photo.png')}/></TouchableOpacity>}

                                </View>
                            </View>
                        </View>

                    </View>

                </View>
                {this.props.isRequesting &&
                <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                    <LoadingOverlay visible={true} text=""/>
                </View>
                }
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


const mapStateToProps = (state) => ({
    token: state.session.token,
    isRequesting: state.loading.shown,
    processing_recepie: state.recipe.processing_recepie,
});

const mapDispatchToProps = (dispatch) => ({
    actions_recipe: bindActionCreators(RecipeActions, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(ImageOption);


