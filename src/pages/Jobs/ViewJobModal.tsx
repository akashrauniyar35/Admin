import React from 'react'
import { ActivityIndicator, Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'
import { Colors, WIDTH } from '../../assets/Colors';

import HeaderComponent from '../../components/AddButtonHeader';


import { useSelector } from 'react-redux';
import ViewJobModalComponent from './ViewJobModalComponent';




const ViewJobModal = ({ isOpen, onPress, onClose, id, refresh, deletOpen, toggleDelete, deleteHandler, confirmOpen, toggleConfirm, confirmHandler }: any) => {

    const jobData: any = useSelector((state: any) => state.jobReducer.jobByIdData)
    const loading = useSelector((state: any) => state.jobReducer.selectedJobLoading)

    return (
        <>
            < View >
                <View style={styles.centeredView}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isOpen}
                        onRequestClose={onPress}

                    ><SafeAreaView />
                        <View style={styles.centeredView}>

                            <Pressable>
                                <HeaderComponent saveOption={false} onPress={onPress} onClose={onClose} lable={`#${id.substring(0, 40)}`} />
                            </Pressable>

                            {loading && <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} size={'small'} style={{}} />}

                            <View style={styles.modalView}>
                                {jobData.map((item: any) => {
                                    return (
                                        <ViewJobModalComponent key={item._id} id={id} item={item} onClose={onClose} refresh={refresh} deletOpen={deletOpen} toggleDelete={toggleDelete} confirmOpen={confirmOpen} toggleConfirm={toggleConfirm} deleteHandler={deleteHandler} confirmHandler={confirmHandler} />
                                    )
                                })}
                            </View>

                        </View>
                    </Modal >
                </View >
            </View>
        </>
    )
}

export default ViewJobModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    modalView: {
        backgroundColor: "white",
        width: WIDTH,
        flex: 1,
        paddingVertical: Colors.spacing * 1,
    },


})