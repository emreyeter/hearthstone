import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'


const RIGHT_ARROW_URL = 'https://icons-for-free.com/iconfiles/png/512/arrow+right+chevron+chevronright+right+right+icon+icon-1320185732203239715.png'


export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { title, navigation } = this.props;
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}> {title} </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Image style={styles.arrowLeft} source={{ uri: RIGHT_ARROW_URL }} />
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign : 'center'
    },
    arrowLeft: {
        height: 32,
        width: 32,
        transform: [{ rotateZ: '180deg' }]
    },
    button: {
        position: 'absolute',
        left: 10
    }
})