import React, { Component } from 'react';
import {Text,View,StyleSheet,Switch,Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';

  class OptionItemOnOff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offline: false,
        };
        this.updateValue = this.updateValue.bind(this);
    }
      componentWillMount(){
          this.setState({
              offline: (this.props.user.recipe_offline==1)
          });
      }

    shouldComponentUpdate(nextProps, nextState) {
        return ( nextProps.user !== this.props.user ||
        nextState.offline !== this.state.offline)
    }


      updateValue(event) {
          var recipe_off = event ? 1 : 0;
          if (this.props.token != null){
              this.setState({
                  offline: event
              })
              this.props.actions.updateRecipeOffline(this.props.token, recipe_off);
          }
      }
    render() {

        var styles = StyleSheet.create({
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

            NextView: {
                height: 60,
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: 10,
            },
            text: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#fff",
                width:210


        }});

        var icon_menu = (this.props.icon && this.props.icon != null && this.props.icon != "") ? (
            <View style={{marginRight:15}}><Icon name={this.props.icon} size={26} marginLeft={10} marginLeft={30}
                                                 color="#000"/></View>) : null;
        var next =
            <Switch style={{marginTop: 5}} size={20} onValueChange={this.updateValue.bind(this)}
                    value={this.state.offline}/>


        return (


            <View style={{flex:1}}>
                <View  style={styles.link} >
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>{this.props.title}</Text>
                        </View>
                        <View style={styles.NextView}>
                            {next}
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionItemOnOff);
