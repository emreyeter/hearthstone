import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import Header from '../components/Header'
import Card from '../components/Card'

export default class CardList extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const cards = navigation.getParam('cards');
        return (
            <View style={{ flex: 1 }}>
                <Header title={title} navigation={navigation} />


                <FlatList
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={cards}
                    renderItem={({ item, index }) =>
                        <View style={{ alignItems: 'center' }} >
                            <Card key={index.toString()} item={item} />
                        </View>
                    }
                />


            </View>
        )
    }
}
