import React from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import Login from './../components/Login';
import {View,TabBarIOS,StatusBarIOS} from 'react-native';
import NavigationBar from 'react-native-navbar';
export function requireAuthentification(Component) {

    class AuthentificatedComponent extends React.Component {

        constructor(props) {
            super(props);

        }

        componentWillMount() {

            this.checkAuth();

        }

        componentWillReceiveProps(nextProps) {
          //  this.checkAuth();
        }

        checkAuth() {
            if (!this.props.isAuthenticated) {
                Actions.login();
/*
                this.props.navigator.replace({
                    component: Login,

                });
  */          }
        }


        componentWillUpdate(nextProps) {


            if (!this.props.isAuthenticated) {

                Actions.login();
            }
        }


        shouldComponentUpdate(nextProps, nextState) {
            return (nextProps.token === null  )
        }

        render() {


            return (

                <View style={{flex:1}}>

                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>

                        : null
                    }

                </View>

            )
        }
    }

    const mapStateToProps = (state) => ({
        token: state.session.token,
        isAuthenticated: state.session.isAuthenticated
    });

    return connect(mapStateToProps)(AuthentificatedComponent);

}
