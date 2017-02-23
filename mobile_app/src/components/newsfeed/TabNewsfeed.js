import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabNewsfeed = React.createClass({
    tabIcons: ["ios-person", "ios-bookmark"],

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    },

    componentDidMount() {
        //  this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    },

    setAnimationValue({value,}) {
        this.tabIcons.forEach((icon, i) => {
            const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                },
            });
        });
    },

    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
        const red = 59 + (204 - 59) * progress;
        const green = 89 + (204 - 89) * progress;
        const blue = 152 + (204 - 152) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    },

    render() {
        var styles = StyleSheet.create({
            tab: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 7,
                paddingTop: 10,
            },
            tabs: {
                height: 40,
                flexDirection: 'row',
                borderWidth: 0,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomColor: '#c7c7c7',
                backgroundColor: '#fff',
            },
            card: {
                borderWidth: 1,
                backgroundColor: '#fff',
                borderColor: 'rgba(0,0,0,0.1)',
                margin: 5,
                height: 150,
                padding: 15,
                shadowColor: '#ccc',
                shadowOffset: {width: 2, height: 2,},
                shadowOpacity: 0.5,
                shadowRadius: 3,
            },
            text: {
                color: "#1d1D1D",
                fontFamily: 'OratorStd',

            }
        });
        return <View style={[styles.tabs, this.props.style,]}>
            <TouchableOpacity onPress={() => this.props.goToPage(0)} key={0}
                              style={[styles.tab, {
                                  borderBottomWidth: this.props.activeTab === 0 ? 2 : 1,
                                  borderBottomColor: this.props.activeTab === 0 ? '#e67e22' : '#c7c7c7'
                              }]}>

                <Text style={[styles.text, {
                    fontWeight: this.props.activeTab === 0 ? 'bold' : 'normal',
                    color: this.props.activeTab === 0 ? '#e67e22' : '#1d1D1D'
                }]}>Mes actualités</Text>

            </TouchableOpacity>
            <TouchableOpacity key={1} onPress={() => this.props.goToPage(1)} style={[styles.tab, {
                borderBottomWidth: this.props.activeTab === 1 ? 2 : 1,
                borderBottomColor: this.props.activeTab === 1 ? '#e67e22' : '#c7c7c7'
            }]}>
                <Text style={[styles.text, {  fontWeight: this.props.activeTab === 1 ? 'bold' : 'normal',color: this.props.activeTab === 1 ? '#e67e22' : '#1d1D1D'}]}>Explorer</Text>
            </TouchableOpacity>

        </View>;
    },
});


export default TabNewsfeed;