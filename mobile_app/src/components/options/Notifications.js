import React, { Component } from 'react';
import {View} from 'react-native';
import NotificationsNewRecipe from './notifications/NotificationsNewRecipe';
import NotificationsNewFollow from './notifications/NotificationsNewFollow';
import NotificationsNewsApp from './notifications/NotificationsNewsApp';
export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: true
        }




    }

    shouldComponentUpdate(nextProps, nextState) {
        return (false)
//        nextState.close !== this.state.close)
    }



    render() {




        return (


            <View style={{flex:1}}>
               <NotificationsNewRecipe />
               <NotificationsNewFollow  />
               <NotificationsNewsApp  />

            </View>

        );
    }
}