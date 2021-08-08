import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import { NoDataRencana } from '../../components/components.js';
import { HeaderRiwayat, ItemListPerawatan } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class RencanaPerawatan extends Component{
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.route.params.keyUserLogin,
            keyPerawatan: [],
            valuePerawatan: [],
            dataRencanaPerawatan: [],
            countDataRencana: '',
            haveListPerawatan: ''
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showRencanaPerawatan();
    }

    showRencanaPerawatan = async () => {
        try{
            //mencari data rencana perawatan berdasarkan id user
            const {idUser} = this.state;

            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                if(snapshot.data()){
                    this.setState({
                        keyPerawatan : Object.keys(snapshot.data()),
                        valuePerawatan : Object.values(snapshot.data()),
                        haveListPerawatan: true
                    });

                    const {keyPerawatan} = this.state;

                    if(keyPerawatan.length == 0){
                        this.setState({
                            haveListPerawatan: false
                        });
                    }else{
                        this.allDataPerawatan();
                    }
                }else{
                    this.setState({
                        haveListPerawatan: false
                    });
                }
            });
        }catch(e){
            this.setState({
                haveListPerawatan: false
            });
        }
    }

    allDataPerawatan = async () => {
        try{
            //mencocokkan data perawatan dan data rencana perawatan
            const {valuePerawatan} = this.state;

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
                    for(let i = 0; i <= dataPerawatan.length; i++){
                        if(itemData.id_perawatan == valuePerawatan[i]){
                            dataRencanaPerawatan.push(itemData);
                        }
                    }
                });

                this.setState({
                    dataRencanaPerawatan,
                    countDataRencana: dataRencanaPerawatan.length
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    deleteRencanaPerawatan = async (keyData) => {
        try{
            //menghapus salah satu isi data rencana perawatan
            //dengan klik icon cancel
            const {keyPerawatan, valuePerawatan, idUser} = this.state;

            let valueDelete = valuePerawatan.indexOf(keyData);
            let keyDelete = keyPerawatan[valueDelete];

            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .update({
                [keyDelete] : firestore.FieldValue.delete()
            })
            .then(snapshot => {
                this.deleteDocEmpty(idUser);
            })
        }catch(e){
            console.log(e);
        }
    }

    //for delete doc perawatan empty
    deleteDocEmpty = async (idUser) => {
        try{
            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKey = Object.keys(snapshot.data());
                
                if(dataKey.length == 0){
                    firestore()
                    .collection('data_rencana_perawatan')
                    .doc(idUser)
                    .delete()
                    .then(() => {
                        this.showRencanaPerawatan();
                    })
                }else{
                    this.showRencanaPerawatan();
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const {haveListPerawatan, dataRencanaPerawatan, countDataRencana, idUser} = this.state;

        return (
            <View style={styles.containerSimpanan}>
                <HeaderRiwayat namePage='Rencana Merawat'/>
                
                <View style={styles.containerContent}>
                    {
                        haveListPerawatan == true ? 
                            <ScrollView style={{marginTop: 40}}>
                                <View style={{marginLeft: 20}}>
                                    <Text style={styles.scrollText1}>{countDataRencana}</Text>
                                    <Text style={styles.scrollText2}>Rencana</Text>
                                    <Text style={styles.scrollText2}>Merawat Tanaman Mu</Text>
                                </View>
                    
                                <View style={styles.containerList}>
                                    {
                                        dataRencanaPerawatan.map((itemRencana, key) => {
                                            return(
                                                <ItemListPerawatan
                                                    imageMerawat={itemRencana.image_display}
                                                    nameMerawat={itemRencana.nama_perawatan}
                                                    typeMerawat={itemRencana.jenis_tanaman}
                                                    idMerawat={itemRencana.id_perawatan}
                                                    key={key}
                                                    actionCancel={this.deleteRencanaPerawatan}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        :
                            <View style={styles.containerNoData}>
                                <NoDataRencana titlePage="rencana"/>
                            </View>
                    }
                </View>
            </View>
        )
    }
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerSimpanan: {
        flex: 1,
        backgroundColor: '#5AA469'
    },
    containerContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    containerNoData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollText1: {
        color: '#5AA469',
        fontSize: 30,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: -windowHeight*0.012
    },
    scrollText2: {
        color: '#2F3542',
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold'
    },
    containerList: {
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 30
    }
})
