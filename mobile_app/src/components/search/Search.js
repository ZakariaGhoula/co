import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {LoginButton,AccessToken,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-redux-router';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as SearchActions    from './../../actions/SearchActions';
import { connect }            from 'react-redux';

import NavigationBar from 'react-native-navbar';

import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-search-bar';
import SearchProfils from './SearchProfils';
import SearchRecipe from './SearchRecipe';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text :""

        }

        this.menuLeft = this.menuLeft.bind(this);
        this.menuRight = this.menuRight.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
        this.onSearchButtonPress = this.onSearchButtonPress.bind(this);

    }

    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Page de recherche Page');
    }
    componentDidMount() {

        if (this.props.user == null) {

            this.props.actions.retrieveDataRequest(this.props.token);
        }

        if(typeof this.props.textSearch !=="undefined" &&  this.props.textSearch !=null){
            this.setState({
                text:this.props.textSearch
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || nextProps.search_page !== this.props.search_page
            || nextProps.search_list !== this.props.search_list
            || nextProps.search_limit !== this.props.search_limit
            || nextProps.isRequesting !== this.props.isRequesting
            || nextState.text !== this.state.text
        )
    }

    menuLeft(e) {
        Actions.newsfeed();
        // this.setState({isOpen: !this.state.isOpen});
    }

    menuRight(e) {
        alert('ok')
    }

    onChangeText(e) {
        if (e.length > 1) {
            this.setState({text:e});
            this.props.actions_search.retrieveSearch(this.props.token, e, this.props.search_limit, this.props.search_page + 1);
        }
    }

    onSearchButtonPress(e) {
        if (e.length > 1) {
            this.setState({text:e});
            this.props.actions_search.retrieveSearch(this.props.token, e, this.props.search_limit, this.props.search_page + 1);
        }
    }

    onCancelButtonPress(e) {

    }

    render() {


        var styles = StyleSheet.create({
            bg: {
                flex: 1,


            },
            view: {
                flex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 20,
                paddingTop: 20,
                bottom: 0
            },
            beer: {
                flex: 1,
            },
            text: {
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
            },
            textInput: {
                fontSize: 14,
                height: 40,

                color: 'white',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            }, hr: {
                borderColor: '#838182',
                borderWidth: 1,
            },
            viewInput: {
                borderColor: '#ccc',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            },
            viewFacebook: {
                height: 40,
                marginBottom: 20,

                flexDirection: 'row',
                position: 'relative',
                /*backgroundColor: '#2d609b',
                 */backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 30,
            }, btnFacebook: {
                height: 40,
                marginBottom: 40,
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                alignSelf: 'stretch',
                alignItems: 'center'


            },
            viewOr: {
                height: 16,
                marginBottom: 20,
                marginTop: 20,
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',

            },
            viewLogin: {
                height: 40,
                marginBottom: 40,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: '#398797',
                borderColor: "#fff",
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 30,
                marginTop: 30,

            },
            textLogin: {
                fontSize: 15,
                color: '#fff'
            },
            viewSubscribe: {
                height: 40,
                bottom: 0,
                position: 'absolute',
                justifyContent: 'center',
                left: 0, right: 0,
                alignSelf: 'center',
                flexDirection: 'row',
            },
            textbtnSubscribe: {
                fontSize: 17,
                position: 'absolute',
                flex: 1,
                color: "#fff",
            },
            btnSubscribe: {},
            titleList: {
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                marginBottom: 10,
                backgroundColor: '#c7c7c7',
                color: "#Fff"
            }

        });
        var back = APIRoot + "/image/login3.jpg";

        var leftButtonConfig =
            (<Icon.Button name="ios-arrow-round-back" size={26} marginLeft={10} color="#000" backgroundColor="#fff"
                          onPress={this.menuLeft.bind(this)}/>)


        var search = (<SearchBar
            ref='searchBar'
            value={this.state.text}

            placeholder='Recherche'
            onCancelButtonPress={this.onCancelButtonPress.bind(this)}
            onChangeText={this.onChangeText.bind(this)}
            onSearchButtonPress={()=>this.refs.searchBar.blur(this)}
        />);
        var titleConfig = (<TextInput placeholder="toto"
                                      style={{height:35,width:160, fontSize:13,color:"#ababab",marginLeft:100,borderColor:'#ccc', borderWidth:1}}/>)
//  <Image source={require('./../../img/login3.jpg')} style={styles.bg}>
        var titleConfig =
                <Image
                    source={require('./../../../img/logo/cookout-co.png')}
                />
            ;


        var result = null;
        var resultUser = null;
        var resultRecipe = null;

        if (this.props.search_list != null && this.props.search_list.users.length > 0) {

            resultUser = <View style={{flex:1}}>{this.props.search_list.users.map(function (user, i) {
                return (<SearchProfils key={i} user={user} textSearch={this.state.text}/>)
            }, this)}</View>
        }

        if (this.props.search_list != null && this.props.search_list.recipes.length > 0) {

            resultRecipe = <View style={{flex:1}}>{this.props.search_list.recipes.map(function (recipe, i) {
                return (<SearchRecipe key={i} recipe={recipe} textSearch={this.state.text}/>)
            }, this)}</View>
        }


        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:40,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}

                    tintColor={"#fff"}/>
                {search}
                <ScrollView>
                    { (resultRecipe != null) ?
                        <View style={{marginTop:10}}>
                            <Text style={styles.titleList}>Recettes</Text>
                            {resultRecipe}</View> : null
                    }{ (resultUser != null) ?
                    <View style={{marginTop:10}}>
                        <Text style={styles.titleList}>Profils</Text>
                        {resultUser}</View> : null
                }
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
