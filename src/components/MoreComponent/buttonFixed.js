import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ButtonFixed = ({title, action}) => {
    return(
        <View style={styles.containerButtonFixed}>
            <TouchableOpacity style={styles.touchAddPlan} onPress={() => action()}>
                <Text style={styles.textAddPlant1}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonFixed;

const styles = StyleSheet.create({
    containerButtonFixed: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    touchAddPlan: {
        width: 250,
        paddingVertical: 9,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#5AA469'
    },
    textAddPlant1: {
        color: 'white',
        fontFamily: 'Poppins-Light',
        fontSize: 11.3,
        textAlign: 'center'
    }
});