import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { IconBasket } from '../../assets/assets';

const NoDataSimpanan = ({titleContent}) => {
    return (
        <View style={{alignItems: 'center'}}>
            <IconBasket/>
            <Text style={styles.titleContent}>Tidak Ada Data</Text>
            <Text style={styles.descTitle}>kamu belum memiliki simpanan data</Text>
            <Text style={styles.descTitle}>{titleContent} tanaman</Text>
        </View>
    )
}

export default NoDataSimpanan;

const styles = StyleSheet.create({
    titleContent: {
        color: '#2F3542',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        marginTop: 15,
        marginBottom: 3
    },
    descTitle: {
        color: '#2F3542',
        fontSize: 12.5,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        paddingHorizontal: 20
    }
})
