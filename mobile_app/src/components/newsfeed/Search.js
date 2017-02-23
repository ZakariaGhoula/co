import React, { Component } from 'react';
import {Text,TextInput,View,ScrollView,StyleSheet,TouchableOpacity,Dimensions,Image,Animated} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";
import ButtonSearch from './ButtonSearch';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as TagsActions    from './../../actions/TagsActions';
import * as ConfigActions    from './../../actions/ConfigActions';
import { connect }            from 'react-redux';
var {
    height: deviceHeight
    } = Dimensions.get('window');
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            btn_actu: "",
            btn_co: false,
            listTagsSelected: [],
            btn_user: false,
            close: false,
            offset: new Animated.Value(deviceHeight)
        }
        this.closeModal = this.closeModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.updateBtnActu = this.updateBtnActu.bind(this);
        this.updateBtnCo = this.updateBtnCo.bind(this);
        this.updateBtnUser = this.updateBtnUser.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.addTolistTagsSelected = this.addTolistTagsSelected.bind(this);
        this.deleteTolistTagsSelected = this.deleteTolistTagsSelected.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.search !== nextState.search
            || this.state.close !== nextState.close
            || this.state.offset !== nextState.offset
            || this.state.listTagsSelected !== nextState.listTagsSelected
            || this.state.btn_actu !== nextState.btn_actu
            || this.state.btn_co !== nextState.btn_co
            || this.state.btn_user !== nextState.btn_user
            || this.props.list_tags_suggest !== nextProps.list_tags_suggest
        )
    }

    handleSearch(text) {
        this.setState({search: text, close: (text.trim().length > 0)})
    }


    updateBtnActu(v) {
        this.setState({btn_actu: !this.state.btn_actu})

    }

    updateBtnCo(v) {

        this.setState({btn_co: !this.state.btn_co})

    }

    updateBtnUser(v) {

        this.setState({btn_user: !this.state.btn_user})

    }

    handleGo() {
        var data = null;
        var list_final_tag = [];
        for (var i = 0; i < this.state.listTagsSelected.length; i++) {
            list_final_tag[i] = this.state.listTagsSelected[i]['value']
        }
        data = {
            search: this.state.search.trim().length > 0 ? this.state.search.trim() : null,
            actu: (this.state.btn_actu)?1:0,
            cout: this.state.btn_co?1:0,
            user: this.state.btn_user?1:0,
            tag: list_final_tag,
        };

        Actions.resultsearch({data_search: data});
    }

    addTolistTagsSelected(val, color_bg) {

        var selectedTag = this.state.listTagsSelected;

        var data = {value: val, color: color_bg};


        var index = -1;

        for (var i = 0; i < selectedTag.length; i++) {
            if (selectedTag[i].value == val) {
                index = 1;
                break;
            }
        }


        if (index <= 0) {

            selectedTag.push(data);
            var new_selectedTag = [];
            for (var i = 0; i < selectedTag.length; i++) {
                new_selectedTag.push(selectedTag[i]);
            }
            this.setState({listTagsSelected: new_selectedTag});
        }

        // this.props.keyboardDidHide.bind(this);

    }

    deleteTolistTagsSelected(val, color_bg) {
        var selectedTag = this.state.listTagsSelected;

        var data = {value: val, color: color_bg};

        var index = -1;

        var arr = _.reject(selectedTag, function (d) {

            return d.value == val;
        });


        this.setState({
            listTagsSelected: arr
        });


    }

    componentDidMount() {
        if (this.props.list_tags_suggest == null)
            this.props.actions_tags.retrieveTagsSuggest(this.props.token, 'fr');
        Animated.timing(this.state.offset, {
            duration: 100,
            toValue: 0
        }).start();
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 100,
            toValue: deviceHeight
        }).start(this.props.close_modal());
    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) );
        var styles = StyleSheet.create({
            container: {
                flex: 1,
            },
            flexCenter: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            modal: {
                backgroundColor: 'rgba(0,0,0,.8)',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }, input: {
                height: 30,
                paddingRight: 10,
                paddingLeft: 30,
                flex: 1,
                textAlign: 'left',
                backgroundColor: "transparent",
                borderTopWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#fff',
                color: '#fff',
                fontSize: 14
            }, close: {
                position: "absolute",
                right: 10,
                top: 18
            }, viewInput: {
                borderColor: '#20201e',
                borderBottomWidth: 0,
                flex: 1,
                backgroundColor: "transparent",
                alignItems: "stretch",
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative',
                flexWrap: 'nowrap'
            }
            , main: {

                flex: 1,
                paddingTop: 10,
                marginTop: 40,
                marginBottom: 52,
                borderBottomWidth: 1,
                borderColor: '#fff'
            },
            tagBtn: {
                borderRadius: 6,
                padding: 3,

                alignItems: "center",
                marginRight: 3,
                marginLeft: 3,
                marginBottom: 12
            },
            tag: {

                fontSize: 10,
            }, autocomplete_container: {
                flex: 1,
                paddingBottom: 20,

                backgroundColor: '#FFF',
            },
            autocomplete: {
                alignSelf: 'stretch',
                height: 30,
                backgroundColor: '#FFF',
                fontSize: 13,
                color: '#000',
                paddingLeft: 10,
                borderColor: '#95979a',
                borderWidth: 1,
                paddingLeft: 10,
                marginBottom: 10
            }, btn: {
                paddingTop: 7,
                paddingBottom: 7,
                flex: 1,
                backgroundColor: 'transparent',
                borderColor: '#fff',
                borderWidth: 1,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 12,
                opacity: 1,
                marginBottom: 15,
            },
            txt_btn: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Guardi-Roman',

            }

        });
        var color = ['#a0d0cb', '#e4e392', '#d0d0ce', '#fdcf8b', "#e4bfc3", '#c69d8e'];
        var color_bg = _.sample(color);
        var tags_suggest_list = null;
        if (this.props.list_tags_suggest != null) {
            var i = 0;
            var data = null;

            tags_suggest_list = <View
                style={{  paddingTop:5,paddingBottom:10,marginTop:10,marginBottom:10,flex:1,  flexDirection: 'row', flexWrap: 'wrap',alignItems:"center"}}>
                {
                    this.props.list_tags_suggest.map(function (tag, index) {
                        var data_selected = false;
                        var color_bg = (color[i]);
                        i = i + 1;
                        if (i > 5) {
                            i = 0;
                        }
                        for (var j = 0; j < this.state.listTagsSelected.length; j++) {

                            if (this.state.listTagsSelected[j].value == tag.value) {
                                data_selected = true;
                                break;
                            }
                        }
                        if (!data_selected) {
                            return (<TouchableOpacity key={index}
                                                      style={[styles.tagBtn,{backgroundColor:color_bg}]}
                                                      underlayColor={color_bg}
                                                      onPress={this.addTolistTagsSelected.bind(this,(tag.value),color_bg)}
                            >
                                <Text style={[styles.tag,{backgroundColor:color_bg}]}>#{tag.value}</Text>
                            </TouchableOpacity> )
                        }

                    }, this)
                }
            </View>;
        }

        var tags_suggest_selected = null;
        if (this.state.listTagsSelected.length > 0) {
            tags_suggest_selected = <View
                style={{  flex:1,left:0, flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    this.state.listTagsSelected.map(function (tag, index) {
                        var color_bg = tag.color;
                        return (<TouchableOpacity key={index}
                                                  style={[styles.tagBtn,{backgroundColor:color_bg}]}
                                                  underlayColor={color_bg}
                                                  onPress={this.deleteTolistTagsSelected.bind(this,(tag.value),color_bg)}
                        >
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                <Text style={[styles.tag,{backgroundColor:color_bg,marginRight:5}]}>#{tag.value}</Text>
                                <Icon name={'ios-close'} size={15}
                                      color="#000"/>
                            </View>
                        </TouchableOpacity> )
                    }, this)
                }
            </View>;
        }
        return (
            <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
                <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                    <Image source={require('image!./../../img/options/logo.png')}/>
                </View>
                <TouchableOpacity

                    onPress={this.closeModal}
                    style={{position:"absolute",backgroundColor:"transparent",top:20,left:20}}>
                    <Icon name="ios-close" size={50} color="#ededed" backgroundColor="transparent"/>
                </TouchableOpacity>

                <ScrollView
                    style={{paddingLeft:30,paddingRight:30,flex:1,width:w.width-60}}
                    automaticallyAdjustContentInsets={false}
                    bounces={false}>

                    <View style={styles.main}>
                        <TextInput
                            style={styles.input}
                            value={this.state.search}
                            defaultValue={this.state.search}
                            placeholderTextColor="#fff"
                            onChangeText={this.handleSearch.bind(this)}
                            placeholder="Rechercher"/>

                    </View>

                    <ButtonSearch handleBtn={this.updateBtnActu.bind(this)} selected={this.state.btn_actu}
                                  title="Dans les Actualités" type="1"/>
                    <ButtonSearch handleBtn={this.updateBtnCo.bind(this)} title="Dans Mon Cookout"
                                  selected={this.state.btn_co} type="2"/>
                    <ButtonSearch handleBtn={this.updateBtnUser.bind(this)} title="Un utilisateur"
                                  selected={this.state.btn_user} type="3"/>
                    {tags_suggest_selected !== null &&
                    <View style={{flex:1,flexDirection:"row",paddingTop:20, }}>

                        <View style={{flex:0.3}}><Text
                            style={{fontSize:12*(width/320),color:"#fff",fontFamily: 'Guardi-Roman'}}>Vos tags
                            :</Text></View>
                        <View style={{flex:0.7}}>

                            {tags_suggest_selected}
                        </View>
                    </View>
                    }
                    <View style={[styles.viewInput,{borderBottomWidth:0,marginTop:20}]}>

                        {tags_suggest_list}
                    </View>

                    <View style={{flex:1, }}>
                        <TouchableOpacity style={styles.btn}
                                          onPress={this.handleGo.bind(this)}>
                            <View style={{ flexDirection:'row',flex:1,  alignItems: "stretch",}}>

                                <Text style={styles.txt_btn}>Rechercher</Text></View>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            </Animated.View>

        );
    }
}
const mapStateToProps = (state) => ({
    isRequesting: state.loading.shown,
    list_tag_recipe: state.config.list_tag_recipe,
    list_tags_suggest: state.tags.list_tags_suggest,
    list_tags_autocomplete: state.tags.list_tags_autocomplete,
    token: state.session.token
});

const mapDispatchToProps = (dispatch) => ({
    actions_tags: bindActionCreators(TagsActions, dispatch),

    actions_config: bindActionCreators(ConfigActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
