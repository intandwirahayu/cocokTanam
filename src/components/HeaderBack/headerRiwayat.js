import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { IconArrowBackWhite } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

const HeaderRiwayat = ({namePage}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.touchBack} onPress={()=>navigation.goBack()}>
                <IconArrowBackWhite/>
            </TouchableOpacity>

            <View style={styles.containerTitle}>
                <Text style={styles.titleHeader}>{namePage}</Text>
            </View>
        </View>
    )
}

export default HeaderRiwayat;

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        backgroundColor: '#5AA469',
        paddingHorizontal: 20,
        paddingVertical: 14
    },
    touchBack: {
        paddingVertical: 10,
        paddingRight: 10
    },
    containerTitle: {
        width: '82%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleHeader: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 15.5
    }
});
