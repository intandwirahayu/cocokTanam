import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import { HeaderRiwayat, ItemListSimpanan, NoDataSimpanan } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

class SimpananMerawat extends Component{
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.route.params.idUserLogin,
            keySimpanan: [],
            valueSimpanan: [],
            dataSimpanan: [],
            availableData: ''
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showData();
    }

    showData = async () => {
        try{ 
            //mengambil data simpanan berdasarkan id user
            const {idUser} = this.state;
            
            await firestore()
            .collection('data_simpanan_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                if(snapshot.data()){
                    this.setState({
                        keySimpanan : Object.keys(snapshot.data()),
                        valueSimpanan : Object.values(snapshot.data()),
                        availableData: true
                    });

                    const {keySimpanan} = this.state;
                    console.log(keySimpanan.length);
                    if(keySimpanan.length == 0){
                        this.setState({
                            availableData: false
                        });
                        
                    }else{
                        this.allDataMerawat();
                    }
                    
                }else{
                    this.setState({
                        availableData: false
                    });
                }
            });
            
        }catch(e){
            console.log(e);
        }
    }

    allDataMerawat = async () => {
        try{
            //mencocokkan data perawatan dengan data simpanan
            const {valueSimpanan} = this.state;

            await firestore()
            .collection('data_perawatan')
            .get()
            .then(snapshot => {
                let dataMerawat = [];

                snapshot.forEach(documentSnapShot => {
                    dataMerawat.push(documentSnapShot.data());
                });

                let dataSimpanan = [];

                dataMerawat.forEach(itemData => {
                    for(let i = 0; i <= 1; i++){
                        if(itemData.id_perawatan == valueSimpanan[i]){
                            dataSimpanan.push(itemData);
                        }
                    }
                });

                this.setState({
                    dataSimpanan
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    //proses membuat rencana
    searchIdRencana = async (keyData) => {
        try{
            const {idUser} = this.state;

            //pencarian id user apakah sudah pernah membuat rencana atau belum
            await firestore()
            .collection('data_rencana_perawatan')
            .get()
            .then(snapshot => {
                let dataIdRencana = [];

                snapshot.forEach(documentSnapShot => {
                    dataIdRencana.push(documentSnapShot.id);
                });

                if(dataIdRencana.includes(idUser)){
                    this.searchFieldRencana(idUser, keyData);
                }else{
                    this.makeRencana(idUser, keyData);
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    searchFieldRencana = async (idUser, keyData) => {
        try{
            //menentukan key field terakhir
            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKeyField = Object.keys(snapshot.data());
                let countDataKey = dataKeyField.length;
                let keyField = dataKeyField[countDataKey-1];

                if(countDataKey > 0){
                    this.addRencana(keyField, idUser, keyData);
                }else{
                    this.makeRencana(idUser, keyData);
                }
                
            });
        }catch(e){
            console.log(e);
        }
    }

    addRencana = async (keyField, idUser, keyData) => {
        try{
            //jika sudah memiliki rencana sebelumnya, maka gunakan fungsi ini
            //dengan key yg sudah ditentukan sebelumnya
            let newKeyField = parseInt(keyField) + 1;

            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .update({
                [newKeyField] : keyData
            })
            .then(() => {
                this.deleteSimpanan(keyData);
                Alert.alert('Berhasil', 'Rencana merawat tanaman berhasil dibuat');
            })
        }catch(e){
            console.log(e);
        }
    }

    makeRencana = async (idUser, keyData) => {
        try{
            //jika belum memiliki rencana sebelumnya, maka gunakan fungsi ini
            //dengan key default 0
            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .set({
                0 : keyData
            })
            .then(() => {
                this.deleteSimpanan(keyData);
                Alert.alert('Berhasil', 'Rencana merawat tanaman berhasil dibuat');
            });
        }catch(e){
            console.log(e);
        }
    }

    deleteSimpanan = async (keyData) => {
        try{
            //menghapus simpanan berdasarkan keyData
            const {keySimpanan, valueSimpanan, idUser} = this.state;

            let valueDelete = valueSimpanan.indexOf(keyData);
            let keyDelete = keySimpanan[valueDelete];

            await firestore()
            .collection('data_simpanan_perawatan')
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

    //for delete doc menanam empty
    deleteDocEmpty = async (idUser) => {
        try{
            await firestore()
            .collection('data_simpanan_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKey = Object.keys(snapshot.data());

                if(dataKey.length == 0){
                    firestore()
                    .collection('data_simpanan_perawatan')
                    .doc(idUser)
                    .delete()
                    .then(() => {
                        this.showData();
                    })
                }else{
                    this.showData();
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const {dataSimpanan, availableData} = this.state;

        return(
            <View style={styles.containerSimpanan}>
                <HeaderRiwayat namePage='Simpanan Merawat'/>
                
                <View style={styles.containerContent}>
                    {
                        availableData == true ?
                            <ScrollView style={{marginTop: 40}}>
                                <Text style={styles.contentText1}>ayo jadikan bagian dari rencana merawat tanaman mu!</Text>

                                <View style={styles.containerContentList}>
                                    <View style={styles.contentItem}> 
                                        <Text style={styles.itemText1}>Merawat</Text>
                                        {
                                            dataSimpanan.map((itemData, key) => {
                                                return(
                                                    <ItemListSimpanan 
                                                        imageTree={itemData.image_display} 
                                                        title={itemData.nama_perawatan} 
                                                        type={itemData.jenis_tanaman} 
                                                        idMenanam={itemData.id_perawatan}
                                                        key={key}
                                                        actionAdd={this.searchIdRencana} 
                                                        actionCancel={this.deleteSimpanan}   
                                                    />
                                                )
                                            })
                                        }
                                    </View> 
                                </View>
                            </ScrollView>
                        :
                            <View style={styles.containerNoData}>
                                <NoDataSimpanan titleContent="merawat"/>
                            </View>       
                    }
                </View>
            </View>
        )
    }
}

export default SimpananMerawat;

const styles = StyleSheet.create({
    containerSimpanan: {
        flex: 1,
        backgroundColor: '#5AA469'
    },
    containerContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    containerNoData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText1: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12.1,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    containerContentList: {
        paddingBottom: 50, 
        marginHorizontal: 20
    },
    contentItem: {
        marginBottom: 20
    },
    itemText1: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        marginBottom: 10
    }
})
