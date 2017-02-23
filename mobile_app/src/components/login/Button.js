import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableHighlight,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FormLogin from './FormLogin';
import {Actions} from 'react-native-redux-router';
export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false
        }

        this.handlePress = this.handlePress.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.pressed !== this.state.pressed)
    }

    handlePress() {
        this.setState({pressed: !this.state.pressed})

        if(this.props.block_to_show==2){
            Actions.subsrcibe();
        }
    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var w_btn = width-(width*0.25);
        var styles = StyleSheet.create({
            btn: {
                paddingTop:10,
                paddingBottom:10,
                flex:1,
                width:w_btn,
                backgroundColor: (this.state.pressed)?"#fdaa69":'#dbd0cd',
                borderColor: '#b8b0aa',
                borderWidth: 1,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius:8,
                opacity:1,
                marginBottom:15

            },
            txt_btn:{
                color:(this.state.pressed)?"#fff":'#000',
                fontSize: 15,
            }

        });

        var bloc_to_show = null;
        if(this.props.block_to_show==1 && this.state.pressed){
            bloc_to_show = <FormLogin/>
        }


        return (


            <View style={{flex:1, }}>
                <TouchableHighlight underlayColor='transparent' style={styles.btn}
                                    onPress={this.handlePress.bind(this)}>
                   <Text style={styles.txt_btn}>{this.props.title}</Text>
                </TouchableHighlight>

                {bloc_to_show}
            </View>

        );
    }
}