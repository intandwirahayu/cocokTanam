import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {IconBeranda, IconBerandaActive, 
        IconMenanam, IconMenanamActive,
        IconPerawatan, IconPerawatanActive,
        IconProfil, IconProfilActive} from "../../assets/assets.js";

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
    const Icon = () => {
        if(label === 'Beranda') return isFocused ? <IconBerandaActive/> : <IconBeranda/>;
        if(label === 'Menanam') return isFocused ? <IconMenanamActive/> : <IconMenanam/>;
        if(label === 'Merawat') return isFocused ? <IconPerawatanActive/> : <IconPerawatan/>;
        if(label === 'Profil') return isFocused ? <IconProfilActive/>: <IconProfil/>;

        return <IconBeranda/>
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon/>
            <Text style={styles.title(isFocused)}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
     container: { 
        flex: 1,
        alignItems: 'center',
        paddingTop: 11,
        paddingBottom: 2
    },
    title: (isFocused) => ({
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        color: isFocused ? 'white' : '#ADD1B4',
        paddingTop: 3
    })
})
