import React, {Component} from 'react';
import {
    Dimensions,
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';
import {Actions} from 'react-native-redux-router';
import {bindActionCreators} from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import {connect}            from 'react-redux';

import LoadingOverlay from 'react-native-loading-overlay';
import NavigationBar from 'react-native-navbar';
import MenuTab from './../default/MenuTab';
import NetworkProfilsFacebook from './NetworkProfilsFacebook';
import NetworkFb from './../login/NetworkFb';
import SearchBar from 'react-native-search-bar';
import _                      from 'underscore';
class FacebookFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list_default: this.props.list,


        }

        this.menuLeft = this.menuLeft.bind(this);
        this.handleClick = this.handleClick.bind(this);


    }


    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.list_default !== nextState.list_default
        || this.props.isRequesting !== nextProps.isRequesting
        || this.props.facebook_network !== nextProps.facebook_network
        || this.props.search_follow_list !== nextProps.search_follow_list)
    }

    componentWillUnmount(nextProps, nextState) {
        this.props.actions.destroyFacebookFriends();
        // this.props.actions_recipe.destroy_cookout();
    }

    menuLeft(e) {
        Actions.pop();
        // this.setState({isOpen: !this.state.isOpen});
    }

    handleClick = (url) => {

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    };

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

            }


        });
        /*     <Image style={{marginBottom: 2, width: 92}} resizeMode={"contain"}
         source={require('image!./../../img/season/logo.png')}/>;*/

        var titleConfig = <Text style={{marginBottom: 2, fontFamily: 'Guardi-Roman', fontSize: 16}}>Amis Facebook</Text>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop: 15, marginLeft: 10}} onPress={this.menuLeft}><Image
            source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>


        var followers = this.state.list_default;
        var to_show = null;


        var connect = null;

        if (((Object.keys(this.props.facebook_network).length == 0))) {

            to_show = <View
                style={{flex: 1, alignItems: "center", padding: padding}}
            ><Text style={styles.block_title}>Aucun utilisateur pour le moment</Text></View>
        }
        else if (((Object.keys(this.props.facebook_network).length >= 0))) {
            to_show = <View
                style={{borderColor: '#c7c7c7', borderBottomWidth: 0, borderTopWidth: 0}}>

                {Object.keys(this.props.facebook_network).map(function (user, index) {
                    return (<NetworkProfilsFacebook key={index} user={this.props.facebook_network[user]}/>)
                }, this)}</View>;
        }
        return (


            <View style={styles.bg}>
                <NavigationBar
                    style={styles.navbar}
                    title={titleConfig}
                    leftButton={leftButtonConfig}
                    tintColor={"#fff"}/>

                <ScrollView style={{flex: 1, paddingTop: 4, paddingBottom: 100}}>
                         <View style={{flex: 1, paddingBottom: 100}}>

                            {to_show}
                            {  (this.props.isRequesting) &&
                        <LoadingOverlay visible={true} text=""/>}
                        </View>
                </ScrollView>
                <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                    <MenuTab option_back={this.props.name} page={"moncookout"}/>
                </View>
            </View>


        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    user: state.session.user,
    facebook_network: state.session.facebook_network,
    search_follow_list: state.searchs.search_follow_list,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FacebookFriends);