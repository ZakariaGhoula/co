import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,TextInput,TouchableHighlight} from 'react-native';
import {APIRoot} from './src/constants/config_path';
import {Actions} from 'react-native-redux-router';
import NavigationBar from 'react-native-navbar';
import * as ConfigActions    from './src/actions/ConfigActions';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import Picker from 'react-native-picker'


class FormSubscribe extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeLangue = this.handleChangeLangue.bind(this);
        this.handleChangeCivilite = this.handleChangeCivilite.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.state = {
            langue: 'fr_FR',
            civilite: 'female',
            age: '-18',
        }
    }


    handleChangeLangue(e) {
        this.setState({
            langue: e
        })
    } handleChangeCivilite(e) {
        this.setState({
            civilite: e
        })
    }handleChangeAge(e) {
        this.setState({
            age: e
        })
    }

    componentDidMount() {
        this.props.actions.retrieveListLangue();
    }

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.list_langue == null && !nextProps.isRequesting && nextProps.statusText == null) {
            this.props.actions.retrieveListLangue();
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.langue !== this.state.langue
            || nextState.civilite !== this.state.civilite
            || nextState.age !== this.state.age
            || nextProps.list_langue !== this.props.list_langue
            || nextProps.isRequesting !== this.props.isRequesting

        )
    }

    render() {


        var styles = StyleSheet.create({
            bg: {
                flex: 1,


                backgroundColor: '#398797',
            },
            view: {
                flex: 1,
                justifyContent: 'center',

                paddingBottom: 20,
                paddingTop: 20,

            },
            beer: {
                flex: 1,
            },
            text: {
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
            },
            textInput: {
                fontSize: 14,
                height: 40,

                color: 'white',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            }, hr: {
                borderColor: '#838182',
                borderWidth: 1,
            },
            viewInput: {
                borderColor: '#ccc',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 10,
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            },
            viewFacebook: {
                height: 40,
                marginBottom: 20,

                flexDirection: 'row',
                position: 'relative',
                /*backgroundColor: '#2d609b',
                 */backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 30,
            }, btnFacebook: {
                height: 40,
                marginBottom: 40,
                flexDirection: 'row',
                position: 'relative',

                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',

            },
            viewOr: {
                height: 16,
                marginBottom: 20,
                marginTop: 20,
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',

            },
            viewLogin: {
                height: 40,
                marginBottom: 40,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: '#398797',
                borderColor: "#fff",
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 30,
                marginTop: 30,

            },
            textLogin: {
                fontSize: 15,
                color: '#fff',
                marginBottom:10,
                paddingLeft: 40, paddingRight: 40
            },

            picker: {
                height:50,marginBottom:15,backgroundColor:"#3a8c9d",
                paddingLeft: 40, paddingRight: 40,

                justifyContent: 'center',
            },
            pickerItem: {
                height:40,paddingTop:10,color:"white",backgroundColor:"#3a8c9d",fontSize:16,textAlign:'left'
            },
            viewSubscribe: {
                height: 40,
                bottom: 0,
                position: 'absolute',
                justifyContent: 'center',
                left: 0, right: 0,
                alignSelf: 'center',
                flexDirection: 'row',
            },
            textbtnSubscribe: {
                fontSize: 17,
                position: 'absolute',
                flex: 1,
                color: "#fff",
            },
            btnSubscribe: {}

        });
        var back = APIRoot + "/image/login3.jpg";
        var Item = Picker.Item;
//  <Image source={require('./../../img/login3.jpg')} style={styles.bg}>
        return (
            <View style={styles.bg}>
                <NavigationBar tintColor={"#398797"}/>
                <View style={styles.view}>

                    <Text
                        style={{textAlign:'center',fontSize:20,color:"#ddd",marginBottom:40}}>
                     Infos complémentaires
                    </Text>

                    <Text style={styles.textLogin}>Langue</Text>

                    {(this.props.list_langue != null) ?
                        <Picker
                            showMask={true}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            selectedValue={this.state.langue}
                            onValueChange={this.handleChangeLangue.bind(this)}>
                            {this.props.list_langue.map(function (langue,key) {
                                return (         <Item key={key} label={langue.label} value={langue.code}/>)
                            })}
                        </Picker>
                        :    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={this.state.langue}
                        onValueChange={this.handleChangeLangue.bind(this)}>
                        <Item key={0} label='Français' value='fr_FR'/>
                    </Picker>
                    }
                    <Text style={styles.textLogin}>Civilité</Text>
                    <Picker
                        selectedValue={this.state.civilite}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        showMask={true}
                        onValueChange={this.handleChangeCivilite.bind(this)} >
                        <Item key={0} label='Femme' value='female'/>
                        <Item key={1} label='Homme' value='male'/>
                    </Picker>
                    <Text style={styles.textLogin}>Tranche Age</Text>
                    <Picker
                        selectedValue={this.state.age}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        onValueChange={this.handleChangeAge.bind(this)} >
                        <Item key={0} label='Inférieur à 18 ans' value='0-18'/>
                        <Item key={1} label='Entre 18 et 25 ans' value='18-25'/>
                        <Item key={2} label='Entre 26 et 35 ans' value='26-35'/>
                        <Item key={3} label='Entre 36 et 55 ans' value='36-55'/>
                        <Item key={4} label='Plus de 56 ans' value='56'/>
                    </Picker>
                </View>

            </View>


        )
    }
}
const mapStateToProps = (state) => ({
    isRequesting: state.config.isRequesting,
    statusText: state.config.statusText,
    list_langue: state.config.list_langue
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ConfigActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSubscribe);



