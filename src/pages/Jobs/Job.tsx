import { ActivityIndicator, Dimensions, FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../assets/Colors'
import Header from '../../components/Header'


import JobCard from '../../components/JobCard'
import Filter from '../../components/Filter'



import { getAllJobFail, getAllJobPending, getAllJobSuccess } from '../../redux/jobSlice';
import { fetchAllJobs } from '../../config/JobApi';
import { useDispatch, useSelector } from 'react-redux'

import Donut from '../../components/Donut'
import QuoteBanner from '../../components/QuoteBanner'
import ProgressBar from '../../components/ProgressBar'
import ShowToast from '../../components/ShowToast'

const { width, height } = Dimensions.get('screen')
const isAndroid = Platform.OS == 'android' ? true : false




const Jobs = ({ navigation }) => {
  const [pageCount, setPageCount] = useState(1);
  const [data, setData] = useState([]);
  const refreshLoading = useSelector((state: any) => state.jobReducer.refreshLoading)
  const loadedData = useSelector((state: any) => state.jobReducer.jobData)
  const totalPages = useSelector((state: any) => state.jobReducer.totalPages)
  const [nextPage, setNextPage] = useState();

  const dispatch = useDispatch();



  const refreshHandler = async () => {
    dispatch(getAllJobPending('data'))
    const x: any = await fetchAllJobs(pageCount)
    if (x.data.status === "error") {
      return dispatch(getAllJobFail(x.data.status));
    }
    dispatch(getAllJobSuccess())
    setNextPage(x.data.next.page)
    pageCount <= 1 ? setData(x.data.paginatedResults) : setData([...data, ...x.data.paginatedResults])
  }


  useEffect(() => {
    refreshHandler()
  }, [pageCount])

  return (
    <>
      <View style={{ backgroundColor: Colors.madlyBGBlue, flex: 1 }}>
        <SafeAreaView />
        <Header nav={navigation} title="Quotes" route="quote" />




        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
          <View style={{ marginVertical: Colors.spacing * 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

            <View style={{ width: '35%', }}>
              {/* <Donut lable={"Total Quotes"} percentage={112} max={200} radius={40} /> */}
              <Donut lable={"Total Quotes"} percentage={120} max={400} radius={40} color={Colors.madidlyThemeBlue} />
            </View>
            <View style={{ width: '60%' }}>
              <QuoteBanner />
            </View>
          </View>
        </View>


        <Text style={{ color: 'red', fontSize: 14, fontWeight: isAndroid ? "900" : "700", }}>{"pagecount -" + pageCount + " - next -" + nextPage + " Bdata " + data.length}</Text>
      
        <View style={{ flex: 1 }}>

          <FlatList
            onEndReached={() => { nextPage > 0 && setPageCount(pageCount + 1) }}
            refreshing={refreshLoading}
            onRefresh={() => setPageCount(1)}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{ paddingBottom: Colors.spacing }}
            data={data}
            keyExtractor={item => item?._id}
            renderItem={({ item, index }) => <JobCard setPageCount={setPageCount} key={item?._id} item={item} index={index} refresh={() => setPageCount(1)} />}
          />

        </View>
      </View>
      <ShowToast />
    </>
  )
}

export default Jobs

const styles = StyleSheet.create({



})