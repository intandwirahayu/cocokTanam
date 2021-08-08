import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconArrowBack, IconSaveBlack } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

const HeaderDetail = ({action}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.touchBack} onPress={() => navigation.goBack()}>
                <IconArrowBack/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchSave} onPress={() => action()}>
                <IconSaveBlack/>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderDetail;

const styles = StyleSheet.create({
    containerHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15.8,
        backgroundColor: 'white'
    },
    touchBack: {
        paddingVertical: 6,
        paddingRight: 10
    },
    touchSave: {
        paddingVertical: 6,
        paddingLeft: 10
    }
});
