
import React, { Component } from 'react'
import { Text, View, Animated, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'

import PropTypes from 'prop-types';



const CARD_BACK_IMG = 'https://wow.zamimg.com/images/hearthstone/backs/original/Card_Back_Default.png'

export default class Card extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }



        this.visibility = false;
        this.flipAnimation = new Animated.Value(0)
    }



    doFlipAnimation = () => {
        Animated.timing(this.flipAnimation, {
            toValue: this.visibility ? 0 : 180,
            duration: this.props.animationTime,
            useNativeDriver: true
        }).start(() => this.visibility = !this.visibility);
    }

    render() {

        const frontInterpolate = this.flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        const backInterpolate = this.flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        const frontStyle = {
            transform: [
                { rotateY: frontInterpolate }
            ]
        }
        const backStyle = {
            transform: [
                { rotateY: backInterpolate }
            ]
        }





        const { cardId,
            dbfId,
            name,
            cardSet,
            type,
            faction,
            rarity,
            cost,
            attack,
            health,
            text,
            flavor,
            artist,
            collectible,
            playerClass,
            img,
            imgGold,
            locale, } = this.props.item

        return (
            <TouchableWithoutFeedback
                onPress={() => this.doFlipAnimation()}>
                <View style={this.props.containerStyle}>
                    <Animated.View style={[styles.frontCardStyle, frontStyle, this.props.containerStyle]}>
                        <Image
                            style={[{ ...StyleSheet.absoluteFillObject }]}
                            resizeMode="stretch"
                            source={{ uri: CARD_BACK_IMG }} />
                    </Animated.View>
                    <Animated.View style={[styles.backCardStyle, backStyle]}>
                        <Image
                            style={[{ ...StyleSheet.absoluteFillObject }]}
                            resizeMode="stretch"
                            source={{ uri: img }} />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>

        )
    }




}

const styles = StyleSheet.create({
    frontCardStyle: {
        backfaceVisibility: 'hidden',
    },
    backCardStyle: {
        backfaceVisibility: 'hidden',
        ...StyleSheet.absoluteFill
    }
})




Card.propTypes = {
    containerStyle: PropTypes.object,
    animationTime: PropTypes.number
}

Card.defaultProps = {
    containerStyle: { height: 306, width: 202 },
    animationTime: 1000
}