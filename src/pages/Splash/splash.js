import React, {useEffect} from 'react';
import { StyleSheet, View} from 'react-native';
import { IconLogo } from "../../assets/assets.js";
import SoundPlayer from 'react-native-sound-player';

const Splash = ({navigation}) => {
    useEffect(() => {
        playMusic();
        setTimeout(() => navigation.replace('MasukAkun'), 3000)
    }, [navigation]);

    const playMusic = () => {
        try{
            SoundPlayer.playSoundFile('soundopening','mp3')
        }catch(e){
            console.log(`cannot play the sound file`, e)
        }
    }

    return (
        <View style={styles.background}>
            <IconLogo/>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5aa469'
    }
})
