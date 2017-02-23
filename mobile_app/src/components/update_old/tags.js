import React, { Component } from 'react';
import {Text,TextInput,ScrollView,View,StyleSheet,TouchableOpacity,Dimensions,Image,Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as TagsActions    from './../../actions/TagsActions';
import * as ConfigActions    from './../../actions/ConfigActions';
import { connect }            from 'react-redux';
import AutoComplete from 'react-native-autocomplete';
class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.addTolistTagsSelected = this.addTolistTagsSelected.bind(this);
        this.deleteTolistTagsSelected = this.deleteTolistTagsSelected.bind(this);
        this.endTyping = this.endTyping.bind(this);
        this.onTyping = this.onTyping.bind(this);
        this.state = {
            listTagsSelected: [],
            data_autocomplete: null,
            text_autocomplete: null,
            connexionPress: false,
            textToShow: null,
            keyboardSpace: 0,
            visibleHeight: Dimensions.get('window').height
        }
    }

    componentDidMount() {
        let self = this;

        if (this.props.list_tags_suggest == null)
            this.props.actions_tags.retrieveTagsSuggest(this.props.token, 'fr');
        if (this.props.list_tags_autocomplete == null)
            this.props.actions_tags.retrieveTagsAutocomplete(this.props.token, 'fr');
        if (this.props.list_tag_recipe == null)
            this.props.actions_config.retrieveListTagRecipe('fr');
        this.setState({
            listTagsSelected: this.props.listTagsSelected,

        });


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.listTagsSelected !== this.state.listTagsSelected
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
            || nextState.data_autocomplete !== this.state.data_autocomplete
            || nextState.keyboardSpace !== this.state.keyboardSpace
            || nextState.text_autocomplete !== this.state.text_autocomplete
            || nextProps.list_tags_suggest !== this.props.list_tags_suggest
            || nextProps.list_tag_recipe !== this.props.list_tag_recipe
            || nextProps.list_tags_autocomplete !== this.props.list_tags_autocomplete
        )
    }


    onTyping(text) {


        if (this.props.list_tags_autocomplete != null)

            var tags = this.props.list_tags_autocomplete.filter(function (tag) {


                return tag.value.toLowerCase().startsWith(text.toLowerCase())

            }).map(function (tag) {

                return tag.value;

            });
        var tags_new = [];
        for (var j = 0; j < tags.length; j++) {
            if (j < 4) {
                tags_new.push(tags[j])
            }
        }

        this.setState({data_autocomplete: tags_new});
        this.setState({text_autocomplete: text});
    }

    endTyping(e) {

        var selectedTag = this.state.listTagsSelected;


        var color = ['#c69d8e', '#bac09e', '#dddeed'];
        var color_bg = _.sample(color);
        var data = {value: this.state.text_autocomplete, color: color_bg};


        selectedTag.push(data);
        var new_selectedTag = [];
        for (var i = 0; i < selectedTag.length; i++) {
            new_selectedTag.push(selectedTag[i]);
        }
        this.setState({listTagsSelected: new_selectedTag, text_autocomplete: ""});


    }


    isEmpty(value) {

        return !_.isEmpty(value);
    }


    handleClick(event) {
        this.setState({textToShow: null});
        if (this.state.listTagsSelected.length == 0) {
            this.setState({textToShow: "Veuillez renseigner au moins un tag"})
        }
        else {

            this.props.handleTags(this.state.listTagsSelected);
        }
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
            this.setState({listTagsSelected: new_selectedTag,text_autocomplete:null,data_autocomplete:null});
        }

        this.props.keyboardDidHide.bind(this);

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

    render() {


        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) );

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: "transparent",
                paddingLeft: padding,
                paddingRight: padding,
            },
            viewTextStatut: {
                marginTop: 10,
                marginBottom: 0,
                flexDirection: 'row',
                position: 'relative'
            },
            viewInput: {
                borderColor: '#20201e',
                borderBottomWidth: 1,
                justifyContent:"center",
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            }, textInput: {
                fontSize: 14,
                height: 40,

                color: '#20201e',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            },
            txt_btn: {
                fontSize: 15,
            },
            viewLogin: {
                height: 36,
                marginBottom: 20,
                flexDirection: 'row',
                position: 'relative',
                borderColor: '#b8b0aa',
                borderWidth: 0,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 70
            }, textLogin: {
                color: (this.state.connexionPress) ? "#fff" : '#000',
                fontSize: 15,

            }, tagBtn: {
                borderRadius: 6,
                padding: 3,
                marginRight: 7,
                marginBottom: 12,
                alignItems: 'center',
                alignSelf: 'stretch',
            },
            tag: {

                fontSize: 11,
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
            },


        });

        var color = ['#a0d0cb', '#e4e392', '#d0d0ce', '#fdcf8b', "#e4bfc3", '#c69d8e'];
        var color_bg = _.sample(color);
        var tags_suggest_list = null;
        if (this.props.list_tags_suggest != null) {
            var i = 0;
            var data = null;

            tags_suggest_list = <View
                style={{  paddingTop:5,paddingBottom:10,marginTop:10,marginBottom:10,alignItems:"center",flex:1, flexWrap: 'wrap',flexDirection:"row",position:"relative",alignSelf:"center",  justifyContent: 'space-around',}}>
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
        var tags_autocomplete = null;
        if (this.state.data_autocomplete != null) {
            var i = 0;
            var data = null;

            tags_autocomplete = <View
                style={{  paddingTop:5,paddingBottom:10,marginTop:10,marginBottom:10,flex:1,left:0,  flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    this.state.data_autocomplete.map(function (tag, index) {
                        var data_selected = false;
                        var color_bg = (color[i]);
                        i = i + 1;
                        if (i > 5) {
                            i = 0;
                        }
                        for (var j = 0; j < this.state.listTagsSelected.length; j++) {

                            if (this.state.listTagsSelected[j].value == tag) {
                                data_selected = true;
                                break;
                            }
                        }
                        if (!data_selected) {
                            return (<TouchableOpacity key={index}
                                                      style={[styles.tagBtn,{backgroundColor:color_bg}]}
                                                      underlayColor={color_bg}
                                                      onPress={this.addTolistTagsSelected.bind(this,(tag),color_bg)}
                            >
                                <Text style={[styles.tag,{backgroundColor:color_bg}]}>#{tag}</Text>
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


            <View style={[styles.bg]}>
                {tags_suggest_list !== null && <View>
                {this.state.textToShow != null
                &&
                <View style={styles.viewTextStatut}>
                    <Text
                        style={{flex:1,textAlign:"center",color:"#c41e26", fontFamily: 'Guardi-Roman'}}>{this.state.textToShow}</Text>
                </View>
                }
                {tags_suggest_selected !== null &&
                <View style={{flex:1,flexDirection:"row",paddingTop:20, }}>

                    <View style={{flex:0.3}}><Text style={{fontSize:12*(width/320),fontFamily: 'Guardi-Roman'}}>Vos tags
                        :</Text></View>
                    <View style={{flex:0.7}}>

                        {tags_suggest_selected}
                    </View>
                </View>
                }
                <View style={{flex:1,marginTop:padding,width:width,flexDirection:"row",alignItems:"center"}}>

                    <Text style={{color:(this.state.textToShow != null)?"#c41e26":"#000",fontSize:11*(width/320), marginRight:7,fontFamily: 'Guardi-Roman'}}>Ajouter
                        un ou plusieurs tags à votre
                        recette</Text><Text
                    style={{color:(this.state.textToShow != null)?"#c41e26":"#000",fontSize:10*(width/320),marginTop:4*(width/320),  fontFamily: 'GuardiLTStd-BlackItalic'}}>(Obligatoire)</Text></View>

                <View style={[styles.viewInput,{borderBottomWidth:0,marginTop:20}]}>

                    {tags_suggest_list}

                </View>
                <View style={[styles.viewInput,{marginTop:5}]}>
                    <TextInput
                        autoCorrect={false}
                        ref="email"
                        onChangeText={this.onTyping.bind(this)}
                        onSubmitEditing={this.endTyping.bind(this)}
                        onFocus={()=>this.props.scrolldown(0)}
                        defaultValue={this.state.text_autocomplete}
                        value={this.state.text_autocomplete}
                        placeholder="Créez votre propre tag"
                        placeholderTextColor="#20201e"
                        style={[styles.textInput,{flex:1}]}
                    />

                </View>
                <View style={[styles.viewInput,{marginTop:0,marginBottom:0,paddingBottom:0,  borderBottomWidth: 0}]}>
                    {this.state.data_autocomplete != null && tags_autocomplete}
                </View>


                <View
                    style={{alignItems:"center",marginTop:0, marginBottom:70, justifyContent:'center',flex:1,flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.viewLogin,{marginRight:10}]} underlayColor='transparent'
                                      onPress={this.props.handlePrev.bind(this,2)}>
                        <Image source={require('image!./../../img/subscribe/back.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.viewLogin,{marginLeft:10}]} underlayColor='transparent'
                                      onPress={this.handleClick.bind(this)}>
                        <Image source={require('image!./../../img/subscribe/next.png')}/>
                    </TouchableOpacity>
                </View>

</View>}
            </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Tags);


