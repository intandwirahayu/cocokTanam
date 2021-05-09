import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconBasket } from '../../assets/assets.js';

const NoDataRencana = ({titlePage}) => {
    return (
        <View style={styles.containerContent}>
            <IconBasket/>
            <Text style={styles.titleContainer}>Tidak Ada Data</Text>
            <Text style={styles.descTitle}>kamu belum memiliki {titlePage}</Text>
        </View>
    )
}

export default NoDataRencana;

const styles = StyleSheet.create({
    containerContent: {
        alignItems: 'center', 
        marginTop: 130
    },
    titleContainer: {
        color: '#2F3542',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        marginTop: 15,
        marginBottom: 3
    },
    descTitle: {
        color: '#2F3542',
        fontSize: 13,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        paddingHorizontal: 20
    }
})
