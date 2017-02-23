import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableOpacity,ReactNativeImageCropping} from 'react-native';


import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import ImagePicker from 'react-native-image-picker';
import Menu from './choice/menu';
import ImageOption from './choice/image';
import TextOption from './choice/text';
import Link from './choice/link';

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as RecipeActions    from './../../actions/RecipeActions';
import LoadingOverlay from 'react-native-loading-overlay';

import ImageResizer from 'react-native-image-resizer';
class MenuChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: 0,
            link: this.props.link,
            ingredient: this.props.ingredient,
            preparation: this.props.preparation,
            listImage: this.props.list_image,
            pressImage: false,
            lengthImageTab: 0
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

        if (nextState.pressImage && !nextProps.isRequesting &&nextProps.processing_recepie != null
            && nextProps.processing_recepie.img !== "undefined"
            && Object.keys(nextProps.processing_recepie.img).length >= nextState.lengthImageTab
        ) {
            this.setState({pressImage: false, choice: 1})
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.choice !== nextState.choice
        || this.state.preparation !== nextState.preparation
        || this.state.ingredient !== nextState.ingredient
        || this.state.listImage !== nextState.listImage
        || this.state.pressImage !== nextState.pressImage
        || this.state.lengthImageTab !== nextState.lengthImageTab
        || nextProps.isRequesting !== this.props.isRequesting
        || nextProps.processing_recepie !== this.props.processing_recepie
        || this.state.link !== nextState.link);
    }

    selectPhotoTapped() {

        if(this.props.processing_recepie!=null && Object.keys(this.props.processing_recepie.img).length>0){
            this.setState({pressImage: false, choice: 1})
        }
        else {
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

    }

    handleChoice(choice) {
        if(!this.props.isRequesting)
        this.setState({choice: choice})
    }

    handleLink(link) {
        if(!this.props.isRequesting)
        this.setState({link: link, choice: 0})
    }

    handleText(preparation, ingredient) {
        if(!this.props.isRequesting)
        this.setState({preparation: preparation, ingredient: ingredient, choice: 0})
    }

    handleImage(images) {
        if(!this.props.isRequesting)
        this.setState({listImage: images, choice: 0})
    }

    handleNext() {
        if(!this.props.isRequesting)
        this.props.handleMenuChoice(this.state.listImage, this.state.link, this.state.preparation, this.state.ingredient);
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
                {this.props.isRequesting &&
                <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                    <LoadingOverlay visible={true} text=""/>
                </View>
                }
            </View>


        )
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuChoice);

