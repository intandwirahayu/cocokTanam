import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions} from 'react-native';
import { ButtonFixed, HeaderInformation, HeaderPengaturan, ItemSpecification } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class RunDetailPerawatan extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            data_perawatan: [],
            data_imageDetail: [],
            key_imageDetail: [],
            data_peralatanBahan: [],
            key_peralatanBahan: [],
            data_caraPerawatan: [],
            key_caraPerawatan: []
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showData();
    }

    showData = async () => {
        try{
            const keyData = this.props.route.params.keyData;

            this.showDataPerawatan(keyData);

            this.showDataImageDetail(keyData);

            this.showDataCaraPerawatan(keyData);
        }catch(e){
            console.log(e);
        }
    }

    showDataPerawatan = async (keyData) => {
        try{
            await firestore()
            .collection('data_perawatan')
            .doc(keyData)
            .get()
            .then(snapshot => {
                this.setState({
                    data_perawatan: snapshot.data()
                });
                console.log(snapshot.data());
            });
        }catch(e){
            console.log(e);
        }
    }

    showDataImageDetail = async (keyData) => {
        try{
            await firestore()
            .collection('data_perawatan')
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

    showDataCaraPerawatan = async (keyData) => {
        try{
            await firestore()
            .collection('data_perawatan')
            .doc(keyData)
            .collection('cara_perawatan')
            .doc('cp1')
            .get()
            .then(snapshot => {
                this.setState({
                    data_caraPerawatan: snapshot.data(),
                    key_caraPerawatan: Object.keys(snapshot.data())
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    locationPage = () => {
        this.props.navigation.navigate('QuizPerawatan', {keyData: this.props.route.params.keyData, idUser: this.props.route.params.idUser});
    }

    render() {
        const { data_perawatan, 
                key_imageDetail, data_imageDetail,
                data_caraPerawatan, key_caraPerawatan } = this.state;
        
        return (
            <View style={styles.containerPage}>
                <HeaderPengaturan/>

                <ScrollView>
                    <Text style={styles.titleContent}>{data_perawatan.nama_perawatan}</Text>

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
                            <ItemSpecification title="jenis tanaman" value={data_perawatan.jenis_tanaman}/>
                        </View>

                        <View style={styles.itemSpecification2}>
                            <ItemSpecification title="tingkat kegiatan" value={data_perawatan.tingkat}/>
                        </View>
                    </View>

                    <View>
                        <View style={styles.containerInformation}>
                            <HeaderInformation title="Deskripsi"/>
                                    
                            <Text style={styles.valueInformation}>{data_perawatan.deskripsi}</Text>
                        </View>

                        <View style={styles.containerInformation}>
                            <HeaderInformation title="Cara Perawatan"/>
                                {
                                    key_caraPerawatan.map((key_cp, key) => {
                                        return(
                                            <View style={styles.rowInformation} key={key}>
                                                <Text style={styles.numberInformation}>{Number(key_cp)+1}. </Text>
                                                <Text style={styles.valueInformation}>{data_caraPerawatan[key_cp]}</Text>
                                            </View>
                                        )
                                    })
                                }
                        </View>

                        <ButtonFixed title="Selesai Perawatan" action={this.locationPage}/>
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
    titleContent: {
        width: '84%',
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
        width: '65%'
    },
    itemSpecification2: {
        width: '30%'
    },
    containerInformation: {
        paddingHorizontal: 20,
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
        textAlign: 'justify',
        fontSize: 12,
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
    }
})
