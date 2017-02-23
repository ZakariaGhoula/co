import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ListView, RefreshControl} from 'react-native';
import {APIRoot} from './../../constants/config_path';

import {Actions} from 'react-native-redux-router';

import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import {bindActionCreators} from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as NewsfeedActions    from './../../actions/NewsfeedActions';
import {connect}            from 'react-redux';
import MenuTab from './../default/MenuTab';
import TabNewsfeed from './TabNewsfeed';
import Discover from './Discover';
import Abos from './Abos';


import ScrollableTabView from 'react-native-scrollable-tab-view';
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class Newsfeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            data_to_show: null,
            loaded_team: false,
            loaded: false,
            refreshing: false,
            search_open: false,
            found_cache_team: false
        }

        this.menuRight = this.menuRight.bind(this);
        this.menuLeft = this.menuLeft.bind(this);

    }


    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Actualités Page');
    }

    componentDidMount() {
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
        this.props.actions.retrieveMyNetwork(this.props.token);

    }

    componentWillUpdate(nextProps, nextState) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || nextState.loaded !== this.state.loaded
        )
    }

    componentWillUnmount() {
        this.props.actions_newsfeed.retrieveNewsFeedAbosDestroy();
    }


    menuLeft(e) {
        Actions.indexNetwork();
    }

    menuRight(e) {
        Actions.indexSearch();
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

                /* shadowColor: "#c7c7c7",
                 shadowOpacity: 0.8,
                 shadowRadius: 2,
                 shadowOffset: {
                 height: 3,
                 width: 0
                 },
                 */borderBottomWidth: 1,
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
            }, overlay: {
                flex: 1,
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0.8,
                backgroundColor: 'black',
                width: width
            }
        });
        var titleConfig = <Image style={{marginBottom: 2, width: 92}} resizeMode={"contain"}
                                 source={require('image!./../../img/season/logo.png')}/>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop: -16, marginLeft: 10}} onPress={this.menuLeft}><Image
            style={{marginTop: 0, width: 24}} resizeMode={"contain"}
            source={require('image!./../../img/sharing/add-user.png')}/></TouchableOpacity>

        var rightButtonConfig = <TouchableOpacity style={{paddingLeft: 13, paddingRight: 13, paddingTop: 12}}
                                                  onPress={this.menuRight.bind(this)}><Icon size={24}
                                                                                            name="ios-search"/></TouchableOpacity>;


        return (


            <View style={styles.bg}>
                <Image source={require('image!./../../img/background/default/tapis.png')}
                       style={{flex: 1, height: null, width: null}}>
                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        rightButton={rightButtonConfig}

                        tintColor={"#fff"}/>
                    <ScrollableTabView style={{marginTop: 0,}} renderTabBar={() => <TabNewsfeed/>}
                                       initialPage={0}>
                        <Abos key={0}/>
                        <Discover key={1}/>
                    </ScrollableTabView>


                    <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                        <MenuTab option_back={this.props.name} page={this.props.name}/>
                    </View>

                </Image>
            </View>


        )
    }
}

/* <View style={[styles.overlay, { height: height}]} />*/
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    newsfeed: state.newsfeed.newsfeed,

    newsfeed_page: state.newsfeed.newsfeed_page,
    newsfeed_limit: state.newsfeed.newsfeed_limit,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_newsfeed: bindActionCreators(NewsfeedActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)

(
    Newsfeed
)
;
