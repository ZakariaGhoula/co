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
import * as SearchActions    from './../../actions/SearchActions';
import * as SessionActions    from './../../actions/SessionActions';
import {connect}            from 'react-redux';

import Loading from './../default/Loading'
import NavigationBar from 'react-native-navbar';
import MenuTab from './../default/MenuTab';
import NetworkFb from './../login/NetworkFb';
import SearchBar from 'react-native-search-bar';
import _                      from 'underscore';
import NetworkProfilsSearch from './../network/NetworkProfilsSearch';
class IndexNetwork extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list_default: this.props.list,
            is_typing: false,


        }

        this.menuLeft = this.menuLeft.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

    }


    componentWillMount() {
        if (this.props.user !== null && this.props.my_network !== null && typeof this.props.my_network.abos !== "undefined") {
            this.props.actions_sessions.retrieveNewSuggestionNetwork(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.search_follow_list !== nextProps.search_follow_list) {
            this.setState({
                is_typing: false
            });
        }
    }

    onCancelButtonPress(e) {
        this.setState({
            list_default: this.props.list
        });
        this.props.actions.destroy_search_follow();
    }

    onChangeText(e) {
        var retour_list = [];
        var actuel = [];
        this.setState({
            is_typing: true
        });
        if (e.length == 0) {
            this.props.actions.destroy_search_follow();
        } else {
            this.props.actions.retrieveSearchFollow(this.props.token, e);
            if (this.props.list != null) {
                for (var i in this.props.list) {

                    if (this.props.list[i].first_name.toLowerCase().includes(e.toLowerCase()) ||
                        this.props.list[i].last_name.toLowerCase().includes(e.toLowerCase())) {
                        retour_list.push(this.props.list[i])
                    }


                }


            }
            retour_list = _.uniq(retour_list);
            this.setState({
                list_default: retour_list
            });
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.list_default !== nextState.list_default
        || this.props.isRequesting !== nextProps.isRequesting
        || this.state.is_typing !== nextState.is_typing
        || this.props.search_follow_list !== nextProps.search_follow_list
        || this.props.my_network !== nextProps.my_network
        || this.props.new_suggestion_network !== nextProps.new_suggestion_network)
    }

    componentWillUnmount(nextProps, nextState) {
        this.props.actions_sessions.destroyNewSuggestionFriends();
        this.props.actions.destroy_search_follow();
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


        var titleConfig = <Image style={{marginBottom: 2, width: 92}} resizeMode={"contain"}
                                 source={require('image!./../../img/season/logo.png')}/>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop: 15, marginLeft: 10}} onPress={this.menuLeft}><Image
            source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>


        var followers = this.state.list_default;
        var to_show = null;


        var connect = null;

             connect = <NetworkFb/>;


        if (this.props.user !== null && this.state.list_default == null && this.props.my_network !== null && typeof this.props.my_network.abos !== "undefined" && this.props.new_suggestion_network != null && Object.keys(this.props.new_suggestion_network).length > 0) {
            to_show = <View
                style={{borderColor: '#c7c7c7', borderBottomWidth: 0, borderTopWidth: 0}}>

                {Object.keys(this.props.new_suggestion_network).map(function (user, index) {
                    return (<NetworkProfilsSearch key={index} user={this.props.new_suggestion_network[user]}/>)
                }, this)}</View>;
        }
        else if (( this.state.list_default != null && this.state.list_default.length == 0) && this.props.search_follow_list == null) {

            to_show = <View
                style={{flex: 1, alignItems: "center", padding: padding}}
            ><Text style={[styles.block_title, {paddingTop: 40}]}>Utilisateur introuvable</Text></View>
        }
        else if (this.props.search_follow_list != null && this.state.list_default.length >= 0) {

            to_show = <View
                style={{borderColor: '#c7c7c7', borderBottomWidth: 0, borderTopWidth: 0}}>

                {this.props.search_follow_list.result.map(function (user, index) {

                    return (<NetworkProfilsSearch key={index} user={user}/>)
                }, this)}</View>;
        }


        return (


            <View style={styles.bg}>
                {  (this.props.isRequesting) && !this.state.is_typing &&
                <Loading visible={true} text=""/>}
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

                        ref='searchBar'
                        placeholder='Recherche'
                        onCancelButtonPress={this.onCancelButtonPress.bind(this)}
                        onChangeText={this.onChangeText.bind(this)}
                        onSearchButtonPress={() => this.refs.searchBar.blur(this)}
                    />
                    <ScrollView style={{flex: 1, paddingTop: 4, paddingBottom: 100}}>
                        <View style={{flex: 1, paddingBottom: 100}}>
                            {connect}

                            {(this.props.user !== null && this.state.list_default == null && this.props.my_network !== null && typeof this.props.my_network.abos !== "undefined" && this.props.new_suggestion_network != null && Object.keys(this.props.new_suggestion_network).length > 0) &&
                            <Text style={{
                                fontSize: 13,
                                textAlign: "center",
                                fontFamily: 'Guardi-Roman',
                                color: "#aaa",
                                paddingTop: 20,
                                paddingBottom: 20
                            }}>Suggestions</Text>}

                            { (this.props.search_follow_list != null) && this.state.list_default.length >= 0 &&
                            <Text style={{
                                fontSize: 13,
                                textAlign: "center",
                                fontFamily: 'Guardi-Roman',
                                color: "#aaa",
                                paddingTop: 20,
                                paddingBottom: 20
                            }}>Résultats de recherche</Text>}
                            {to_show}

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
    new_suggestion_network: state.session.new_suggestion_network,
    my_network: state.session.my_network,
    search_follow_list: state.searchs.search_follow_list,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SearchActions, dispatch),
    actions_sessions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexNetwork);