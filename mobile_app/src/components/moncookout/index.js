import React, {Component} from 'react';
import {
    Dimensions,
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    RefreshControl,
    AlertIOS
} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import {bindActionCreators} from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';
import {connect}            from 'react-redux';

import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuTab from './../default/MenuTab';
import ShowBasics from './showBasics';
import ShowLevel from './showLevel';
import UpdateBasics from './updateBasics';
import ShowFollower from './showFollower';
import MyRecipes from './myrecipes';
import Loading from './../default/Loading'
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

class Moncookout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            deleteimg: false,
            updated: false,
            profile_updated: false,
            first_name: (this.props.user != null) ? this.props.user.first_name : null,
            last_name: (this.props.user != null) ? this.props.user.last_name : null,
            sexe: (this.props.user != null) ? this.props.user.gender : null,
            age: (this.props.user != null) ? this.props.user.range_age : null,
            level: (this.props.user != null) ? this.props.user.level : null,
            img_64: null,
            img: (this.props.user != null && this.props.user.media != null && this.props.user.media.profile_pi != "") ? APIRoot + "/images/users/" + this.props.user.media.profile_pi : null,
            img_partiel: null,
            list_recipes: null
        }
        this.menuLeft = this.menuLeft.bind(this);
        this.refreshing = this.refreshing.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
        this.updateDataBasicImage = this.updateDataBasicImage.bind(this);
        this.updateDataBasicName = this.updateDataBasicName.bind(this);
        this.updateDataBasicSexe = this.updateDataBasicSexe.bind(this);
        this.updateDataBasicAge = this.updateDataBasicAge.bind(this);
        this.updateDataBasicLevel = this.updateDataBasicLevel.bind(this);
        this.saveProfil = this.saveProfil.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.menuRight = this.menuRight.bind(this);
    }

    componentWillMount() {

        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('MonCookOut Page');

        if (typeof this.props.last_recipe !== "undefined" && this.props.last_recipe !== null && this.props.my_recipes !== null) {
            this.props.actions_recipe.retrieveMyRecipesRefresh(this.props.token);
            Actions.myrecipe({recipe: this.props.last_recipe})
        }
        if (typeof this.props.from_delete !== "undefined" && this.props.from_delete) {
            this.props.actions_recipe.retrieveMyRecipesRefresh(this.props.token);
        }
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }

    }

    componentDidMount() {
        if (this.props.token != null) {
            //      if (this.props.my_recipes == null)
            //   this.props.actions_recipe.retrieveMyRecipes(this.props.token);

            this.props.actions.retrieveMyNetwork(this.props.token);

            this.props.actions_recipe.getNumberMyRecipe(this.props.token);
        }

    }

    menuRight(e) {
        Actions.indexSearch();
    }

    componentWillUnmount(nextProps, nextState) {
        this.props.actions.destroy_cookout();
        this.props.actions_recipe.destroy_cookout();
    }

    deleteRecipe(id) {

        if (typeof id !== "undefined") {
            this.props.actions_recipe.deleteRecipeAction(this.props.token, id)
            this.setState({deleteimg: true});
        }
    }

    setUpdate() {
        this.setState({updated: true})
    }

    saveProfil() {

        if (this.state.img_64 != null) {
            this.props.actions.uploadAndSaveUserData(this.props.token, this.state.img_64);

        }
        var data = {
            last_name: (this.state.last_name != null && this.state.last_name.trim().length > 1) ? this.state.last_name.trim() : this.props.user.last_name,
            first_name: (this.state.first_name != null && this.state.first_name.trim().length > 1) ? this.state.first_name.trim() : this.props.user.first_name,
            gender: (this.state.sexe != null) ? this.state.sexe : this.props.user.gender,
            range_age: (this.state.age != null) ? this.state.age : this.props.user.range_age,
            level: (this.state.level != null) ? this.state.level : this.props.user.level
        }

        this.props.actions.updateBasicProfile(this.props.token, data);
        this.setState({profile_updated: true, updated: false})


        this.refreshing.bind(this);
        //this.setState({updated: false})
    }


    updateDataBasicImage(img, img_64) {
        this.setState({img: img, img_64: img_64, img_partiel: img_64})

    }

    updateDataBasicName(last_name, first_name) {
        this.setState({last_name: last_name, first_name: first_name})
    }

    updateDataBasicSexe(sexe) {
        this.setState({sexe: sexe})
    }

    updateDataBasicAge(age) {
        this.setState({age: age})
    }

    updateDataBasicLevel(level) {
        this.setState({level: level})
    }

    componentWillUpdate(nextProps, nextState) {


        if (nextState.isRefreshing && nextProps.my_recipes != null) {
            this.setState({isRefreshing: false})
        }
        if (!nextProps.isRequesting && nextState.deleteimg) {
            // nextProps.actions_recipe.retrieveMyRecipesRefresh(this.props.token);
            this.setState({isRefreshing: false, deleteimg: false});
        }
        if (nextState.profile_updated && nextProps.user != this.props.user) {
            var img = null;

            this.setState({
                profile_updated: false,
                first_name: (nextProps.user != null) ? nextProps.user.first_name : null,
                last_name: (nextProps.user != null) ? nextProps.user.last_name : null,
                sexe: (nextProps.user != null) ? nextProps.user.gender : null,
                age: (nextProps.user != null) ? nextProps.user.range_age : null,
                level: (nextProps.user != null) ? nextProps.user.level : null,
                img_64: null,
                //img: img
            })
        }
        if (!nextProps.isRequesting && nextProps.my_recipes == null && nextProps.count_recipe !== null) {
            global.storage.load({
                key: 'moncookout',
            }).then(ret => {

                // found data goes to then()
                if (typeof ret.data !== "undefined" && ret.data !== null && Object.keys(ret.data).length == nextProps.count_recipe) {
                    this.setState({
                        list_recipes: ret.data,

                    })
                }


                else {
                    this.props.actions_recipe.retrieveMyRecipes(this.props.token);
                }

            }).catch(err => {
                this.props.actions_recipe.retrieveMyRecipes(this.props.token);
            });
        }
        else if (!nextProps.isRequesting && nextProps.my_recipes != null && nextProps.count_recipe !== null) {
            storage.save({
                key: 'moncookout',   // Note: Do not use underscore("_") in key!
                rawData: {
                    from: 'Cookout',
                    token: nextProps.token,
                    data: nextProps.my_recipes
                },

                // if not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: null
            });
            this.setState({
                list_recipes: nextProps.my_recipes,

            })
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user ||
            nextState.isRefreshing !== this.state.isRefreshing ||
            nextState.img_64 !== this.state.img_64 ||
            nextState.img_partiel !== this.state.img_partiel ||
            nextState.img !== this.state.img ||
            nextState.last_name !== this.state.last_name ||
            nextState.age !== this.state.age ||
            nextState.list_recipes !== this.state.list_recipes ||
            nextState.sexe !== this.state.sexe ||
            nextState.level !== this.state.level ||
            nextState.deleteimg !== this.state.deleteimg ||
            nextState.profile_updated !== this.state.profile_updated ||
            nextState.first_name !== this.state.first_name ||
            nextState.updated !== this.state.updated ||
            nextProps.isRequesting !== this.props.isRequesting ||
            ( nextProps.count_recipe !== this.props.count_recipe) ||
            ( nextProps.my_recipes !== this.props.my_recipes) ||
            nextProps.my_network !== this.props.my_network
        )
    }

    menuLeft(e) {
        Actions.indexNetwork();
    }

    refreshing(e) {
        this.setState({isRefreshing: true});
        this.props.actions_recipe.retrieveMyRecipesRefresh(this.props.token);
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

                borderBottomWidth: 1,
            },
            updateProfileLink: {
                flex: 1
            },
            updateProfileLinkText: {
                flex: 1,
                textAlign: "center",
                marginTop: 25,
                textDecorationLine: "underline",
                fontFamily: 'OratorStd',
                fontSize: 12
            }
        });
        var titleConfig = <Image style={{marginBottom: 0, width: 92}} resizeMode={"contain"}
                                 source={require('image!./../../img/season/logo.png')}/>;

        var rightButtonConfig = <TouchableOpacity style={{paddingLeft: 13, paddingRight: 13, paddingTop: 12}}
                                                  onPress={this.menuRight.bind(this)}><Icon size={24}
                                                                                            name="ios-search"/></TouchableOpacity>;

        var leftButtonConfig = <TouchableOpacity style={{paddingLeft: 13, paddingRight: 13, paddingTop: 10}}
                                                 onPress={this.menuLeft.bind(this)}><Icon size={29}
                                                                                          name="ios-refresh"/></TouchableOpacity>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop: -16, marginLeft: 10}} onPress={this.menuLeft}><Image
            style={{marginTop: 0, width: 24}} resizeMode={"contain"}
            source={require('image!./../../img/sharing/add-user.png')}/></TouchableOpacity>


        if ((this.props.user == null )) {
            return (
                <View style={styles.bg}>
                    <Image source={require('image!./../../img/background/default/tapis.png')}
                           style={{flex: 1, height: null, width: null}}>

                        <NavigationBar
                            style={styles.navbar}
                            statusBar={{style: 'default', hidden: false, tintColor: "white", color: "#000"}}
                            title={titleConfig}
                            tintColor={"#fff"}/>
                        <Loading/>


                        <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                            <MenuTab option_back={this.props.name} page={this.props.name}/>
                        </View>
                    </Image>
                </View>)
        }
        return (
            <View style={styles.bg}>

                <Image source={require('image!./../../img/background/default/tapis.png')}
                       style={{flex: 1, height: null, width: null}}>

                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        rightButton={rightButtonConfig}
                        leftButton={leftButtonConfig}
                        statusBar={{style: 'default', hidden: false, tintColor: "white", color: "#000"}}
                        tintColor={"#fff"}/>

                    <ScrollView

                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshing}
                                tintColor="#aaaa"
                                title="Chargement..."
                                titleColor="#aaa"
                                colors={['#aaaa', '#ccc', '#aaa']}
                                progressBackgroundColor="#000"
                                backgroundColor="transparent"
                            />
                        }
                        style={{paddingTop: 10}}>
                        <View
                            style={{
                                justifyContent: 'flex-start',
                                flex: 1,
                                flexDirection: 'row',
                                paddingLeft: padding,
                                paddingRight: padding
                            }}>

                            <View
                                style={{flex: 0.4, flexDirection: 'column', backgroundColor: "transparent"}}>
                                {this.props.user != null && !this.state.updated && <ShowBasics user={this.props.user}/>}
                                {this.props.user != null && this.state.updated &&
                                <UpdateBasics updateDataBasicImage={this.updateDataBasicImage.bind(this)}
                                              updateDataBasicName={this.updateDataBasicName.bind(this)}
                                              updateDataBasicAge={this.updateDataBasicAge.bind(this)}
                                              updateDataBasicLevel={this.updateDataBasicLevel.bind(this)}
                                              updateDataBasicSexe={this.updateDataBasicSexe.bind(this)}
                                              user={this.props.user}/>}


                                <View>
                                    { this.props.user != null && !this.state.updated &&
                                    <TouchableHighlight
                                        style={styles.updateProfileLink}
                                        onPress={this.setUpdate.bind(this)}
                                        underlayColor='transparent'>
                                        <Text
                                            style={styles.updateProfileLinkText}>Modifier mon
                                            profil</Text></TouchableHighlight>}
                                    { this.props.user != null && this.state.updated &&
                                    <TouchableHighlight
                                        style={styles.updateProfileLink}
                                        onPress={this.saveProfil.bind(this)}
                                        underlayColor='transparent'>
                                        <Text
                                            style={styles.updateProfileLinkText}>Enregistrer mes
                                            modifications</Text></TouchableHighlight>}
                                </View>

                            </View>
                            <View style={{flex: 0.6, flexDirection: 'column'}}>
                                {this.props.count_recipe != null
                                && this.props.user != null
                                && this.props.my_network != null && typeof this.props.count_recipe !== "undefined" &&
                                <ShowFollower id_user={this.props.user.id} nbr_recipe={this.props.count_recipe}
                                              my_network={this.props.my_network}/>}
                                {this.props.count_recipe != null && typeof this.props.count_recipe !== "undefined" &&
                                <ShowLevel nbr_recipe={this.props.count_recipe}/>}


                            </View>

                        </View>
                        {this.state.list_recipes != null && this.props.user != null && !this.state.deleteimg &&
                        <MyRecipes user={this.props.user} delete_recipe={this.deleteRecipe.bind(this)}
                                   my_recipes={this.state.list_recipes}/>}

                    </ScrollView>
                    <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                        <MenuTab option_back={this.props.name} page={this.props.name}/>
                    </View>
                </Image>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    count_recipe: state.recipe.count_recipe,

    my_recipes: state.recipe.my_recipes,
    my_network: state.session.my_network,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_recipe: bindActionCreators(RecipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Moncookout);
