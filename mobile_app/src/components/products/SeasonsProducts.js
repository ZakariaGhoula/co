import React, {Component} from 'react';
import {Text, View, ScrollView, Image, StyleSheet, TouchableHighlight, Dimensions,ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-redux-router';

import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import {bindActionCreators} from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as ProductsActions    from './../../actions/ProductsActions';
import {connect}            from 'react-redux';
import MenuTab from './../default/MenuTab';
import SeasonsProductsList                   from './SeasonsProductsList';
import LoadingOverlay from 'react-native-loading-overlay';
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class SeasonsProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list_default: null,
            id_season: 0,
            id_season_to_use: 0,
            change_season: false
        }

        this.nextSeason = this.nextSeason.bind(this);
        this.prevSeason = this.prevSeason.bind(this);
    }

    componentWillMount() {

        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Produits de saison Page');

    }

    componentDidMount() {
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
        if (this.props.list_default_product == null) {
            global.storage.load({
                key: 'productSeason',
            }).then(ret => {
                // found data goes to then()
                if(typeof ret.data !=="undefined"&& ret.data !==null){
                    this.setState({
                        list_default: ret.data,
                        id_season: (typeof  ret.data[0] !== "undefined") ? (typeof  ret.data[0].season_id.id_season !== "undefined") ? ret.data[0].season_id.id_season : ret.data[0].season_id : 1,
                    })
                }
               else{
                    this.props.actions_products.retrieveProductsSeason(this.props.token, 1);
                }

            }).catch(err => {
                this.props.actions_products.retrieveProductsSeason(this.props.token, 1);
            });

        }
        else {

            this.setState({
                list_default: this.props.list_default_product,
                id_season: (typeof  this.props.list_default_product[0] !== "undefined") ? (typeof  this.props.list_default_product[0].season_id.id_season !== "undefined") ? this.props.list_default_product[0].season_id.id_season : this.props.list_default_product[0].season_id : 1,
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.user == null) {

            nextProps.actions.retrieveDataRequest(nextProps.token);
        }
        if (( nextProps.list_default_product !== null && this.state.change_season == nextState.change_season) || ((  nextProps.list_default_product !== null && nextProps.list_default_product !== this.props.list_default_product)) && (typeof nextProps.list_default_product[0] !== "undefined") && nextProps.list_default_product[0].season_id!=="undefined") {

           var array_season =[]

            storage.save({
                key: 'productSeason',   // Note: Do not use underscore("_") in key!
                rawData: {
                    from: 'Cookout',
                    token: nextProps.token,
                    data:nextProps.list_default_product
                },

                // if not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: 1000 * 3600 * 24
            });
            this.setState({
                list_default: nextProps.list_default_product,
                id_season: (typeof nextProps.list_default_product[0] !== "undefined") ? (typeof nextProps.list_default_product[0].season_id.id_season !== "undefined") ? nextProps.list_default_product[0].season_id.id_season : nextProps.list_default_product[0].season_id : 1,
            })
        }

        if (this.state.list_default == null) {
            global.storage.load({
                key: 'productSeason',
            }).then(ret => {
                // found data goes to then()
                if(typeof ret.data !=="undefined"&& ret.data !==null){
                    this.setState({
                        list_default: ret.data,
                        id_season: (typeof  ret.data[0] !== "undefined") ? (typeof  ret.data[0].season_id.id_season !== "undefined") ? ret.data[0].season_id.id_season : ret.data[0].season_id : 1,
                    })
                }
                else{
                    nextProps.actions_products.retrieveProductsSeason(nextProps.token, 1);
                }

            }).catch(err => {
                nextProps.actions_products.retrieveProductsSeason(nextProps.token, 1);
            });

        }
        if (nextState.change_season && this.state.id_season_to_use !== nextState.id_season_to_use) {
            this.setState({
                change_season: false,

            });
            nextProps.actions_products.retrieveProductsSeasonById(this.props.token, this.props.user.zone, nextState.id_season_to_use);
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || nextProps.isRequesting !== this.props.isRequesting
            || nextState.id_season_to_use !== this.state.id_season_to_use
            || nextProps.list_default_product !== this.props.list_default_product
            || (nextState.change_season !== this.state.change_season
            || nextState.id_season !== this.state.id_season)
        )
    }


    nextSeason() {

        var id_season = this.state.id_season;
        if (id_season < 4) {
            id_season = parseInt(id_season) + 1;
        }
        else
            id_season = 1

        this.setState({
            id_season_to_use: id_season, change_season: true
        })
    }

    prevSeason() {
        var id_season = this.state.id_season;
        if (id_season > 1) {
            id_season = parseInt(id_season) - 1;
        }
        else
            id_season = 4

        this.setState({
            id_season_to_use: id_season, change_season: true
        })
    }


    render() {
        var img_season = null;

        var w = Dimensions.get('window');

        var styles = StyleSheet.create({
            bg: {
                height: w.height,
                backgroundColor: '#fff',
            },
            titleList: {
                paddingTop: 5,
                paddingBottom: 15,
                fontSize: 15,
                fontWeight: 'bold',
                paddingLeft: 10,
                textAlign: 'center',
                backgroundColor: 'transparent',
                color: "#2b301c"
            },
            imgSeason: {
                marginTop: 0, alignItems: 'center', width: 80, height: 60,
            },
            produit_de_saison: {
                fontFamily: 'OratorStd',
                fontSize: 16,
                textAlign: "center",
                backgroundColor: "transparent"
            }

        });
        /*     {#
         <ScrollView

         style={{marginTop:13,position:"relative",    flex: 1, flexDirection: 'column'}}>
         <View
         style={{alignItems:"center",marginTop:30, justifyContent:'center',flex:1,flexDirection: 'row'}}>
         <TouchableHighlight
         underlayColor='transparent'
         onPress={this.prevSeason.bind(this)}>
         <Image style={{marginTop:13,marginRight:18, alignItems: 'center'  }}
         source={require('image!./../../img/season/left.png')}/>
         </TouchableHighlight>
         <View style={styles.imgSeason}>
         { (this.state.id_season == 1) &&
         <Image style={{marginTop:6}}
         source={require('image!./../../img/season/spring.png')}/>
         }
         { (this.state.id_season == 2) &&
         <Image
         source={require( 'image!./../../img/season/summer.png')}/>
         }
         { (this.state.id_season == 3) &&
         <Image style={{marginTop:7}}
         source={require('image!./../../img/season/fall.png')}/>
         }
         { (this.state.id_season == 4) &&

         <Image style={{marginTop:3}}
         source={require("image!./../../img/season/winter.png")}/>
         }
         </View>

         <TouchableHighlight underlayColor='transparent'
         onPress={this.nextSeason.bind(this)}>
         <Image style={{marginTop:13,marginLeft:18, alignItems: 'center'  }}
         source={require('image!./../../img/season/right.png')}/>
         </TouchableHighlight>
         </View>
         {this.props.isRequesting &&
         <View style={{flex:1,justifyContent:'center',width:null,height:null}}>
         <GiftedSpinner style={{marginTop:60}}/>
         </View>
         }
         {!this.props.isRequesting &&
         <View style={{flex:1}}>
         <SeasonsProductsList listElement={this.state.list_default}/>
         </View>
         }
         </ScrollView>*/

        return (
            <View style={styles.bg}>
                <Image source={require('image!./../../img/background/season/season-product.png')}
                       style={{flex: 1, height: null, width: null}}>
                    <View style={{height: 55, marginTop: 20, alignItems: "center", justifyContent: 'center'}}>
                        <Image style={{width: 92}} resizeMode={"contain"}
                               source={require('image!./../../img/season/logo.png')}/>
                    </View>

                    <View>
                        <Text
                            style={styles.produit_de_saison}>Quelques ingrédients</Text>
                        <Text
                            style={styles.produit_de_saison}>de
                            saison</Text>
                    </View>
                    <ScrollView

                        style={{marginTop: 13, position: "relative", flex: 1, flexDirection: 'column'}}>

                        { (this.state.id_season != 0) &&
                        <View
                            style={{
                                alignItems: "center",
                                marginTop: 30,
                                justifyContent: 'center',
                                flex: 1,
                                flexDirection: 'row'
                            }}>
                            <TouchableHighlight
                                underlayColor='transparent'
                                onPress={this.prevSeason.bind(this)}>
                                <Image style={{marginTop: 13, marginRight: 18, alignItems: 'center'}}
                                       source={require('image!./../../img/season/left.png')}/>
                            </TouchableHighlight>
                            <View style={styles.imgSeason}>
                                { (this.state.id_season == 1) &&
                                <Image style={{marginTop: 6}}
                                       source={require('image!./../../img/season/spring.png')}/>
                                }
                                { (this.state.id_season == 2) &&
                                <Image
                                    source={require('image!./../../img/season/summer.png')}/>
                                }
                                { (this.state.id_season == 3) &&
                                <Image style={{marginTop: 7}}
                                       source={require('image!./../../img/season/fall.png')}/>
                                }
                                { (this.state.id_season == 4) &&

                                <Image style={{marginTop: 3}}
                                       source={require("image!./../../img/season/winter.png")}/>
                                }
                            </View>

                            <TouchableHighlight underlayColor='transparent'
                                                onPress={this.nextSeason.bind(this)}>
                                <Image style={{marginTop: 13, marginLeft: 18, alignItems: 'center'}}
                                       source={require('image!./../../img/season/right.png')}/>
                            </TouchableHighlight>
                        </View>}
                        {(this.props.isRequesting || this.state.id_season==0) &&

                        <View style={{ flex: 1 }}>
                            <LoadingOverlay visible={true} text=""/>
                            </View>
                        }
                        {!this.props.isRequesting && this.state.id_season !=0 &&
                        <View style={{flex:1}}>
                            <SeasonsProductsList listElement={this.state.list_default}/>
                        </View>
                        }
                    </ScrollView>

                </Image>
                <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                    <MenuTab option_back={this.props.name} page="seasonproducts"/>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    list_default_product: state.products.list_default_product,
    list_my_product: state.products.list_my_product,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_products: bindActionCreators(ProductsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SeasonsProducts);