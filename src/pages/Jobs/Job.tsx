import { ActivityIndicator, Dimensions, FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../assets/Colors'
import Header from '../../components/Header'


import JobCard from '../../components/JobCard'


import { getAllJobFail, getAllJobPending, getAllJobSuccess } from '../../redux/jobSlice';
import { fetchAllJobs } from '../../config/JobApi';
import { useDispatch, useSelector } from 'react-redux'
import NetInfo from "@react-native-community/netinfo";
import Donut from '../../components/Donut'
import QuoteBanner from '../../components/QuoteBanner'
import ShowToast from '../../components/ShowToast'



const Jobs = ({ navigation }: any) => {
  const [pageCount, setPageCount] = useState(1);
  const [data, setData] = useState<any>([]);
  const refreshLoading = useSelector((state: any) => state.jobReducer.refreshLoading)
  const [nextPage, setNextPage] = useState<any>();
  const dispatch = useDispatch();



  const refreshHandler = async () => {
    dispatch(getAllJobPending())
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
              <Donut lable={"Total Quotes"} percentage={120} max={400} radius={40} color={Colors.madidlyThemeBlue} />
            </View>
            <View style={{ width: '60%' }}>
              <QuoteBanner lable={"quotes"} />
            </View>
          </View>
        </View>

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
            renderItem={({ item, index }) => <JobCard setPageCount={setPageCount} key={item?._id} item={item} index={index} refresh={() => { setPageCount(1); refreshHandler() }} />}
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