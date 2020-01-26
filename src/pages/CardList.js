import React, { Component } from 'react'
import { FlatList, View, TextInput } from 'react-native'
import Header from '../components/Header'
import Card from '../components/Card'
import { connect } from 'react-redux';


class CardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
    }
    render() {


        const { cards, mechanics } = this.props.hearthstone;

        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const mech_name = navigation.getParam('mech_name');
        const filtered_cards = cards.filter(x => (mech_name ? x.mechanics.findIndex(m => m.name == mech_name) : x.name.indexOf(this.state.searchText)) > -1)

        return (
            <View style={{ flex: 1 }}>
                <Header title={title} navigation={navigation} />
                {
                    !mech_name &&
                    <View style={{ padding: 16,  borderBottomWidth : 0.6, borderColor : '#afafaf' }}>
                        <TextInput value={this.state.searchText} onChangeText={(searchText) => this.setState({ searchText })} placeholder='Type to search card...' style={{ borderWidth: 0.5, padding: 0, paddingHorizontal: 5, borderColor: '#afafaf' }} />
                    </View>
                }

                <FlatList
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={filtered_cards}
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


function mapStateToProps(state) {
    return {
        hearthstone: state
    }
}
export default connect(mapStateToProps, null)(CardList);