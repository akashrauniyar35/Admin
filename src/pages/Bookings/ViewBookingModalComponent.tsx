import { Alert, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, isAndroid, WIDTH } from '../../assets/Colors'
import SelectionCard from '../../components/SelectionCard'

import JobNotesCard from '../../components/JobNotesCard'
import Checklist from '../../components/CheckList'
import AddNotes from '../../components/AddNotes'

import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import JobTimelineCard from '../../components/JobTimelineCard'
import AddJob from '../Add/AddJob'
import ShowToast from '../../components/ShowToast'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import MapCard from '../../components/MapCard'
import DeleteModal from '../../components/DeletetModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddSystemNote, DeleteSystemNote, RemoveFile, uploadFiles } from '../../config/NoteApi'
import { addNoteFail, addNotePending, addNoteSuccess, deleteNoteFail, deleteNotePending, deleteNoteSuccess, deleteFilePending, deleteFileFail, deleteFileSuccess } from '../../redux/noteSlice'
import uuid from "react-uuid";
import { launchImageLibrary } from 'react-native-image-picker'
import ViewFiles from '../../components/ViewFiles'
import { assignTechFail, assignTechPending, assignTechSuccess, getAllTechFail, getAllTechPending, getAllTechSuccess } from '../../redux/technicianSlice'
import { assignTechnician, clearAssignTechnician, fetchAllTechnician } from '../../config/TechApi'
import AssignTech from '../../components/AssignTech'
import { clockRunning } from 'react-native-reanimated'

// import RNFetchBlob from 'rn-fetch-blob'



const scheduleData = [
    {
        id: '00',
        name: 'Cancelled',
        color: "",
    },
    {
        id: '01',
        name: 'Scheduled',
        color: "",
    },
    {
        id: '02',
        name: 'In Progress',
        color: "",
    },
    {
        id: '03',
        name: 'Completed',
        color: "",
    },
    {
        id: '03',
        name: 'Recall',
        color: "",
    },
];



const ViewJobModalComponent = ({ id, item, refresh, statusHandler, deleteOpen, toggleDelete, deleteHandler }) => {
    console.log('job component modal item', id)
    const [checkListVisible, setCheckListVisible] = useState(false)
    const [addNoteVisible, setAddNoteVisible] = useState(false)
    const [editJobVisible, setEditJobVisible] = useState(false);
    const [viewFiles, setViewFiles] = useState(false);
    const [techData, setTechData] = useState()

    const statusLoading = useSelector((state: any) => state.jobReducer.statusUpdateLoading)
    const deleteBooking = useSelector((state: any) => state.bookingReducer.deleteLoading)
    const notesLoading = useSelector((state: any) => state.noteReducer.loading)
    const assignTechLoading = useSelector((state: any) => state.technicianReducer.assignTech)
    const user = useSelector((state: any) => state.userReducer.data)

    const dispatch = useDispatch()


    const x = String(item.subtotal).slice(0, 3);
    const quotePrice = Number(x).toFixed(2);

    const phoneNumber = [item.phone.slice(0, 4), " ", item.phone.slice(4, 7), " ", item.phone.slice(7)].join('')

    const date = [item.createdAt.slice(0, 4), "/", item.createdAt.slice(5, 7), "/", item.createdAt.slice(8, 15), item.createdAt.slice(8)].join('').substring(0, 10)


    const bd = item.products.find((x: any) => x.title?.toLowerCase() === "bedrooms")
    const ba = item.products.find((x: any) => x.title?.toLowerCase() === "bathrooms")


    const checkListHandler = () => {
        setCheckListVisible(!checkListVisible)
    }

    const addNotesHandler = async (text: string) => {
        dispatch(addNotePending())
        const previousNote = item.notes
        const newNote = {
            id: uuid(), by: `${user.firstName} ${user.lastName}`, addedDate: new Date(), text: text
        }
        const res: any = await AddSystemNote(id, previousNote, newNote)
        console.log("res notes", id)
        if (res.status === "error") {
            return dispatch(addNoteFail());
        }
        dispatch(addNoteSuccess())

        refresh(id)
        setAddNoteVisible(false)
        Toast.show({
            type: 'successToast',
            visibilityTime: 3000,
            text1: `${item?.bookingReference} `,
            props: { message: 'Booking note added successfully' }
        });
    }

    const deleteNotesHandler = async (text: string) => {
        dispatch(deleteNotePending())
        let newNotes = item?.notes?.filter((x: any) => x.id !== text);
        const res: any = await DeleteSystemNote(id, newNotes)
        if (res.status === "error") {
            return dispatch(deleteNoteFail());
        }
        dispatch(deleteNoteSuccess())
        refresh(id)
        setAddNoteVisible(false)
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: `${item?.bookingReference} `,
            props: { message: 'Booking note deleted successfully' }
        });
    }


    const uploadFile = async () => {
        const previousFiles = item.files
        const options: any = {
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.9,
        }
        const result = await launchImageLibrary(options)
        const file = result?.assets[0]
        uploadFiles(file, previousFiles, id, refresh)
        refresh(id)
    }



    const deleteFile = async (url: any) => {
        console.log(item.files.length)
        dispatch(deleteFilePending())
        let newFiles = item?.files?.filter((item: any) => url !== item);
        console.log(newFiles.length)
        RemoveFile(id, url, newFiles);
        refresh(id)
        setViewFiles(false)
    }


    const checkPermission = async (url: string) => {

        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission

        const obj: { title: string, message: string } = {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
        }

        if (Platform.OS === 'ios') {
            downloadImage(url);
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    obj
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage(url);
                } else {
                    // If permission denied then show alert
                    Alert.alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };

    const getExtention = (filename: string) => {
        // To get the file extension
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };

    const downloadImage = (url: string) => {
        // Main function to download the image

        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        // Getting the extention of the file
        let ext: any = getExtention(url);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    ext,
                description: 'Image',
            },
        };
        config(options)
            .fetch('GET', url)
            .then(res => {
                // Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                Alert.alert('Image Downloaded Successfully.');
            });
    };



    const getAllTech = async () => {
        dispatch(getAllTechPending())
        const x: any = await fetchAllTechnician()
        if (x.data.status === "error") {
            dispatch(getAllTechFail())
        } else {
            dispatch(getAllTechSuccess())
            setTechData(x.data.paginatedResults)
        }
    }

    const techHandler = async (item: any) => {
        console.log("techHandler", item)
        dispatch(assignTechPending())
        const result: any = await assignTechnician(id, item);
        if (result.status === "error") {
            return dispatch(assignTechFail());
        }
        dispatch(assignTechSuccess())
    };

    const clearTechHandler = async () => {
        console.log("techHandler", item)
        dispatch(assignTechPending())
        const result: any = await clearAssignTechnician(id);
        if (result.status === "error") {
            return dispatch(assignTechFail());
        }
        dispatch(assignTechSuccess())
    };




    useEffect(() => {
        getAllTech()
    }, [])

    return (
        <>
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: Colors.spacing * 2 }}>
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Bold', }}>#{item.bookingReference}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', }}> - {date}</Text>
                            <View style={{ opacity: .5, backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Bold', }}>${quotePrice}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: Colors.spacing * 1.5, paddingHorizontal: Colors.spacing * 2, }}>
                        <SelectionCard phColor={Colors.black} data={scheduleData} type={'schedule'} placeholder={item.bookingStatus} onPress={statusHandler} loading={statusLoading} />
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, marginTop: Colors.spacing * 2, fontFamily: 'Outfit-Medium', }}>{new Date(item.bookingDate).toDateString()}</Text>
                        <View style={{ height: .35, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.borderColor }} />
                    </View>

                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>{item.firstName} {item.lastName}</Text>
                        <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', marginTop: Colors.spacing }}>{item.address1} {item.address2} {item.city} {item.postcode} {item.state.toUpperCase()}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * .5 }}>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{phoneNumber}</Text>
                            <View style={{ opacity: .5, backgroundColor: Colors.maidlyGrayText, width: 6, height: 6, marginHorizontal: Colors.spacing, borderRadius: 100, }} />
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{item.email}</Text>
                        </View>

                        <View style={{ marginVertical: Colors.spacing * 2, }}>

                            <AssignTech loading={assignTechLoading} clearTech={clearTechHandler} data={techData} onPress={techHandler} placeholder={item.assignedTech[0] ? `${item.assignedTech[0].firstName + " " + item.assignedTech[0].lastName}` : "Assign technician"} />


                        </View>
                        <MapCard address={`${item.address2} ${item.city} ${item.state} ${item.postcode} `} />

                        <View style={{ height: 2, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.borderColor }} />
                    </View>




                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                        <Pressable onPress={toggleDelete}>
                            <View style={[styles.buttonsFull]}>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'white', fontFamily: 'Outfit-Bold',
                                }}>Complete</Text>
                            </View>
                        </Pressable>

                        <Pressable onPress={toggleDelete}>
                            <View style={[styles.buttonsFull, { backgroundColor: Colors.red, }]}>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'white', fontFamily: 'Outfit-Bold',
                                }}>Delete</Text>
                            </View>
                        </Pressable>



                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                            <Pressable onPress={() => refresh(id)}>
                                <View style={[styles.buttonsHalf, { backgroundColor: Colors.red }]}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'white', fontFamily: 'Outfit-Bold',
                                    }}>Job buttons</Text>
                                </View>
                                <ShowToast />

                            </Pressable>


                            <Pressable>
                                <View style={[styles.buttonsHalf, {
                                    paddingHorizontal: Colors.spacing * 2,
                                    shadowRadius: 2,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: .2,
                                    elevation: 2, backgroundColor: 'white',
                                    borderColor: Colors.maidlyGrayText, borderWidth: .15
                                }]}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Bold',
                                    }}>Job save</Text>
                                </View>
                            </Pressable>
                        </View>

                        <View style={{ height: 2, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.borderColor }} />

                    </View>



                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>Job details</Text>

                            <Pressable onPress={() => setEditJobVisible(!editJobVisible)}>
                                <Text style={{ fontSize: 12, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Light', }}>Edit details</Text>
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>

                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Size</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{bd?.quantity} bd | {ba?.quantity} ba</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Service</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{item.service.charAt(0).toUpperCase() + item.service.slice(1)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Date</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{new Date(item.createdAt).toDateString()}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Time</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{item.startHour + ":" + item.startMin + " " + item.startMode} - {item.endHour + ":" + item.endMin + " " + item.endMode}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Address</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{item.address1} {item.address2} {item.city} {item.postcode} {item.state.toUpperCase()}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: Colors.spacing, marginBottom: Colors.spacing * .5 }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Add ons</Text>
                            <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', }}>


                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%', }}>

                                    {item.products.slice(2).map((x: any) => {
                                        if (x.quantity > 0) {
                                            return (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5, marginRight: Colors.spacing }}>
                                                    <View style={{ opacity: .5, backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginRight: Colors.spacing * .5, borderRadius: 100, }} />
                                                    <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{x.title} ({x.quantity})</Text>
                                                </View>
                                            )
                                        } else { null }

                                    })}

                                </View>

                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Notes</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{'Some notes'}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Assigned</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{'N/A'}</Text>
                        </View>
                        <View style={{ height: 2, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.borderColor }} />
                    </View>


                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                            <Pressable onPress={() => setAddNoteVisible(true)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <IconM name="text-box-plus" color={Colors.madidlyThemeBlue} size={20} />
                                    <Text style={{ fontSize: 16, marginLeft: Colors.spacing, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>Add note</Text>
                                </View>
                            </Pressable>

                            <View style={{ height: Colors.spacing * 4, width: 2, marginVertical: Colors.spacing * 1, backgroundColor: Colors.borderColor }} />

                            <Pressable onPress={uploadFile}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <IconM name="image-plus" color={Colors.madidlyThemeBlue} size={20} />
                                    <Text style={{ fontSize: 16, marginLeft: Colors.spacing, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>Add file</Text>
                                </View>
                            </Pressable>
                        </View>

                        <View style={{ height: 2, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.borderColor }} />

                    </View>

                    {item.notes.length > 0 &&
                        <View style={{ paddingHorizontal: Colors.spacing * 2, marginBottom: item.notes.length >= 0 ? Colors.spacing * 1 : Colors.spacing * 3 }}>
                            <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 1 }}>System notes</Text>
                            {item.notes.map((item) => ((<JobNotesCard by={item.by} key={item.id} onPress={deleteNotesHandler} id={item.id} text={item.text} date={item.addedDate} />)))}
                        </View>
                    }
                    <View style={{ paddingHorizontal: Colors.spacing * 2, marginBottom: Colors.spacing * 3 }}>
                        <ViewFiles onDelete={deleteFile} data={item.files} isOpen={viewFiles} onClose={() => setViewFiles(false)} onOpen={() => setViewFiles(true)} />
                    </View>

                    <View style={{ paddingHorizontal: Colors.spacing * 2 }}>
                        <Pressable onPress={checkListHandler}   >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>Checklist</Text>
                                <Icon name="chevron-forward" size={20} color={Colors.grayOne} />
                            </View>
                        </Pressable>


                        <View style={{ marginBottom: Colors.spacing * 4 }}>
                            <Checklist title="Checklist" onPress={checkListHandler} isOpen={checkListVisible} />
                        </View>
                        <AddNotes onClose={() => setAddNoteVisible(false)} onPress={addNotesHandler} isOpen={addNoteVisible} id={item.bookingReference} loading={notesLoading} />
                    </View>


                    <View style={{ paddingHorizontal: Colors.spacing * 2 }}>
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing }}>Timeline</Text>
                        {item.timelines.map((item) => <JobTimelineCard createdBy={item.createdBy} key={item.id} date={item.date} icon={item.icon} title={item.title} />)}
                    </View>

                </ScrollView>
                <AddJob isOpen={editJobVisible} onClose={() => setEditJobVisible(false)} lable={"Edit Booking"} id={id} />
                <DeleteModal id={id} phone={phoneNumber} price={quotePrice} animation="slide" quoteReference={item.bookingReference} customerName={item.firstName + " " + item.lastName} title="Delete Job" onClose={toggleDelete} isOpen={deleteOpen} onPress={deleteHandler} loading={deleteBooking} />
            </View>
            <ShowToast />
            {/* <SafeAreaView /> */}
        </>
    )
}

export default ViewJobModalComponent

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonsFull: {
        alignItems: "center",
        marginBottom: Colors.spacing * 1,
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 45 : 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },
    buttonsHalf: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 35 : 35,
        width: WIDTH * .43,
        borderRadius: Colors.spacing * Colors.spacing,
    },

})