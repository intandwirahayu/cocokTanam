import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Background2, IconNotification } from '../../assets/assets.js';
import { HeaderContentBeranda, ItemListMenanam, NoList, ItemListPerawatan } from '../../components/components.js';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const Beranda = (props) =>  {
    //state menanam
    const [idUser, setIdUser] = useState(props.route.params.keyUserLogin);
    const [keyMenanam, setKeyMenanam] = useState([]);
    const [valueMenanam, setValueMenanam] = useState([]);
    const [dataRencanaMenanam, setDataRencanaMenanam] = useState([]);
    const [haveListMenanam, setHaveListMenanam] = useState('');

    //state perawatan
    const [keyPerawatan, setKeyPerawatan] = useState([]);
    const [valuePerawatan, setValuePerawatan] = useState([]);
    const [dataRencanaPerawatan, setDataRencanaPerawatan] = useState([]);
    const [haveListPerawatan, setHaveListPerawatan] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const unsubscribe = setInterval(() => {
                toRefreshh();
            }, 1000);
            
        return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            clearInterval(unsubscribe);
        };
        }, [idUser, keyMenanam, valueMenanam, dataRencanaMenanam, haveListMenanam,
            keyPerawatan, valuePerawatan, dataRencanaPerawatan, haveListPerawatan])
    );

    const toRefreshh = () => {
        //refresh tampilan data
        showRencanaMenanam();
        showRencanaPerawatan();
    }

    //show menanam
    const showRencanaMenanam = async () => {
        try{
            //mencari data rencana menanam berdasarkan id user
            await firestore()
            .collection('data_rencana_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                if(snapshot.data()){
                    setKeyMenanam(Object.keys(snapshot.data()));
                    setValueMenanam(Object.values(snapshot.data()));
                    setHaveListMenanam(true);

                    if(keyMenanam.length == 0){
                        setHaveListMenanam(false);
                    }else{
                        allDataMenanam();
                    }

                }else{
                    setHaveListMenanam(false);
                }
            });
        }catch(e){
            setHaveListMenanam(false);
        }
    }

    const allDataMenanam = async () => {
        try{
            //mencocokkan data menanam dan data rencana menanam
            await firestore()
            .collection('data_menanam')
            .get()
            .then(snapshot => {
                let dataMenanam = [];

                snapshot.forEach(documentSnapShot => {
                    dataMenanam.push(documentSnapShot.data());
                });

                let dataRencanaMenanam = [];

                dataMenanam.forEach(itemData => {
                    for(let i = 0; i <= 2; i++){
                        if(itemData.id_menanam == valueMenanam[i]){
                            dataRencanaMenanam.push(itemData);
                        }
                    }
                });

                setDataRencanaMenanam(dataRencanaMenanam);
            });
        }catch(e){
            console.log(e);
        }
    }

    const deleteRencanaMenanam = async (keyData) => {
        try{
            //menghapus salah satu isi data rencana menanam 
            //dengan click icon cancel
            let valueDelete = valueMenanam.indexOf(keyData);
            let keyDelete = keyMenanam[valueDelete];

            await firestore()
            .collection('data_rencana_menanam')
            .doc(idUser)
            .update({
                [keyDelete] : firestore.FieldValue.delete()
            })
            .then(snapshot => {
                deleteDocEmpty('menanam', idUser);
            })
        }catch(e){
            console.log(e);
        }
    }

    //show perawatan
    const showRencanaPerawatan = async () => {
        try{
            //mencari data rencana perawatan berdasarkan id user
            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                if(snapshot.data()){
                    setKeyPerawatan(Object.keys(snapshot.data()));
                    setValuePerawatan(Object.values(snapshot.data()));
                    setHaveListPerawatan(true);

                    if(keyPerawatan.length == 0){
                        setHaveListPerawatan(false);
                    }else{
                        allDataPerawatan();
                    }
                }else{
                    setHaveListPerawatan(false);
                }
            });
        }catch(e){
            setHaveListMenanam(false);
        }
    }

    const allDataPerawatan = async () => {
        try{
            //mencocokkan data perawatan dan data rencana perawatan
            await firestore()
            .collection('data_perawatan')
            .get()
            .then(snapshot => {
                let dataPerawatan = [];

                snapshot.forEach(documentSnapShot => {
                    dataPerawatan.push(documentSnapShot.data());
                });

                let dataRencanaPerawatan = [];

                dataPerawatan.forEach(itemData => {
                    for(let i = 0; i <= 2; i++){
                        if(itemData.id_perawatan == valuePerawatan[i]){
                            dataRencanaPerawatan.push(itemData);
                        }
                    }
                });

                setDataRencanaPerawatan(dataRencanaPerawatan);
            })
        }catch(e){
            console.log(e);
        }
    }

    const deleteRencanaPerawatan = async (keyData) => {
        try{
            //menghapus salah satu isi data rencana perawatan
            //dengan click icon cancel
            let valueDelete = valuePerawatan.indexOf(keyData);
            let keyDelete = keyPerawatan[valueDelete];

            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .update({
                [keyDelete] : firestore.FieldValue.delete()
            })
            .then(snapshot => {
                deleteDocEmpty('perawatan', idUser);
            })
        }catch(e){
            console.log(e);
        }
    }

    return (
        <View style={{backgroundColor: '#5AA469'}}>
            <ScrollView style={styles.containerScroll}>
                <ImageBackground source={Background2} style={styles.imageBackgroundHeader}>
                    <View style={styles.notification}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Notifikasi')} style={{paddingLeft: 25}}>
                            <IconNotification/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.containerHeader}>
                        <Text style={styles.textHeader1}>Mulai Rencana</Text>
                        <Text style={styles.textHeader2}>Menanam dan</Text>
                        <Text style={styles.textHeader3}>Merawat Tanaman!</Text>
                    </View>
                </ImageBackground>

                <View style={styles.containerContent}>
                    <HeaderContentBeranda nameHeader="Menanam" namePage="RencanaMenanam" idUser={idUser}/>
                    {
                        haveListMenanam == true ?
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 11}}>
                                {
                                    dataRencanaMenanam.map((itemRencana, key) => {
                                        return(
                                            <ItemListMenanam
                                                imagePlant={itemRencana.image_display}
                                                typePlant={itemRencana.jenis_tanaman}
                                                namePlant={itemRencana.nama_tanaman}
                                                idPlant={itemRencana.id_menanam}
                                                idUser={idUser}
                                                key={key}
                                                actionCancel={deleteRencanaMenanam}
                                            />
                                        )
                                    })
                                }
                            </ScrollView>
                        :
                            <NoList nameList= 'Menanam'/>
                    }

                    <HeaderContentBeranda nameHeader="Perawatan" namePage="RencanaPerawatan" idUser={idUser}/>
                    {
                        haveListPerawatan == true ?
                            dataRencanaPerawatan.map((itemRencana, key) => {
                                return(
                                    <ItemListPerawatan
                                        imageMerawat={itemRencana.image_display}
                                        nameMerawat={itemRencana.nama_perawatan}
                                        typeMerawat={itemRencana.jenis_tanaman}
                                        idMerawat={itemRencana.id_perawatan}
                                        idUser={idUser}
                                        key={key}
                                        actionCancel={deleteRencanaPerawatan}
                                    />
                                    )
                                })
                        :
                            <NoList nameList= 'Merawat'/>
                        }
                </View>

                <View style={{paddingTop: 25}}/>
            </ScrollView>
        </View>
    )
}

export default Beranda;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerScroll: {
        backgroundColor: 'white', 
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25,
        height: '100%'
    },
    imageBackgroundHeader: {
        width: windowWidth*1.001,
        height: windowHeight*0.33
    },
    notification: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 20,
        paddingRight: 20
    },
    containerHeader: {
        paddingTop: 13,
        paddingLeft: 20
    },
    textHeader1: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        opacity: 0.8
    },
    textHeader2: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 23
    },
    textHeader3: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 23,
        marginTop: -2
    },
    containerContent: {
        paddingHorizontal: 23,
        marginTop: 5
    }
});

