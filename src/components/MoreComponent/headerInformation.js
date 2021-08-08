import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Line } from '../../assets/assets.js';

const HeaderInformation = ({title}) => {
    return(
        <View>
            <Text style={styles.titleInformation}>{title}</Text>
            <Image source={Line} style={styles.line}/>
        </View>
    );
};

export default HeaderInformation;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    titleInformation: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16
    },
    line: {
        width: windowWidth*0.09,
        height: windowHeight*0.005,
        marginTop: 4,
        marginBottom: 15
    },
});