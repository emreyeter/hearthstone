import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'

import Api from '../api'

const RIGHT_ARROW_URL = 'https://icons-for-free.com/iconfiles/png/512/arrow+right+chevron+chevronright+right+right+icon+icon-1320185732203239715.png'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mechanics: []
        }
    }


    componentWillMount() {
        Api.requestGet([]).then(_result => {

            this.setMechanics(_result);

        })
    }

    setMechanics = (_result) => {
        let cardPacks = Object.keys(_result);
        let mechanics = [];
        let cards = [];

        cardPacks.forEach(element => {
            _result[element].forEach(item => {
                if ('mechanics' in item) {

                    if ('img' in item) //limit
                        cards.push(item)


                    item['mechanics'].forEach(mechanics_item => {
                        let isAdded = mechanics.findIndex(x => x.name == mechanics_item.name)
                        if (isAdded == -1) { //mechanic is not added
                            mechanics.push(mechanics_item)
                        }
                    });
                }
            });
        });

        this.cards = cards;

        this.setState({ mechanics });

    }





    listItems = (item, index) => {

        const { name } = item;

        return (
            <View key={index.toString()}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('CardList', { title: name, cards: this.cards.filter(x => x.mechanics.findIndex(m => m.name == name) > -1) })}
                    style={styles.button}>
                    <Text style={{ paddingVertical: 10 }}>
                        {name}
                    </Text>
                    <Image
                        style={styles.arrow}
                        source={{ uri: RIGHT_ARROW_URL }} />
                </TouchableOpacity>
                <View style={styles.line} />
            </View >
        )
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.headerText}>
                    MECHANIC LIST
                </Text>

                <View style={styles.line} />

                <ScrollView>
                    {
                        this.state.mechanics.map((item, index) => { return (this.listItems(item, index)) })
                    }
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        paddingVertical: 16,
        alignSelf: 'center'
    },
    line: {
        borderBottomWidth: 0.5,
        opacity: 0.5,
        marginHorizontal: 16
    },
    arrow: {
        height: 24,
        width: 24
    },
    button: {
        flexDirection: 'row',
        marginHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})