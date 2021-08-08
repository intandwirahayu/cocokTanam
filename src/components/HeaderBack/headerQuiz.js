import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconClose } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

const HeaderQuiz = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.touchClose} onPress={() => navigation.goBack()}>
                <IconClose/>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderQuiz;

const styles = StyleSheet.create({
    containerHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 15.8
    },
    touchClose: {
        paddingVertical: 6,
        paddingLeft: 10
    }
});
