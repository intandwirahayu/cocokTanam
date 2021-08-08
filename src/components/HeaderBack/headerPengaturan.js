import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconArrowBack } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

const HeaderPengaturan = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.touchBack} onPress={()=>navigation.goBack()}>
                <IconArrowBack/>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderPengaturan

const styles = StyleSheet.create({
    containerHeader: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    touchBack: {
        width: '10%',
        paddingVertical: 10,
        paddingRight: 10
    }
})
