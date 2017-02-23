import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabResult = React.createClass({
    tabIcons: ["ios-person", "ios-bookmark"],

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    },

    componentDidMount() {
      //  this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    },

    setAnimationValue({ value, }) {
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
        return <View style={[styles.tabs, this.props.style, ]}>
            <TouchableOpacity onPress={() => this.props.goToPage(0)} key={0} style={styles.tab} >
                <Icon
                    name={"list"}
                    size={17}
                    color={this.props.activeTab === 0 ? '#e67e22' : '#1d1D1D'}

                />
            </TouchableOpacity>
            <TouchableOpacity key={1} onPress={() => this.props.goToPage(1)}  style={styles.tab}>
                <Icon
                    name={"user"}
                    size={17}
                    color={this.props.activeTab === 1 ? '#e67e22' : '#1d1D1D'}

                />
            </TouchableOpacity>
            <TouchableOpacity key={2} onPress={() => this.props.goToPage(2)}  style={styles.tab}>
                <Icon
                    name={"hashtag"}
                    size={17}
                    color={this.props.activeTab === 2 ? '#e67e22' : '#1d1D1D'}

                />
            </TouchableOpacity>
        </View>;
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 30,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});

export default TabResult;