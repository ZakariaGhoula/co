import React, { Component } from 'react';
import {Text,View,StyleSheet,Image,TouchableHighlight,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-redux-router';
export default class ButtonSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: this.props.selected
        }

        this.handlePress = this.handlePress.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.pressed !== this.state.pressed || this.props.type != nextProps.type)
    }

    handlePress() {

        this.props.handleBtn();
        this.setState({pressed: !this.state.pressed})


    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var w_btn = width - (width * 0.25);
        var styles = StyleSheet.create({
            btn: {
                paddingTop: 7,
                paddingBottom: 7,
                flex: 1,
                backgroundColor: 'transparent',
                borderColor: (this.state.pressed) ? "#fdaa69" : '#fff',
                borderWidth: 1,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 12,
                opacity: 1,
                marginBottom: 15,
            },
            txt_btn: {
                color: (this.state.pressed) ? "#fdaa69" : '#fff',
                fontSize: 14,
                marginTop: 4,
                fontFamily: 'Guardi-Roman',
                flex: 0.7
            }

        });


        var image = null;
        if (this.props.type == "1") {
            image = (this.state.pressed) ? <Text
                style={{flex:0.3,marginRight:10,color:"#fdaa69",fontSize:17,marginTop:6, fontFamily: 'GuardiLTStd-BlackItalic',}}>A</Text> :
                <Text
                    style={{flex:0.3,marginRight:10,color:"#fff",fontSize:17,marginTop:6, fontFamily: 'GuardiLTStd-BlackItalic'}}>A</Text>;
        }
        else if (this.props.type == "2") {
            image = (this.state.pressed) ?
                <Icon size={23} style={{flex:0.3,marginRight:10,marginTop:0}} name="ios-book-outline"
                      color={"#fdaa69"}/>
                : <Icon size={23} style={{flex:0.3,marginRight:10,marginTop:0,}} color={"#fff"}
                        name="ios-book-outline"/>;

        } else if (this.props.type == "3") {
            image = (this.state.pressed) ?
                <Icon size={23} style={{flex:0.3,marginRight:10,marginTop:0}} name="ios-person-outline"
                      color={"#fdaa69"}/>
                : <Icon size={23} style={{flex:0.3,marginRight:10,marginTop:0,}} color={"#fff"}
                        name="ios-person-outline"/>;
        }
        return (


            <View style={{flex:1, }}>
                <TouchableHighlight underlayColor='transparent' style={styles.btn}
                                    onPress={this.handlePress.bind(this)}>
                    <View style={{ flexDirection:'row',flex:1,  alignItems: "stretch",}}>
                   {image}
                        <Text style={styles.txt_btn}>{this.props.title}</Text></View>
                </TouchableHighlight>


            </View>

        );
    }
}