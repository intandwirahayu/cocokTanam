import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions,  TouchableOpacity, Alert } from 'react-native';
import { HeaderPengaturan, ItemFormTextEdit } from '../../components/components.js';
import firestore from '@react-native-firebase/firestore';

export default class EditAkun extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            keyUser: this.props.route.params.keyUserEdit,
            namaLengkap: '',
            namaAkun: '',
            email: '',
            kataSandi: '',
            namaAkunLogin: '',
            emailLogin: '',
            dataNamaAkun: [],
            dataEmail: [],
            noticeNamaAkun: '',
            noticeEmail: '',
            statusNamaAkun: true,
            statusEmail: true
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showData();
        this.showDataUserLogin();
    }

    showData = async () => {
        try{
            await firestore()
            .collection('data_pengguna')
            .get()
            .then(snapshot => {
                let dataNamaAkun = [];
                let dataEmail = [];

                snapshot.forEach(documentSnapShot => {
                    let dataPengguna = documentSnapShot.data();

                    dataNamaAkun.push(dataPengguna.nama_akun);
                    dataEmail.push(dataPengguna.email);
                });

                this.setState({
                    dataNamaAkun,
                    dataEmail
                });
            })
        }catch(err){
            console.log(err)
        }
    }

    showDataUserLogin = async () => {
        try{
            const {keyUser} = this.state;
            
            await firestore()
            .collection('data_pengguna')
            .doc(keyUser)
            .get()
            .then(snapshot => {
                let dataUserLogin = snapshot.data();

                this.setState({
                    namaLengkap: dataUserLogin.nama_lengkap,
                    namaAkun: dataUserLogin.nama_akun,
                    email: dataUserLogin.email,
                    kataSandi: dataUserLogin.kata_sandi,
                    namaAkunLogin: dataUserLogin.nama_akun,
                    emailLogin: dataUserLogin.email,
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    onChangeText = (nameState, value) => {
        this.setState({
            [nameState] : value
        });

        this.verifData(nameState, value);
    }

    verifData = async (nameState, value) => {
        try{
            const { dataNamaAkun, dataEmail, namaAkunLogin, emailLogin } = this.state;

            const newDataNamaAkun = dataNamaAkun.filter(item => {
                    return(item !== namaAkunLogin)
            });

            const newDataEmail = dataEmail.filter(item => {
                    return(item !== emailLogin)
            });

            if(nameState == 'namaAkun'){
                if(newDataNamaAkun.includes(value)){
                    this.setState({
                        noticeNamaAkun: 'Nama akun sudah digunakan',
                        statusNamaAkun: false
                    })
                }else if(value.includes(' ')){
                    this.setState({
                        noticeNamaAkun: 'Tidak boleh mengandung spasi',
                        statusNamaAkun: false
                    })
                }else if(value == ''){
                    this.setState({
                        noticeNamaAkun: '',
                        statusNamaAkun: false
                    })
                }else{
                    this.setState({
                        noticeNamaAkun: '',
                        statusNamaAkun: true
                    })
                }
            }

            if(nameState == 'email'){
                if(newDataEmail.includes(value)){
                    this.setState({
                        noticeEmail: 'Email sudah digunakan',
                        statusNamaAkun: false
                    })
                }else if(value.includes(' ')){
                    this.setState({
                        noticeEmail: 'Tidak boleh mengandung spasi',
                        statusEmail: false
                    })
                }else if(value == ''){
                    this.setState({
                        noticeEmail: '',
                        statusEmail: false
                    })
                }else{
                    this.setState({
                        noticeEmail: '',
                        statusEmail: true
                    })
                }
            }
        }catch(e){
            console.log(e)
        }
    }

    onSubmit = async () => {
        try{
            const {namaLengkap, namaAkun, email, kataSandi, statusNamaAkun, statusEmail, keyUser} = this.state;

            if(namaLengkap && namaAkun && email && kataSandi){
                if(statusNamaAkun && statusEmail){
                    await firestore()
                    .collection('data_pengguna')
                    .doc(keyUser)
                    .update({
                        nama_lengkap: namaLengkap,
                        nama_akun: namaAkun,
                        email: email,
                        kata_sandi: kataSandi
                    })
                    .then(() => {
                        Alert.alert('Berhasil', 'Data anda telah berubah');
                    })
                    .catch((e) => {
                        Alert.alert('Gagal', 'Data anda tidak berubah');
                    })
                }
            }else{
                Alert.alert('Gagal', 'Lengkapi inputan yang tersedia');
            }
        }catch(err){
            console.log(err);
        }
    }

    render() {
        return (
            <View style={{height: '100%'}}>
                <HeaderPengaturan/>

                <ScrollView style={styles.containerEdit}>
                    <Text style={styles.textTitle}>Edit Data Akun</Text>
                    <Text style={styles.textDescTitle}>pastikan data yang anda masukkan benar</Text>

                    <View>
                        <ItemFormTextEdit 
                            label='nama lengkap' 
                            autoCapitalize='words' 
                            nameState='namaLengkap' 
                            value={this.state.namaLengkap} 
                            onChangeText={this.onChangeText}
                        />

                        <ItemFormTextEdit 
                            label='nama akun' 
                            autoCapitalize='none' 
                            nameState='namaAkun' 
                            value={this.state.namaAkun} 
                            onChangeText={this.onChangeText}
                            notice={this.state.noticeNamaAkun}
                        />

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
                        />

                        <TouchableOpacity style={styles.touchEditData} onPress={this.onSubmit}>
                            <Text style={styles.titleTouch}>ok edit akun</Text>
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
        height: '90%',
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
