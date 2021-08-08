import React, { useState } from 'react';
import { StyleSheet, Text, View , ScrollView, Dimensions, Image, TouchableOpacity} from 'react-native';
import { SubtractionLeft, SubtractionRight, IconProfileUser, IconAkun, IconBantuan, IconKeluarAkun} from '../../assets/assets';
import { TouchHistory } from '../../components/components';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const Profil = (props) => {
    const navigation = useNavigation();

    const [idUser, setIdUser] = useState(props.route.params.keyUserLogin);
    const [namaLengkap, setNamaLengkap] = useState('');
    const [namaAkun, setNamaAkun] = useState('');
    const [email, setEmail] = useState('');
    const [keyRiwayatMenanam, setKeyRiwayatMenanam] = useState('');
    const [keyRiwayatPerawatan, setKeyRiwayatPerawatan] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            let isMounted = true;  
            // Do something when the screen is focused
            const unsubscribe = setInterval(() => {
                showData();
                countRiwayatMenanam();
                countRiwayatPerawatan();
            }, 1000);
        return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            clearInterval(unsubscribe);
            isMounted = false;
        };
        }, [idUser, namaLengkap, namaAkun, email, keyRiwayatMenanam, keyRiwayatPerawatan])
    );

    const showData = async () => {
        try{
            await firestore()
            .collection('data_pengguna')
            .doc(idUser)
            .get()
            .then(snapshot => {
                const dataPengguna = snapshot.data();

                setNamaLengkap(dataPengguna.nama_lengkap);
                setNamaAkun(dataPengguna.nama_akun);
                setEmail(dataPengguna.email);
            })
        }catch(e){
            console.log(e);
        }
    }

    const countRiwayatMenanam = async () => {
        try{
            await firestore()
            .collection('data_riwayat_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKey = Object.keys(snapshot.data());
                setKeyRiwayatMenanam(dataKey.length);
            })
        }catch(e){
            setKeyRiwayatMenanam(0);
        }
    }

    const countRiwayatPerawatan = async () => {
        try{
            await firestore()
            .collection('data_riwayat_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKey = Object.keys(snapshot.data());
                setKeyRiwayatPerawatan(dataKey.length);
            })
        }catch(e){
            setKeyRiwayatPerawatan(0);
        }
    }

    return (
        <View style={{backgroundColor: '#5AA469'}}>
            <ScrollView style={styles.containerScroll}>
                <View style={{backgroundColor: 'white'}}>
                    <View style={styles.backgroundHeader}>
                        <View style={styles.containerIconUser}>
                            <IconProfileUser/>
                        </View>

                        <Text style={styles.nameAccountUser}>{namaLengkap}</Text>
                        <Text style={styles.emailUser}>{email}</Text>
                        
                    </View>
                </View>

                <View style={{backgroundColor: '#5AA469'}}>
                    <View style={styles.bottomBgHeader}/>
                </View>

                <View style={styles.containerContent}>
                    <Text style={styles.fullNameUser}>Hai {namaAkun}!</Text>
                    <Text style={styles.contentText2}>berikut kegiatan menanam dan merawat</Text>
                    <Text style={styles.contentText2}>tanaman yang sudah dilakukan</Text>

                    <View style={styles.containerCount}>
                        <Image source={SubtractionLeft} style={styles.subtraction}/>

                        <TouchHistory namePage="RiwayatMenanam" title="Menanam" countHistory={keyRiwayatMenanam} idUser={idUser}/>

                        <TouchHistory namePage="RiwayatPerawatan" title="Merawat" countHistory={keyRiwayatPerawatan} idUser={idUser}/>

                        <Image source={SubtractionRight} style={styles.subtraction}/>
                    </View>

                    <Text style={styles.headingSetting}>Pengaturan</Text>

                    <View style={styles.containerSettings}>
                        <TouchableOpacity style={styles.itemSettings} onPress={()=> navigation.navigate('MenuAkun', {keyUserEdit: props.route.params.keyUserLogin})}>
                            <IconAkun style={{marginRight: 20}}/>

                            <View>
                                <Text style={styles.titleSettings}>Akun</Text>
                                <Text style={styles.descTitleSettings}>edit data akun, hapus akun</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemSettings} onPress={() => navigation.navigate('BantuanAkun')}>
                            <IconBantuan style={{marginRight: 20}}/>

                            <View>
                                <Text style={styles.titleSettings}>Bantuan</Text>
                                <Text style={styles.descTitleSettings}>hubungi kami, kebijakan aplikasi</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemSettings} onPress={() => navigation.navigate('MasukAkun')}>
                            <IconKeluarAkun style={{marginRight: 20}}/>

                            <View>
                                <Text style={styles.titleSettings}>Keluar Akun</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profil;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerScroll: {
        height: '100%',
        backgroundColor: 'white', 
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25
    },
    backgroundHeader: {
        backgroundColor: '#5AA469',
        borderBottomLeftRadius: 25,
        paddingBottom: 15,
        flexDirection: 'column'
    },
    containerIconUser: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 23,
        marginBottom: 13
    },
    roundedYellow: {
        width: windowWidth*0.0298,
        height: windowHeight*0.0173
    },
    nameAccountUser: {
        color: 'white',
        fontSize: 17.5,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center'
    },
    emailUser: {
        color: 'white',
        fontSize: 11,
        fontFamily: 'Poppins-Light',
        textAlign: 'center'
    },
    containerContent: {
        paddingHorizontal: 23
    },
    fullNameUser: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17.5,
        marginBottom: 5
    },
    contentText2: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 11.1
    },
    bottomBgHeader: {
        width: '100%',
        height: 23,
        backgroundColor: 'white',
        borderTopRightRadius: 25
    },
    containerCount: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5AA469',
        borderRadius: 10,
        marginVertical: 11
    },
    subtraction: {
        width: windowWidth*0.018,
        height: windowHeight*0.0201
    },
    headingSetting: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        marginTop: 6
    },
    containerSettings: {
        paddingBottom: 10
    },
    itemSettings: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 7
    },
    titleSettings: {
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 12.1,
    },
    descTitleSettings: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 11,
        opacity: 0.5
    }
});
