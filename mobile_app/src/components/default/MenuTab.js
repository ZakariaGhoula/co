import React, { Component } from 'react';
import {Text,View,Image,StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {Actions} from 'react-native-redux-router';


export default class MenuTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}


    }




    render() {

        var Dimensions = require('Dimensions');
        var w = Dimensions.get('window');
        var tab_W = w.width / 5;
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#f3f3f3'
            },
            tabBar: {
                height: 55,
                borderTopColor: "#fff",
                borderTopWidth: 0,
                backgroundColor: "#fff",
                position:"absolute"
            }, tabBarDefault: {
                height: 55,
                borderTopColor: "#aaaaaa",
                borderTopWidth: 1,

                backgroundColor: "#fff"
            }, tabBarDefaultText: {
                color: "#2b301c", fontSize: 8.5, textAlign: "center",fontFamily:"OratorStd",marginTop:7,marginBottom:5
            }
        });

        var selected  = this.props.page;
        var path_moncookout= (selected=="moncookout")?<Image source={require('image!./../../img/tab/selected/moncookout.png')} />:<Image source={require('image!./../../img/tab/moncookout.png')} />;
        var path_actu = (selected=="newsfeed")?<Image source={require('image!./../../img/tab/selected/actu.png')} />:<Image source={require('image!./../../img/tab/actu.png')} />;
        var path_season = (selected=="seasonproducts")?<Image source={require('image!./../../img/tab/selected/saisons.png')} />:<Image source={require('image!./../../img/tab/saisons.png')} />;
        var path_options = (selected=="options")?<Image source={require('image!./../../img/tab/selected/options.png')} />:<Image source={require('image!./../../img/tab/options.png')} />;

        var img_add =null;
      if(selected=="addnewrecipe"){
          img_add=<Image  source={require('image!./../../img/tab/selected/add.png')} />;
      }
      else{
          img_add=<Image  source={require('image!./../../img/tab/add.png')} />;
      }
        return (



            <TabNavigator tabBarStyle={styles.tabBar}>
                <TabNavigator.Item
                    titleStyle={[styles.tabBarDefaultText,{color:(selected=="moncookout")?"#fdaa69":"#2b301c"}]}
                    title="Mon CookOut"
                    tabStyle={styles.tabBarDefault}
                    renderIcon={() => path_moncookout}
                    onPress={()=>Actions.moncookout()}
                > </TabNavigator.Item>
                <TabNavigator.Item
                    titleStyle={[styles.tabBarDefaultText,{color:(selected=="newsfeed")?"#fdaa69":"#2b301c"}]}
                    title="Actualités"
                    onPress={() => Actions.newsfeed()}
                    tabStyle={styles.tabBarDefault}
                    renderIcon={() => path_actu}
                > </TabNavigator.Item>
                <TabNavigator.Item
                    titleStyle={{color:"#2b301c"}}
                    tabStyle={styles.tabBarDefault}

                    onPress={() => Actions.addnewrecipe()}
                    renderIcon={() => <View style={{height:70,justifyContent:'center',alignItems:'center',position:"relative",backgroundColor:"#fff",flex:1,top:-21,paddingTop:0,width:tab_W,  borderLeftWidth:1, borderRightWidth:1,borderTopWidth:1,borderColor: '#aaaaaa', borderRadius:100,borderTopLeftRadius:100,borderTopRightRadius:100}}>

                                          <View style={{position:"absolute",left:-2,right:0,bottom:0,height:49,paddingTop:19,width:69*(w.width/320),backgroundColor:"#fff",alignItems:"center"}}><View style={{width:60,alignItems:"center"}}><Text style={[styles.tabBarDefaultText,{fontSize:8,marginTop:10,textAlign:"center",color:(selected=="addnewrecipe")?"#fdaa69":"#2b301c"}]}>Ajout Recette</Text></View>
                                            </View>
                                           <View style={{marginTop:20,top:-7,position:"absolute",left:0,right:0,bottom:0,alignItems:"center"}}>{img_add}
                                           </View></View>}
                > </TabNavigator.Item>
                <TabNavigator.Item

                    titleStyle={[styles.tabBarDefaultText,{color:(selected=="seasonproducts")?"#fdaa69":"#2b301c"}]}
                    tabStyle={styles.tabBarDefault}
                    title="Saisons"

                    onPress={() => Actions.seasonproducts()}
                    renderIcon={() => path_season}
                > </TabNavigator.Item>
                <TabNavigator.Item
                    onPress={() => Actions.options({"option_back":this.props.option_back})}

                    titleStyle={[styles.tabBarDefaultText,{color:(selected=="options")?"#fdaa69":"#2b301c"}]}
                    title="Options"
                    tabStyle={styles.tabBarDefault}
                    renderIcon={() => path_options}
                > </TabNavigator.Item>
            </TabNavigator>
        )
    }
}