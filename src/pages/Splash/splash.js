import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { Logo } from "../../assets/assets.js";
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
            <Image source={Logo} style={styles.logo}/>
        </View>
    )
}

export default Splash;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5aa469'
    },
    logo: {
        width: windowWidth*0.60,
        height: windowHeight*0.086
    }
})
