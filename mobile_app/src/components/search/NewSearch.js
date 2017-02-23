import React, { Component } from 'react';
import {Dimensions,Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView,TouchableOpacity,Linking} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SearchActions    from './../../actions/SearchActions';
import { connect }            from 'react-redux';

import LoadingOverlay from 'react-native-loading-overlay';
import NavigationBar from 'react-native-navbar';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuTab from './../default/MenuTab';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SearchBar from 'react-native-search-bar';
import TabResult from './TabResult';
import ListUser from './ListUser';
import ListRecepies from './ListRecepies';
import _                      from 'underscore';


import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class NewSearch extends React.Component {
    constructor(props) {
        super(props);

        this.menuLeft = this.menuLeft.bind(this);
        this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitText = this.onSubmitText.bind(this);

        this.state={search:""}

    }
    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Page de recherche Page');


        if (typeof this.props.search !== "undefined" && this.props.search !== null && this.props.search.length >0) {
            this.props.actions.retrieveAllSearch(this.props.token, this.props.search );
            this.setState({search:this.props.search})
        }
    }

    onCancelButtonPress(e) {
        this.props.actions.destroy_search_all();
    }

    onChangeText(e) {
        if (e != null && e.length > 0)
        {
            this.setState({search:e});
            //this.props.actions.retrieveAllSearch(this.props.token, e);
        }
        else if (e.length == 0)
            this.props.actions.destroy_search_all();

    }
    onSubmitText(e) {

        this.setState({search:e});
        this.props.actions.retrieveAllSearch(this.props.token, e);
        this.refs.searchBar.blur();


    }

    componentWillUnmount(nextProps, nextState) {
        this.props.actions.destroy_search_all();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (  this.props.isRequesting !== nextProps.isRequesting
        || this.props.search_all_list !== nextProps.search_all_list
        || this.state.search !== nextState.search
        )
    }

    menuLeft(e) {
        Actions.pop({search:this.state.search});

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

            }


        });



        var titleConfig = <Image style={{marginBottom:2,width:92}} resizeMode={"contain"} source={require('image!./../../img/season/logo.png')}/>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop:15,marginLeft:10}} onPress={this.menuLeft}><Image
            source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>

        var to_show = null;

        if (this.props.search_all_list !== null && !this.props.isRequesting) {

            to_show = <ScrollableTabView style={{marginTop: 5, }} renderTabBar={()=><TabResult/>}
                                         initialPage={0}>
                <ListRecepies key={0} tablabel="ios-people" list_recepies={this.props.search_all_list.result.recepies}/>
                <ListUser key={1} tablabel="ios-people" list_user={this.props.search_all_list.result.user}/>
                <ListRecepies key={3} tablabel="ios-people" list_recepies={this.props.search_all_list.result.tags}/>
            </ScrollableTabView>;
        }
        else if(this.props.isRequesting){
            to_show = <LoadingOverlay visible={true} text=""/>
        }

        return (
            <View style={styles.bg}>
                <NavigationBar
                    style={styles.navbar}
                    title={titleConfig}
                    leftButton={leftButtonConfig}
                    tintColor={"#fff"}/>
                <SearchBar
                    barTintColor="#fff"
                    tintColor="#fff"
                    textColor="#000"
                    textSize={12}
                    textFieldBackgroundColor="#f2f2f2"
                    hideBackground={true}
                    value={this.state.search}
                    defaultValue={this.state.search}
                    ref='searchBar'
                    placeholder='Recherche'
                    onCancelButtonPress={this.onCancelButtonPress.bind(this)}
                    onChangeText={this.onChangeText.bind(this)}

                    onSearchButtonPress={ this.onSubmitText.bind(this)}
                />

                {to_show}
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name} page={"moncookout"}/>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    search_all_list: state.searchs.search_all_list,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SearchActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSearch);