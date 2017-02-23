import React, { Component } from 'react';
import {Dimensions,Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView,TouchableOpacity,Linking} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as SearchActions    from './../../actions/SearchActions';
import { connect }            from 'react-redux';

import GiftedSpinner from 'react-native-gifted-spinner';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuTab from './../default/MenuTab';
import NetworkProfils from './../network/NetworkProfils';
import RecipeItem from './RecipeItem';
import _                      from 'underscore';

import LoadingOverlay from 'react-native-loading-overlay';
class ResultSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_search: this.props.data_search,

        }

        this.menuLeft = this.menuLeft.bind(this);

    }


    componentDidMount() {

        this.props.actions_search.retrieveSearch(this.props.token, this.props.data_search);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.data_search !== nextState.data_search
        || this.props.search_list != nextProps.search_list)
    }

    menuLeft(e) {
        Actions.newsfeed();
        // this.setState({isOpen: !this.state.isOpen});
    }


    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.06) );
        var styles = StyleSheet.create({
            bg: {
                flex: 1, backgroundColor: "#fff"
            },
            navbar: {
                borderColor: '#c7c7c7',
                backgroundColor: "#ffffff",
                marginBottom: 3,

                borderBottomWidth: 1,
            },
            updateProfileLink: {
                flex: 1
            },
            updateProfileLinkText: {
                flex: 1,
                textAlign: "center",
                textDecorationLine: "underline",
                fontFamily: 'OratorStd',
                fontSize: 13
            }, placeholder: {
                height: 106,
                width: width,
                backgroundColor: "#ede4e1",
                opacity: 0.9,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 0

            }, title: {
                marginBottom: 4,
                color: "#000",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",

                fontFamily: 'Guardi-Roman',
            }, created: {
                marginBottom: 4,
                color: "#000",

                fontSize: 14,
                fontFamily: 'Guardi-Roman',
            }, By: {
                marginTop: 4,
                color: "#000",

                fontSize: 14,
                fontFamily: 'GuardiLTStd-BlackItalic',
            }
            , block: {
                alignItems: "center",
                marginBottom: 15,
                marginTop: 15,
            },
            block_title: {
                textAlign: "center",
                fontSize: 15,
                fontFamily: 'Guardi-Roman',
            }, block_text: {
                textAlign: "center",
                fontSize: 13,
                fontFamily: 'Guardi-Roman',
                lineHeight: 19
            }, tag: {
                marginRight: 5,
                marginBottom: 5,
                justifyContent: "center",
                padding: 4,
                paddingRight: 6,
                paddingLeft: 6,
                borderRadius: 4,
                backgroundColor: '#c69d8e'
            },
            tagText: {
                fontFamily: 'Guardi-Roman',
                fontSize: 11,

            }, titleList: {
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                marginBottom: 10,
                backgroundColor: '#c7c7c7',
                color: "#Fff"
            },main: {

                flex: 1,
                marginTop: 15,
                paddingTop: 10,
                marginBottom: 22,
                paddingBottom: 42,
            },
            no_recipe_view: {
                flex: 1,
                paddingTop: 15,
                paddingBottom: 15,
            }, no_recipe_text: {
                textAlign: "center",
                fontFamily: 'OratorStd',
                fontSize: 13
            }


        });


        var titleConfig = <Image style={{marginBottom:2,width:92}} resizeMode={"contain"} source={require('image!./../../img/season/logo.png')}/>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop:15,marginLeft:10}} onPress={this.menuLeft}><Image
            source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>


        if (this.props.search_list == null) {
            return (
                <View style={styles.bg}>

                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        tintColor={"#fff"}/>
                    <View style={{flex:1,justifyContent:'center',width:null,height:null}}>
                        <LoadingOverlay visible={true} text=""/>
                    </View>
                    <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                        <MenuTab option_back={this.props.name} page={"moncookout"}/>
                    </View>
                </View>)
        }

        else {
            var users = this.props.search_list.users;
            var actus = this.props.search_list.actus;
            var moncookout = this.props.search_list.cookout;


            var to_show_actu = null;
            if (actus.length > 0) {
                to_show_actu = <View
                    style={{borderColor: '#c7c7c7',borderBottomWidth:0,borderTopWidth:0}}>
                    <Text style={styles.titleList}>Actualités</Text>
                    {actus.map(function (actu, index) {
                        return (<RecipeItem key={index} is_external={1} recipe={actu}/>)
                    }, this)}</View>;
            }
            var to_show_co = null;
            if (moncookout.length > 0) {
                to_show_co = <View
                    style={{borderColor: '#c7c7c7',borderBottomWidth:0,borderTopWidth:0}}>
                    <Text style={styles.titleList}>Mon Cookout</Text>
                    {actus.map(function (actu, index) {
                        return (<RecipeItem key={index} is_external={0} recipe={actu}/>)
                    }, this)}</View>;
            }

            var to_show_user = null;
            if (users.length > 0) {
                to_show_user = <View
                    style={{borderColor: '#c7c7c7',borderBottomWidth:0,borderTopWidth:0}}>
                    <Text style={styles.titleList}>Profils</Text>
                    {users.map(function (user, index) {

                        return (<NetworkProfils key={index} user={user}/>)
                    }, this)}</View>;
            }
            var nul_text = null;
            if (users.length == 0 && actus.length == 0 && moncookout.length == 0) {
                nul_text = <View style={styles.main}><View style={styles.no_recipe_view}>
                    <Text style={styles.no_recipe_text}>Aucun résultat pour la recherche</Text>
                </View></View>
            }
        }


        return (


            <View style={styles.bg}>
                <NavigationBar
                    style={styles.navbar}
                    title={titleConfig}
                    leftButton={leftButtonConfig}
                    tintColor={"#fff"}/>

                <ScrollView style={{flex:1,paddingTop:13}}>

                    {to_show_actu}
                    {to_show_co}
                    {to_show_user}{nul_text}
                </ScrollView>
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name} page={this.props.name}/>
                </View>
            </View>


        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    isRequesting: state.searchs.isRequesting,
    search_page: state.searchs.search_page,
    search_limit: state.searchs.search_limit,
    search_list: state.searchs.search_list,


});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_search: bindActionCreators(SearchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultSearch);
