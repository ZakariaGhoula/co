import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native';
import {DEFAULT_LNG,OPTIONS_LANGUE} from './../../constants/config';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import GiftedSpinner from 'react-native-gifted-spinner';
import ModalPicker from 'react-native-modal-picker';
import _ from 'underscore';

import LoadingOverlay from 'react-native-loading-overlay';
class UpdateLocale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_langue: DEFAULT_LNG
        }

        this.updateLocale = this.updateLocale.bind(this);
    }

    componentWillMount() {
        this.setState({
            selected_langue: (this.props.user != null) ? this.props.user.locale : DEFAULT_LNG
        });
    }


    updateLocale() {
        this.props.actions.updateLocale(this.props.token, this.state.selected_langue)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ( nextProps.user !== this.props.user || this.state.selected_langue !== nextState.selected_langue )
    }

    render() {

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: "transparent",
                paddingLeft: 30,
                paddingRight: 30,
            },

            link: {
                height: 60,
                paddingLeft: 23,
                paddingRight: 15,
                marginBottom: (this.props.last) ? 15 : 0,
                backgroundColor: 'transparent',
                borderColor: '#474849',
                borderTopWidth: (this.props.alone) ? 1 : 0,
                borderBottomWidth: (this.props.last) ? 1 : 0
            },
            linkView: {
                flexDirection: 'row',
                flex: 1,
                height: 60,
                alignItems: 'center',
            },
            TextView: {
                flexDirection: 'row',
                flex: 1,
                marginLeft: 0,
                height: 45,
                alignItems: 'center',
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
            },
            select: {

                backgroundColor: "transparent",

                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
            }, selectStyle: {

                backgroundColor: "transparent",

                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
            }, textSelected: {
                fontFamily: 'Guardi-Roman',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#fff",
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
            }, selectTextStyle: {
                fontFamily: 'Guardi-Roman',
                fontSize: 14,
                lineHeight: 15, paddingLeft: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#fff",
            }, optionTextStyle: {
                fontFamily: 'Guardi-Roman',
                fontSize: 15,
                lineHeight: 15,
                marginBottom: 10,
                textAlign: "center",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
                backgroundColor: "transparent",
                color: "#000",
            }, cancelTextStyle: {
                fontFamily: 'OratorStd'
            }, text: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#808183",
                width: 210,
                textDecorationLine: "underline"
            }, textSave: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "center",
                backgroundColor: "transparent",
                color: "#eee",
                width: 210,
                textDecorationLine: "underline"
            }
        });

        if (this.props.isRequesting) {
            return ( <View> <LoadingOverlay visible={true} text=""/></View>);
        }
        let index = 0;
        var data = [];
        OPTIONS_LANGUE.map(function (langue, i) {
            var value = {key: langue.value, label: langue.label}
            data.push(value);
        });


        //--langue
        var lng = (this.props.user !== null) ? this.props.user.locale : DEFAULT_LNG;
        var lng_final = null;
        lng_final = _.filter(OPTIONS_LANGUE, function (el) {
            return (el["value"] == lng);
        })

        lng_final = typeof lng_final[0] !== "undefined" ? lng_final[0].label : "français";


        return (


            <View style={styles.bg}>



                <ModalPicker
                    data={data}
                    style={{marginBottom:10,marginTop:3}}
                    selectStyle={styles.selectStyle}

                    selectTextStyle={styles.selectTextStyle}
                    cancelTextStyle={styles.cancelTextStyle}
                    optionTextStyle={styles.optionTextStyle}
                    initValue={lng_final}
                    cancelText="Annuler"
                    onChange={(option)=>{ this.setState({selected_langue: option.key}) }}/>

                <View style={[styles.link,{borderBottomWidth:0}]}>
                    <TouchableHighlight
                        underlayColor='transparent'
                        style={{flex:1,height:40,backgroundColor:'transparent',justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center'}}
                        onPress={this.updateLocale.bind(this)}>
                        <Text style={styles.textSave}>
                            Entregister
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    isRequesting: state.loading.shown,
    token: state.session.token,
    user: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLocale);
