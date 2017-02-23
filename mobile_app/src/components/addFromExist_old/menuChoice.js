import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableOpacity,ReactNativeImageCropping} from 'react-native';


import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import ImagePicker from 'react-native-image-picker';
import Menu from './choice/menu';
import ImageOption from './choice/image';
import TextOption from './choice/text';
import Link from './choice/link';
export default class MenuChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: 0,
            link: this.props.link,
            ingredient: this.props.ingredient,
            preparation: this.props.preparation,
            listImage: this.props.list_image,
        }

        this.handleChoice = this.handleChoice.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);

    }

    componentDidMount() {


    }

    componentWillUpdate(nextProps, nextState) {


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.choice !== nextState.choice
        || this.state.preparation !== nextState.preparation
        || this.state.ingredient !== nextState.ingredient
        || this.state.listImage !== nextState.listImage
        || this.state.link !== nextState.link);
    }

    selectPhotoTapped() {

        this.setState({
            choice: 1
        });
        /*
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

                             }

                            var listImage = this.state.listImage;

                            if (listImage.indexOf(image.uri) !== -1) {
                                var index = listImage.indexOf(image.uri);
                                if (index > -1) {
                                    //listImage.splice(index, 1);
                                }
                            }
                            else {
                                listImage.push(image.uri);

                            }
                            this.setState({
                                listImage: listImage,
                                choice: 1
                            });

                        },
                        err => console.log(b));


            }

        });
*/
    }

    handleChoice(choice) {
        this.setState({choice: choice})
    }

    handleLink(link) {

        this.setState({link: link, choice: 0})
    }

    handleText(preparation, ingredient) {

        this.setState({preparation: preparation, ingredient: ingredient, choice: 0})
    }

    handleImage(images) {

        this.setState({listImage: images, choice: 0})
    }

    handleNext(){

     this.props.handleMenuChoice(this.state.listImage,this.state.link,this.state.preparation,this.state.ingredient);
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
                backgroundColor: 'transparent',
            },
            navbar: {
                borderColor: '#c7c7c7',
                backgroundColor: "#ffffff",

                shadowColor: "#c7c7c7",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 2,
                    width: 0
                },
                borderBottomWidth: 1,
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
            },
            produit_de_saison: {
                fontFamily: 'OratorStd',
                fontSize: 16,
                marginTop: 69 * width / 320,
                textAlign: "center",
                backgroundColor: "transparent"
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
                marginTop: 30
            }, textLogin: {
                color: (this.state.connexionPress) ? "#fff" : '#000',
                fontSize: 15,

            },
            buttonRound: {
                width: 64 * width / 320,
                height: 104 * width / 320,

                alignItems: "center",
                justifyContent: "center",
                marginRight: 15 * width / 320
            },
            buttonRoundView: {
                borderWidth: 1,
                borderColor: "#9b9b9b",
                borderRadius: (64 * width / 320) / 2,
                width: 64 * width / 320,
                height: 64 * width / 320,
                alignItems: "center",
                justifyContent: "center",
            }, buttonRoundText: {
                fontSize: 11 * width / 320,
                fontFamily: 'Guardi-Roman',
                textAlign: "center",
                marginTop: 5 * width / 320,
                width: 58 * width / 320,
                height: 40 * width / 320,
            }

        });


        var data_to_show = null;

        if (this.state.choice == 0) {
            data_to_show = <Menu
                selectPhotoTapped={this.selectPhotoTapped.bind(this)}
                handleChoice={this.handleChoice.bind(this)}
                handleNext={this.handleNext.bind(this)}
                handlePrev={this.props.handlePrev} handleMenuChoice={this.props.handleChoice}/>
        }
        if (this.state.choice == 1) {
            data_to_show = <ImageOption
                list_image={this.state.listImage}
                handleImage={this.handleImage.bind(this)}/>
        }

        else if (this.state.choice == 2) {
            data_to_show = <TextOption
                ingredient={this.state.ingredient}
                preparation={this.state.preparation}
                handleText={this.handleText.bind(this)}/>
        } else if (this.state.choice == 3) {
            data_to_show = <Link
                link={this.state.link}
                handleLink={this.handleLink.bind(this)}/>
        }

        return (


            <View style={styles.bg}>
                {data_to_show}

            </View>


        )
    }
}

