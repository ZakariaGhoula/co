import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableHighlight,TextInput,Dimensions,Image} from 'react-native';
import {OPTIONS_LEVEL} from './../../constants/config';
import {APIRoot} from './../../constants/config_path';
import _ from "underscore";

import Icon from 'react-native-vector-icons/Ionicons';
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false,
            search: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.updateList = this.updateList.bind(this);

    }

    componentDidMount() {
        if (this.state.search.trim().length > 0) {
            this.updateList(this.props.recipes, this.state.search);
        }

    }

    shouldCompenentUpdate(nextProps, nextState) {
        return (this.state.search !== nextState.search
        || this.state.close !== nextState.close
        || nextProps.recipes!==this.props.recipes)
    }

    componentWillUpdate(nextProps, nextState) {

        if ( nextState.search.trim().length !== this.state.search.trim().length)
            this.updateList(nextProps.recipes, nextState.search);
    }


    updateList(recipes, text) {
        var retour_list = [];
        if (recipes != null ) {

            for (var i in recipes) {
                var list_tags = recipes[i].tags;
                if (recipes[i].title.toLowerCase().includes(text.toLowerCase())) {
                    retour_list.push(recipes[i])
                }
                for (var j in list_tags) {
                    if (list_tags[j].toLowerCase().includes(text.toLowerCase())) {
                        retour_list.push(recipes[i])
                    }
                }

            }
            this.setState({search: text, close: (text.trim().length > 0)})

        }

        retour_list = _.uniq(retour_list);
        this.props.updateRecipe(retour_list);
    }

    handleSearch(text) {
        this.setState({search: text, close: (text.trim().length > 0)})
    }


    render() {


        var styles = StyleSheet.create({
            main: {

                flex: 1,
                paddingTop: 10,
                marginBottom: 22,
                borderBottomWidth: 1,
                borderColor: '#999999',
            }, input: {
                height: 30,
                paddingRight: 10,
                paddingLeft: 30,
                flex: 1,
                textAlign: 'left',
                backgroundColor: "transparent",
                borderTopWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
                color: '#000',
                fontFamily: 'OratorStd',
                fontSize: 13
            }, close: {
                position: "absolute",
                right: 10,
                top: 18
            }

        });

        return (
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    value={this.state.search}
                    defaultValue={this.state.search}
                    placeholderTextColor="#000"
                    onChangeText={this.handleSearch.bind(this)}
                    placeholder="Rechercher dans son CookOut"/>
                {this.state.close && <TouchableHighlight
                    onPress={this.handleSearch.bind(this,"")}
                    style={styles.close}
                    underlayColor='transparent'>
                    <Icon size={16} name="ios-close-circle-outline"/>
                </TouchableHighlight>
                }
            </View>
        );
    }
}