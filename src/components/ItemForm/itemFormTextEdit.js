import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import {  IconShow, IconHide } from '../../assets/assets.js'

class ItemFormTextEdit extends Component{
    constructor(props){
        super(props);

        this.state = {
            secureTextEntry: true,
            iconName: <IconHide/>
        };
    }

    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? <IconShow/> : <IconHide/>;

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    render(){
        const {label, autoCapitalize, nameState, value, onChangeText, notice} = this.props;

        return(
            <View>
                <Text style={styles.titleInput}>{label}</Text>
                {
                    label !== 'kata sandi' ? 
                        <View>
                            <TextInput 
                                style={styles.inputText} 
                                autoCapitalize={autoCapitalize} 
                                selectionColor='#5AA469'
                                value={value}
                                onChangeText={(text)=>onChangeText(nameState, text)}    
                            />

                            <Text style={styles.textNotice}>{notice}</Text>
                        </View>
                    :
                        <View>
                            <View style={styles.containerInputPassword}>
                                <TextInput 
                                    style={styles.inputPassword} 
                                    secureTextEntry={this.state.secureTextEntry} 
                                    selectionColor='#5AA469'
                                    value={value}
                                    onChangeText={(text)=>onChangeText(nameState, text)}
                                />

                                <TouchableOpacity style={styles.touchIconPassword} onPress={this.onIconPress}>
                                    {this.state.iconName}
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.textNotice}>{notice}</Text>
                        </View>
                }
            </View>
        );
    }
}

export default ItemFormTextEdit;

const styles = StyleSheet.create({
    titleInput: {
        color: 'rgba(47, 53, 66, 0.8)',
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    inputText: {
        borderBottomWidth: 1.3,
        borderBottomColor: 'rgba(47, 53, 66, 0.2)',
        paddingVertical: 2,
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 12.5
    },
    textNotice: {
        color: '#5AA469',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        marginBottom: 14
        
    },
    containerInputPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.3,
        borderBottomColor: 'rgba(47, 53, 66, 0.2)',
    },
    inputPassword: {
        width: '87%',
        paddingVertical: 2,
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 12.5,
    },
    touchIconPassword: {
        width: '13%',
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
});