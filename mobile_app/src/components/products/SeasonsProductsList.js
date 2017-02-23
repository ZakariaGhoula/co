import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableHighlight,Dimensions} from 'react-native';
import _ from 'underscore';

export default class SeasonsProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_cat_active: [],
        }
        this.handleClickList = this.handleClickList.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
        nextState.id_cat_active !== this.state.id_cat_active)
    }

    handleClickList(id) {
        var current_id_cat_active = this.state.id_cat_active;
        var id_cat_active = [];

        for(var j=0;j<current_id_cat_active.length;j++){
            id_cat_active.push(current_id_cat_active[j])
        }

        if (!id_cat_active.includes(id)) {
            id_cat_active.push(id);
        }
        else{
            var index = id_cat_active.indexOf(id);
            if (index > -1) {
                id_cat_active.splice(index, 1);
            }
        }

        this.setState({id_cat_active: id_cat_active});
    }

    render() {

        var styles = StyleSheet.create({
            view_list_element: {alignItems: 'center', marginTop: 22, backgroundColor: "transparent"},
            view_list_element_text: {
                fontFamily: 'Guardi-Roman',
                color: '#2b301b',
                fontSize: 17,
                textDecorationLine: "underline",
                lineHeight: 17
            },
            view_list_element_product_view: {alignItems: 'center', marginTop: 15, backgroundColor: "transparent"},
            view_list_element_product_view_text: {
                fontFamily: 'Guardi-Roman',
                color: '#2b301b',
                fontSize: 16,
                lineHeight: 17,
                marginBottom:5

            },
        });
        var list_to_show = null;
        if (typeof this.props.listElement !== "undefined" && this.props.listElement !== null) {
            var array_product = [];

            for (var i in  this.props.listElement) {
                array_product.push(this.props.listElement[i]);
            }
            list_to_show = array_product.map(function (product, index) {

                var list_to_show = null;
                var list = product.products;

                var list_to_show = list.map(function (product2, index2) {
                    return (
                        <Text style={ styles.view_list_element_product_view_text} key={index2}>{product2.title}</Text>)
                });
                return (<View style={styles.view_list_element}
                              key={index}>
                    <TouchableHighlight underlayColor='transparent'
                                        onPress={()=>this.handleClickList(product.id_cat)}><Text
                        style={[styles.view_list_element_text,{fontWeight:(this.state.id_cat_active.includes(product.id_cat))?"bold":"normal",color:(this.state.id_cat_active.includes(product.id_cat))?"#f1ae69":"#2b301b"}]}>{product.cat_name}</Text>
                    </TouchableHighlight>
                    {(this.state.id_cat_active.includes(product.id_cat))&&
                    <View style={styles.view_list_element_product_view}>
                        {list_to_show}
                    </View>
                    }
                </View>);

            }, this);


        }
        return (
            <View  style={{paddingBottom:100}}>
                {list_to_show}
            </View>
        );
    }
}