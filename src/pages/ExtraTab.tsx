import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../assets/Colors'
import Header from '../../components/Header'
import AccordiaSearch from '../../components/SearchBox'
import { Calendar } from 'react-native-calendars'
import CN from '../../components/CalandarDatePicker'


const Notifications = ({ navigation }) => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');


  const marked = {
    minDate: { startingDay: true, color: '#50cebb', textColor: 'white' },
    maxDate: { endingDay: true, color: '#50cebb', textColor: 'white' },
  }

  return (
    <View>
      <SafeAreaView />
      <View style={{ paddingHorizontal: Colors.spacing * 2, backgroundColor: "white", }}>
        <Header nav={navigation} title="Notifications" />
        <View style={{ marginBottom: Colors.spacing * 1 }} />
        {/* <AccordiaSearch /> */}
        {/* <CN /> */}



        <View style={{}}>
          <Icon name="menu" size={28} color={Colors.grayOne} />
        </View>

      </View>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})