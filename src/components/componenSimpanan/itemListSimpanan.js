import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { IconAdd, IconDelete, ImagePerawatan4, ImageTree5 } from '../../assets/assets.js';

const ItemListSimpanan = ({imageTree, title, type, idMenanam, actionAdd, actionCancel}) => {
    return (
        <View style={styles.containerItem}>
            <Image source={{uri: imageTree}} style={styles.imageItem}/>

            <View style={styles.containerText}>
                <Text style={styles.titleContainer}>{title}</Text>
                <Text style={styles.typeContainer}>{type}</Text>
            </View>

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.containerTouch} onPress={() => actionAdd(idMenanam)}>
                    <IconAdd/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.containerTouch} onPress={() => actionCancel(idMenanam)}>
                    <IconDelete/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemListSimpanan;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerItem: {
        width: '100%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
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
    imageItem: {
        width: windowWidth*0.14,
        height: windowHeight*0.080,
        borderRadius: 50
    },
    containerText: {
        width: '62%',
        justifyContent: 'center',
        marginLeft: 15,
    },
    titleContainer: {
        color: '#2F3542',
        fontSize: 12.5,
        fontFamily: 'Poppins-Medium',
    },
    typeContainer: {
        color: '#2F3542',
        fontSize: 10.5,
        fontFamily: 'Poppins-Regular',
        opacity: 0.5,
        marginTop: -windowHeight*0.005
    },
    containerButton: {
        width: '13%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerTouch: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginRight: 8,
    }
})
