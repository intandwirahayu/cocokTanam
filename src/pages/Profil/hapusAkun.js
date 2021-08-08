import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions,  TouchableOpacity, Alert } from 'react-native';
import { HeaderPengaturan, ItemFormTextEdit } from '../../components/components.js';
import firestore from '@react-native-firebase/firestore';

export default class EditAkun extends Component {
    constructor(props){
        super(props);

        this.state = {
            keyUser: this.props.route.params.keyUserEdit,
            email: '',
            kataSandi: '',
            noticeEmail: '',
            noticeKataSandi: '',
        }
    }

    onChangeText = (nameState, value) => {
        this.setState({
            [nameState] : value
        });

    }

    checkDataInput = async () => {
        try{
            const {keyUser, email, kataSandi} = this.state;
            
            if(email && kataSandi){
                await firestore()
                .collection('data_pengguna')
                .doc(keyUser)
                .get()
                .then(snapshot => {
                    let dataUser = snapshot.data();

                    if(email == dataUser.email){
                        this.setState({
                            noticeEmail: '',
                        });

                        if(kataSandi == dataUser.kata_sandi){
                            this.setState({
                                noticeKataSandi: '',
                            });
                            //mulai hapus
                            this.callDeleteAll(keyUser);
                        }else{
                            this.setState({
                                noticeKataSandi: 'kata sandi salah',
                            });
                        }
                    }else{
                        this.setState({
                            noticeEmail: 'email salah',
                        });
                    }
                })
            }else{
                Alert.alert('Gagal!', 'Lengkapi inputan yang tersedia');
            }
        }catch(e){
            console.log(e);
        }
    }

    callDeleteAll = (keyUser) => {
        this.deleteAllData('data_rencana_menanam', keyUser);
        this.deleteAllData('data_rencana_perawatan', keyUser);
        this.deleteAllData('data_riwayat_menanam', keyUser);
        this.deleteAllData('data_riwayat_perawatan', keyUser);
        this.deleteAllData('data_simpanan_menanam', keyUser);
        this.deleteAllData('data_simpanan_perawatan', keyUser);
        this.deleteAllData('data_pengguna', keyUser);
    }

    deleteAllData = async (typeCollection, keyUser) => {
        try{
            await firestore()
            .collection(typeCollection)
            .doc(keyUser)
            .delete()
            .then(() => {
                if(typeCollection == 'data_pengguna'){
                    Alert.alert('Berhasil!', 'Akun anda sudah terhapus')
                    this.props.navigation.navigate('MasukAkun');
                }
            })
        }catch(e){
            console.log(e);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderPengaturan/>

                <ScrollView style={styles.containerEdit}>
                    <Text style={styles.textTitle}>Hapus Akun</Text>
                    <Text style={styles.textDescTitle}>pastikan data yang anda masukkan benar</Text>

                    <View>
                        <ItemFormTextEdit 
                            label='email' 
                            autoCapitalize='none' 
                            nameState='email' 
                            value={this.state.email} 
                            onChangeText={this.onChangeText}
                            notice={this.state.noticeEmail}
                        />

                        <ItemFormTextEdit 
                            label='kata sandi' 
                            autoCapitalize='none' 
                            nameState='kataSandi' 
                            value={this.state.kataSandi} 
                            onChangeText={this.onChangeText}
                            notice={this.state.noticeKataSandi}
                        />

                        <TouchableOpacity style={styles.touchEditData} onPress={this.checkDataInput}>
                            <Text style={styles.titleTouch}>ok hapus akun</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerEdit: {
        paddingHorizontal: 17,
        height: '100%',
        backgroundColor: 'white'
    },
    textTitle: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22
    },
    textDescTitle: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        marginTop: -windowHeight*0.005,
        marginBottom: 40
    },
    touchEditData: {
        backgroundColor: '#5AA469',
        paddingVertical: 12,
        borderRadius: 100,
        marginTop: 25,
        marginBottom: 50
    },
    titleTouch: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        textAlign: 'center'
    },
});
