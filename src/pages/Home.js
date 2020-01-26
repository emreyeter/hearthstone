import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, Animated } from 'react-native'

import Api from '../api'

const RIGHT_ARROW_URL = 'https://icons-for-free.com/iconfiles/png/512/arrow+right+chevron+chevronright+right+right+icon+icon-1320185732203239715.png'
const SEARCH_ICON_URL = 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png'
const SPINNER_URL = 'https://i.ya-webdesign.com/images/loading-icon-png-transparent-1.png'


import { connect } from 'react-redux';
import { setCards, setMechanics } from '../redux/actions/actions';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            spinValue: new Animated.Value(0)
        }

    }

    componentWillMount() {

        this.doSpinnerAnim();

        Api.requestGet([]).then(_result => {
            this.getMechanics(_result);
        })
    }

    doSpinnerAnim = () => {
        Animated.loop(
            Animated.timing(this.state.spinValue,
                {
                    toValue: 1,
                    duration: 750,
                    useNativeDriver: true
                })
        ).start();
    }

    getMechanics = (_result) => {
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

        this.props.setMechanics(mechanics);
        this.props.setCards(cards)

        this.setState({ isLoading: false });

    }


    listItems = (item, index) => {
        const { name } = item;
        return (
            <View key={index.toString()}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('CardList', { title: name, mech_name: name })}
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


        const rotate_interpolate = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        const image_transform = { transform: [{ rotateZ: rotate_interpolate }] }

        return (

            this.state.isLoading ?

                <View style={[styles.container, styles.center_position]}>
                    <Animated.Image source={{ uri: SPINNER_URL }} style={{ height: 64, width: 64, ...image_transform }} />
                </View>
                :
                <View style={styles.container}>

                    <View style={styles.header} >
                        <Text style={styles.headerText}>
                            MECHANIC LIST
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CardList', { title: 'Search' })}
                        >
                            <Image source={{ uri: SEARCH_ICON_URL }} style={styles.search_icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                    <ScrollView>
                        {
                            this.props.hearthstone.mechanics.map((item, index) => { return (this.listItems(item, index)) })
                        }
                    </ScrollView>

                </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        hearthstone: state
    }
}

export default connect(mapStateToProps,
    {
        setCards,
        setMechanics

    })(Home);

const styles = StyleSheet.create({
    header: {
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        color: 'darkred'
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
    },
    search_icon: {
        height: 24,
        width: 24
    },
    container: {
        flex: 1
    },
    center_position: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})


