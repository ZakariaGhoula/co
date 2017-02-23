import React, { Component } from 'react';
import {View,Text,StyleSheet,Linking} from 'react-native';
export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (url) => {

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }

    render() {


        var styles = StyleSheet.create({
            link: {


                paddingRight: 15,
        paddingLeft:25,
                marginBottom: (this.props.last) ? 15 : 0,
                backgroundColor: 'transparent',
                borderColor: '#c7c7c7',
                borderTopWidth: (this.props.alone) ? 1 : 0,
                borderBottomWidth: (this.props.last) ? 1 : 0
            },
            linkView: {marginBottom:15},
            TextView: {},
            NextView: {
                height: 50,
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: 10,
            },
            text: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#fff",



            }, textlocale: {
                fontFamily: 'Guardi-Roman',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",

                backgroundColor: "transparent",
                color: "#fff",

            }
        });


        return (


            <View style={{flex:1,paddingBottom:20}}>
                <View style={styles.link}>

                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>COOK OUT</Text>
                        </View>
                    </View>


                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>L'appli food pour saisir et stocker facilement vos recettes - les partager avec vos proches en 2 clics - et découvrir les nouvelles recettes de votre réseau et de vos chefs préférés.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>SAISIE DES RECETTES</Text>
                        </View>
                    </View>


                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>Que vous soyez débutant ou professionnel, ajoutez facilement (et au choix!) :{'\n'}
                                - des photos de plats finis{'\n'}
                                - des photos de recettes "pas à pas"{'\n'}
                                - des photos de recettes provenant de tous supports (magazines, livres, cahiers de recette...){'\n'}
                                - du texte (notes, ingrédients, préparation..){'\n'}
                                - des liens url{'\n'}

                            </Text>
                        </View>
                    </View>

                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>ORGANISATION DES RECETTES</Text>
                        </View>
                    </View>


                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>Grâce à l'ajout de tags correspondant à votre manière de cuisiner et de manger, retrouvez toutes vos recettes en quelques secondes dans votre espace Mon Cook Out. Vos recettes peuvent être publiques (visibles par votre réseau) ou privées (visible seulement par vous).
                            </Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>PARTAGE DES RECETTES</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>Dans la rubrique Actualités, découvrez les recettes fétiches de votre réseau (vos proches comme des chefs étoilés ou des blogueurs réputés ?) et si vous le souhaitez, ajoutez leurs recettes à votre propre espace personnel Mon Cook Out en un instant. </Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>AIDES CULINAIRES</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>En panne d'inspiration ? Découvrez les ingrédients de saison et lancez vous !</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>SUIVEZ NOUS !</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>Facebook : https://www.facebook.com/CookOut-1172743309455530/?ref=aymt_homepage_panel</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>Instagram : @cook-out.io</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>CONTACT</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>email : contact@cook-out.io{"\n"}Si vous avez des questions ou des remarques pour nous aider à améliorer l'application, n'hésitez pas une seconde à nous contacter ! > contact@cook-out.io</Text>
                        </View>
                    </View>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.textlocale}>Merci Merci Merci à.....{'\n'}{'\n'}Léa Soumali : Graphisme{'\n'}{'\n'}Zakaria Ghoula : Développement{'\n'}{'\n'}ainsi qu'à Romain, Lucile, Raphaël, Marie-Eve, Kevin, Evelyne, Guénolé, Olivia & Benoit - bêta-testeurs formidables et soutiens sans faille... </Text>
                        </View>
                    </View>

                </View>
            </View>

        );
    }
}