import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { IconAdd, IconDelete, ImagePerawatan4, ImageTree5 } from '../../assets/assets.js';

const ItemListSimpanan = ({imageTree, title, type, idMenanam, actionAdd, actionCancel}) => {
    return (
        <View style={styles.containerItem}>
            <View style={styles.containerDesc}>
                <Image source={{uri: imageTree}} style={styles.imageItem}/>

                <View style={styles.containerText}>
                    <Text style={styles.titleContainer}>{title}</Text>
                    <Text style={styles.typeContainer}>{type}</Text>
                </View>
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
        justifyContent: 'space-between',
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
    containerDesc: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '78%'
    },
    imageItem: {
        width: windowWidth*0.14,
        height: windowHeight*0.07,
        borderRadius: 50
    },
    containerText: {
        width: '72%',
        justifyContent: 'center',
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
        width: '18%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerTouch: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    }
})
