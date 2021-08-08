import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ItemSpecification = ({title, value}) => {
    return(
        <View>
            <Text style={styles.titleSpecification}>{title}</Text>
            <Text style={styles.valueSpecification}>{value}</Text>
        </View>
    );
}

export default ItemSpecification;

const styles = StyleSheet.create({
    titleSpecification: {
        fontFamily: 'Poppins-Light',
        fontSize: 11,
        color: '#2F3542',
        marginTop: 4
    },
    valueSpecification: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        color: '#2F3542'
    },
});