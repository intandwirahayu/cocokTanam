import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Alert} from 'react-native';
import { ButtonFixed, HeaderDetail, HeaderInformation, ItemSpecification } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class DetailMenanam extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            keyData: this.props.route.params.keyDetailData,
            data_menanam: [],
            data_imageDetail: [],
            key_imageDetail: [],
            titleButton: '',
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showData();
        this.checkTitleButton();
    }

    showData = async () => {
        try{
            //memanggil fungsi kemudian mengirimkan id menanam
            const {keyData} = this.state;

            this.showDataMenanam(keyData);
            this.showDataImageDetail(keyData);
        }catch(e){
            console.log(e);
        }
    }

    showDataMenanam = async (keyData) => {
        try{
            //mengambil informasi menanam berdasarkan id menanam
            await firestore()
            .collection('data_menanam')
            .doc(keyData)
            .get()
            .then(snapshot => {
                this.setState({
                    data_menanam: snapshot.data()
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    showDataImageDetail = async (keyData) => {
        try{
            //mengambil key image detail berdasarkan id menanam
            await firestore()
            .collection('data_menanam')
            .doc(keyData)
            .collection('image_detail')
            .doc('imgd1')
            .get()
            .then(snapshot => {
                this.setState({
                    data_imageDetail: snapshot.data(),
                    key_imageDetail: Object.keys(snapshot.data())
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    //proses rencanakan menanam
    checkTitleButton = async () => {
        try{
            //mengatur kondisi button
            const idUser = this.props.route.params.idUser;
            const {keyData} = this.state;

            await firestore()
            .collection('data_rencana_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let valueField = Object.values(snapshot.data()); 
                if(valueField.includes(keyData)){
                    this.setState({
                        titleButton: 'Sudah Direncanakan'
                    })
                }else{
                    this.setState({
                        titleButton: 'Rencanakan Menanam'
                    })
                }
            })
            .catch(() => {
                this.setState({
                    titleButton: 'Rencanakan Menanam'
                })
            });
        }catch(e){
            console.log(e);
        }
    }

    checkRencana = async () => {
        try{
            //mengecek rencana apakah sudah dibuat atau belum
            const idUser = this.props.route.params.idUser;
            const {keyData} = this.state;

            await firestore()
            .collection('data_rencana_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let valueField = Object.values(snapshot.data()); 
                if(valueField.includes(keyData)){
                    Alert.alert('UPS!', 'Rencana menanam tanaman ini sudah dibuat sebelumnya!');
                }else{
                    this.deleteSimpanan(idUser, keyData);
                }
            })
            .catch(() => {
                this.deleteSimpanan(idUser, keyData);
            });
        }catch(e){
            console.log(e);
        }
    }

    deleteSimpanan = async (idUser, keyData) => {
        try{
            //jika membuat rencana maka hapus data yg disimpan sebelumnya
            await firestore()
            .collection('data_simpanan_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let valueSimpanan = Object.values(snapshot.data());
                let keySimpanan = Object.keys(snapshot.data());

                let valueDelete = valueSimpanan.indexOf(keyData);
                let keyDelete = keySimpanan[valueDelete];

                firestore()
                .collection('data_simpanan_menanam')
                .doc(idUser)
                .update({
                    [keyDelete] : firestore.FieldValue.delete()
                })
                .then(snapshot => {
                    this.searchIdRencana();
                })
            })
        }catch(e){
            this.searchIdRencana();
        }
    }

    searchIdRencana = async () => {
        try{
            const idUser = this.props.route.params.idUser;
            const {keyData} = this.state;

            //pencarian id user apakah sudah pernah membuat rencana atau belum
            await firestore()
            .collection('data_rencana_menanam')
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
            .collection('data_rencana_menanam')
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
            .collection('data_rencana_menanam')
            .doc(idUser)
            .update({
                [newKeyField] : keyData
            })
            .then(() => {
                Alert.alert('Berhasil', 'Rencana menanam berhasil dibuat');
                this.setState({
                    titleButton: 'Sudah Direncanakan'
                });
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
            .collection('data_rencana_menanam')
            .doc(idUser)
            .set({
                0 : keyData
            })
            .then(() => {
                Alert.alert('Berhasil', 'Rencana menanam berhasil dibuat')
                this.setState({
                    titleButton: 'Sudah Direncanakan'
                })
            });
        }catch(e){
            console.log(e);
        }
    }

    //proses simpanan menanam
    checkSimpanan = async () => {
        try{
            //jika data sudah dibuat rencana sebelumnya, maka tidak dapat membuat simpanan
            const idUser = this.props.route.params.idUser;
            const {keyData} = this.state;

            await firestore()
            .collection('data_rencana_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let valueField = Object.values(snapshot.data()); 
                if(valueField.includes(keyData)){
                    Alert.alert('UPS!', 'Tidak dapat disimpan karena sudah dijadikan rencana menanam');
                }else{
                    this.searchIdSimpanan();
                }
            })
            .catch(() => {
                this.searchIdSimpanan();
            })
        }catch(e){
            console.log(e);
        }
    }

    searchIdSimpanan = async () => {
        try{
            const idUser = this.props.route.params.idUser;
            const {keyData} = this.state;

            //pencarian id user apakah sudah pernah membuat simpanan atau belum
            await firestore()
            .collection('data_simpanan_menanam')
            .get()
            .then(snapshot => {
                let dataIdSimpanan = [];

                snapshot.forEach(documentSnapShot => {
                    dataIdSimpanan.push(documentSnapShot.id);
                });

                if(dataIdSimpanan.includes(idUser)){
                    this.searchFieldSimpanan(idUser, keyData);
                }else{
                    this.makeSimpanan(idUser, keyData);
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    searchFieldSimpanan = async (idUser, keyData) => {
        try{
            //jika sudah membuat simpanan sebelumnya, maka cari key field terakhirnya
            await firestore()
            .collection('data_simpanan_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKeyField = Object.keys(snapshot.data());
                let countDataKey = dataKeyField.length;
                let keyField = dataKeyField[countDataKey-1];

                if(countDataKey > 0){
                    this.addSimpanan(keyField, idUser, keyData);
                }else{
                    this.makeSimpanan(idUser, keyData);
                }
                
            });
        }catch(e){
            console.log(e);
        }
    }

    addSimpanan = async (keyField, idUser, keyData) => {
        try{
            //menambah simpanan dengan key field yang sudah ditentukan
            await firestore()
            .collection('data_simpanan_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let valueField = Object.values(snapshot.data());

                if(valueField.includes(keyData)){
                    Alert.alert('UPS!', 'Simpanan sudah ditambahkan sebelumnya');
                }else{
                    let newKeyField = parseInt(keyField) + 1;

                    firestore()
                    .collection('data_simpanan_menanam')
                    .doc(idUser)
                    .update({
                        [newKeyField] : keyData
                    })
                    .then(() => {
                        Alert.alert('Berhasil', 'Simpanan menanam berhasil ditambahkan');
                    })
                }
            })
        }catch(e){
            console.log(e);
        }
    }

    makeSimpanan = async (idUser, keyData) => {
        try{
            //menambah simpanan dengan key field default 0
            await firestore()
            .collection('data_simpanan_menanam')
            .doc(idUser)
            .set({
                0 : keyData
            })
            .then(() => {
                Alert.alert('Berhasil', 'Simpanan menanam berhasil ditambahkan');
            });
        }catch(e){
            console.log(e);
        }
    }

    render() {
        const { data_menanam, data_imageDetail, key_imageDetail, titleButton } = this.state;

        return (
            <View style={styles.containerPage}>
                <HeaderDetail action={this.checkSimpanan}/>

                <ScrollView>
                    <View style={styles.containerContent}>
                        <Text style={styles.contentType}>{data_menanam.jenis_tanaman}</Text>
                        <Text style={styles.contentTitle}>{data_menanam.nama_tanaman}</Text>

                        <ScrollView horizontal={true} style={styles.containerImage} showsHorizontalScrollIndicator={false}>
                            {
                                key_imageDetail.map((key_id, key) => {
                                    return(
                                        <Image source={{uri: data_imageDetail[key_id]}} style={styles.imageContent} key={key}/>
                                    )
                                })
                            }
                        </ScrollView>

                        <View style={styles.containerSpecification}>
                            <View style={styles.itemSpecification1}>
                                <ItemSpecification title="tingkat" value={data_menanam.tingkat}/>
                            </View>

                            <View style={styles.itemSpecification2}>
                                <ItemSpecification title="lokasi" value={data_menanam.lokasi}/>
                            </View>

                            <View style={styles.itemSpecification3}>
                                <ItemSpecification title="suhu min-max" value={data_menanam.suhu_minimal} />
                            </View>
                        </View>

                        <View>
                            <View style={styles.containerInformation}>
                                <HeaderInformation title="Deskripsi"/>

                                <Text style={styles.valueInformation}>{data_menanam.deskripsi}</Text>
                            </View>
                        </View>

                        <ButtonFixed title={titleButton} action={this.checkRencana}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerPage: {
        height: '100%', 
        backgroundColor: 'white', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
    },
    contentType: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#5AA469',
        marginLeft: 20
    },
    contentTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        color: '#2F3542',
        marginLeft: 20
    },
    containerImage: {
        marginLeft: 20,
        marginVertical: 20
    },
    imageContent: {
        width: windowWidth*0.50,
        height: windowHeight*0.40,
        borderRadius: 10,
        marginRight: 20
    },
    containerSpecification: {
        width: windowWidth*0.89,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: 20,
        padding: 10,
        backgroundColor: 'rgba(90, 164, 105, 0.15)',
    },
    itemSpecification1: {
        width: '25%'
    },
    itemSpecification2: {
        width: '40%'
    },
    itemSpecification3: {
        width: '27.5%',
    },
    containerInformation: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20
    },
    valueInformation: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        textAlign: 'justify',
        lineHeight: 22.5
    },
})

