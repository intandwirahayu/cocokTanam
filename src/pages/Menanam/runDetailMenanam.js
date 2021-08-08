import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions} from 'react-native';
import { ButtonFixed, HeaderInformation, ItemSpecification, HeaderPengaturan } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class RunDetailMenanam extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            data_menanam: [],
            data_imageDetail: [],
            key_imageDetail: [],
            data_peralatanBahan: [],
            key_peralatanBahan: [],
            data_caraMenanam: [],
            key_caraMenanam: []
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showData();
    }

    showData = async () => {
        try{
            const keyData = this.props.route.params.keyData;

            this.showDataMenanam(keyData);

            this.showDataImageDetail(keyData);

            this.showDataPeralatanBahan(keyData);

            this.showDataCaraMenanam(keyData);
        }catch(e){
            console.log(e);
        }
    }

    showDataMenanam = async (keyData) => {
        try{
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

    showDataPeralatanBahan = async (keyData) => {
        try{
            await firestore()
            .collection('data_menanam')
            .doc(keyData)
            .collection('peralatan_bahan')
            .doc('pb1')
            .get()
            .then(snapshot => {
                this.setState({
                    data_peralatanBahan: snapshot.data(),
                    key_peralatanBahan: Object.keys(snapshot.data())
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    showDataCaraMenanam = async (keyData) => {
        try{
            await firestore()
            .collection('data_menanam')
            .doc(keyData)
            .collection('cara_menanam')
            .doc('cm1')
            .get()
            .then(snapshot => {
                this.setState({
                    data_caraMenanam: snapshot.data(),
                    key_caraMenanam: Object.keys(snapshot.data())
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    locationPage = () => {
        this.props.navigation.navigate('QuizMenanam', {keyData: this.props.route.params.keyData, idUser: this.props.route.params.idUser});
    }

    render() {
        const { data_menanam, 
                data_peralatanBahan, key_peralatanBahan, 
                data_caraMenanam, key_caraMenanam,
                data_imageDetail, key_imageDetail } = this.state;

        return (
            <View style={styles.containerPage}>
                <HeaderPengaturan/>

                <ScrollView >
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

                        <View style={styles.containerInformation}>
                            <HeaderInformation title="Peralatan & Bahan"/>
                                {
                                    key_peralatanBahan.map((key_pb, key) => {
                                        return(
                                            <View style={styles.rowInformation} key={key}>
                                                <Text style={styles.numberInformation}>{Number(key_pb)+1}.</Text>
                                                <Text style={styles.valueInformation}>{data_peralatanBahan[key_pb]}</Text>
                                            </View>
                                        )
                                    })
                                } 
                        </View>

                        <View style={styles.containerInformation}>
                            <HeaderInformation title="Cara Menanam"/>

                            {
                                key_caraMenanam.map((key_cm, key) => {
                                    return(
                                        <View style={styles.rowInformation} key={key}>
                                            <Text style={styles.numberInformation}>{Number(key_cm)+1}. </Text>
                                            <Text style={styles.valueInformation}>{data_caraMenanam[key_cm]}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <ButtonFixed title="Selesai Menanam" action={this.locationPage}/>
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
        justifyContent: 'space-between'
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
        width: '27.5%'
    },
    containerInformation: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    rowInformation: {
        flexDirection: 'row',
        marginBottom: 15,
        marginRight: 15
    },
    valueInformation: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        textAlign: 'justify',
        lineHeight: 25,
        marginTop: -2
    },
    numberInformation: {
        width: '5%',
        marginRight: 2,
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        textAlign: 'justify'
    },
})

