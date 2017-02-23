import React, { Component } from 'react';
import {Text,View,StyleSheet,Switch} from 'react-native';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../../actions/SessionActions';
import { connect }            from 'react-redux';
 class NotificationsNewFollow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: false,
        };
        this.updateValue = this.updateValue.bind(this);
    }

     shouldComponentUpdate(nextProps, nextState) {
         return (  nextProps.user !== this.props.user  || this.state.notification !== nextState.notification)
     }
     componentWillMount(){
         this.setState({
             notification: (this.props.user.notification.follow==1)
         });
     }

     updateValue(event) {
         var notification = event ? 1 : 0;
         if (this.props.token != null){
             this.setState({
                 notification:event
             })
             this.props.actions.saveUserNotificationFollow(this.props.token, notification);
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
                borderColor: '#c7c7c7',
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
                fontFamily: 'Guardi-Roman',
                fontSize: 12,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#fff",
                width:220


            }});


        var next =
            <Switch style={{marginTop: 5}} size={20} onValueChange={this.updateValue.bind(this)}
                    value={(this.state.notification)}/>


        return (


            <View style={{flex:1}}>
                <View key={1} style={styles.link} >
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>être notifié de chaque nouvelle {"\n"} personne qui me suit</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsNewFollow);
