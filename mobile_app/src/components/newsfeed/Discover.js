import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ListView, RefreshControl} from 'react-native';
import {APIRoot} from './../../constants/config_path';

import {Actions} from 'react-native-redux-router';

import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Pie';
import {Col, Row, Grid} from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import {bindActionCreators} from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as NewsfeedActions    from './../../actions/NewsfeedActions';
import {connect}            from 'react-redux';
import MenuTab from './../default/MenuTab';
import NewsfeedItem from './NewsfeedItem';
import BlockSlider from './blockSlider';
import Search from './Search';

import LoadingOverlay from 'react-native-loading-overlay';
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
//import Carousel from 'react-native-carousel';
import Carousel from 'react-native-looped-carousel';
class Discover extends React.Component {
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
        this.menuLeft = this.menuLeft.bind(this);
        this.menuRight = this.menuRight.bind(this);
        this.onFetch = this.onFetch.bind(this);
        this.renderRowView = this.renderRowView.bind(this);
        this.renderEmptyView = this.renderEmptyView.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    onFetch(e) {

        if (this.props.newsfeed!==null && Object.keys(this.props.newsfeed).length >= (this.props.newsfeed_limit * this.props.newsfeed_page)) {
            setTimeout(() => {
                this.props.actions_newsfeed.retrieveNewsFeed(this.props.token, this.props.newsfeed_limit, this.props.newsfeed_page + 1);
            }, 1000); // simulating network fetching
        }
    }

    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Actualités Page');
    }

    componentDidMount() {
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
        if (this.props.newsfeed == null) {
            this.props.actions_newsfeed.retrieveNewsFeed(this.props.token, this.props.newsfeed_limit, 1);

        }//
        else {

            this.setState({
                data_to_show: this.state.dataSource.cloneWithRows([this.props.newsfeed]),
                'loaded': true
            })
        }
    }

    search() {

        Actions.indexSearch();
        // this.setState({search_open: !this.state.search_open})
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.newsfeed != null && this.props.newsfeed != nextProps.newsfeed) {
            this.setState({
                data_to_show: this.state.dataSource.cloneWithRows([nextProps.newsfeed]),
                'loaded': true
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || nextProps.newsfeed !== this.props.newsfeed
            || nextProps.newsfeed_page !== this.props.newsfeed_page
            || nextProps.newsfeed_limit !== this.props.newsfeed_limit
            || nextState.search_open !== this.state.search_open
            || nextState.loaded !== this.state.loaded
            || nextState.data_to_show !== this.state.data_to_show
        )
    }

    onRefresh() {
        this.props.actions_newsfeed.retrieveReloadNewsFeed(this.props.token, this.props.newsfeed_limit, 1);
    }

    renderRowView(rowData) {
        var Dimensions = require('Dimensions');
        var w = Dimensions.get('window');
        var r = ((w.width - 2 * 10) / 2);

        var styles = StyleSheet.create({
            container: {
                width: w.width,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'blue',
            },
        });
        var slider = null;
        var limit_to_show_slider = 5;

        var team_slider = [];
        var count_to_slider = 0;
        if (typeof this.props.newsfeed !== "undefined" && this.props.newsfeed != null) {
            for (var i in this.props.newsfeed) {
                if (count_to_slider < 5) {
                    if (typeof this.props.newsfeed[i] !== "undefined" && this.props.newsfeed[i] !== null && this.props.newsfeed[i].is_team == 1) {
                        var r2 = <BlockSlider key={i} user={this.props.user} recipe={this.props.newsfeed[i]}/>
                        team_slider.push(r2);
                        count_to_slider += 1;

                    }
                }

            }
        }

        /* var slider = <Carousel
         animate={false}
         hideIndicators={false}
         loop={true}
         indicatorOffset={10}
         indicatorSize={25} // Indicator bullet size
         indicatorSpace={6}
         indicatorColor="#6e6e6e"
         inactiveIndicatorColor="#fff"
         width={w.width}>{Object.keys(rowData).map(function (block, index) {

         if (typeof this.props.newsfeed !== "undefined" && this.props.newsfeed !== null && typeof rowData[block]!=="undefined" && rowData[block].is_team==1 && index < count_to_slider) {

         var r2 = <BlockSlider key={index} user={this.props.user} recipe={rowData[block]}/>
         return (r2 );

         }
         }, this)}</Carousel>;*/


        {
            Object.keys(rowData).map(function (block, index) {
                if (typeof this.props.newsfeed !== "undefined" && this.props.newsfeed !== null && typeof rowData[block] !== "undefined" && rowData[block].is_team == 1 && index < count_to_slider) {
                    var r2 = <BlockSlider key={index} user={this.props.user} recipe={rowData[block]}/>
                    return (r2 );
                }
            }, this)
        }

        var slider = <Carousel
            delay={2000}
            style={{width: w.width, height: w.width * (175 / 320)}}
            autoplay={false}
            bullets={true}
        >{team_slider}</Carousel>;

        var col1 = <Col>{Object.keys(rowData).map(function (block, index) {

            if (index > count_to_slider && index % 2 == 0)
                var r2 = <NewsfeedItem width_element={r} user={this.props.user} key={index} recipe={rowData[block]}/>
            return (r2 );
        }, this)}</Col>;

        var col2 = <Col>{Object.keys(rowData).map(function (block, index) {

            if (index > count_to_slider && index % 2 !== 0)
                var r2 = <NewsfeedItem width_element={r} user={this.props.user} key={index} recipe={rowData[block]}/>
            return (r2 );
        }, this)}</Col>
        return (
            <Grid>
                <Row style={{height: (w.width * 175 / 320)}}>
                    {slider}

                </Row>
                <Row style={{marginLeft: 15}}>
                    {col1}
                    {col2}
                </Row>
            </Grid>


        );
    }

    renderEmptyView() {
        return (
            <View style={{flex: 1}}>
                <Image source={require('image!./../../img/background/default/tapis.png')}
                       style={{flex: 1, height: null, width: null}}>
                    <Text style={{padding: 10, textAlign: 'center', color: '#398797', flex: 1,}}>
                        Désolé, Aucun contenu ne peut être affiché
                    </Text>

                    <TouchableHighlight
                        underlayColor='#c8c7cc'
                        onPress={refreshCallback}
                    >
                        <Text>
                            ↻
                        </Text>
                    </TouchableHighlight></Image>
            </View>

        );
    }

    menuLeft(e) {
        Actions.menu();
        // this.setState({isOpen: !this.state.isOpen});
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

        var rightButtonConfig = <TouchableOpacity style={{marginTop: 12, marginRight: 13}}
                                                  onPress={this.search.bind(this)}><Icon size={22}
                                                                                         name="ios-search"/></TouchableOpacity>;


        if ((   this.props.newsfeed == null && !this.state.loaded  )) {
            return (

                <View style={{flex: 1, justifyContent: 'center', width: null, height: null}}>
                <LoadingOverlay visible={true} text=""/>
                </View>
            )
        }


        return (


            <View style={styles.bg}>

                <Image source={require('image!./../../img/background/default/tapis.png')}
                       style={{flex: 1, height: null, width: null}}>
                    {
                        this.state.loaded &&

                        <ListView
                            style={{

                                width: w.width

                            }}

                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }

                            pageSize={5}

                            initialListSize={5}
                            dataSource={this.state.data_to_show}
                            renderRow={this.renderRowView.bind(this)}

                            enableEmptySections={true}
                            onEndReached={this.onFetch.bind(this)}
                        >

                        </ListView>}
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
    Discover
)
;
