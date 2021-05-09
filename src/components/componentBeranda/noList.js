import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NoList = ({nameList}) => {
    return (
        <View style={styles.containerNoList}>
            <Text style={styles.headerNoList}>Ups!</Text>
            <Text style={styles.infoNoList}>kamu belum memiliki rencana {nameList}. yuk pilih</Text>
            <Text style={styles.infoNoList}>sekarang di menu {nameList}</Text>
        </View>
    )
}

export default NoList;

const styles = StyleSheet.create({
    containerNoList: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    headerNoList: {
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 15.5,
        paddingBottom: 5
    },
    infoNoList: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 11,
        opacity: 0.5
    }
});
