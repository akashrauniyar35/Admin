import { View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
1

import DateTimePicker from '@react-native-community/datetimepicker';
import { quoteDatePickPending, quoteDatePickSuccess, quoteTimePickSuccess } from '../redux/addJobSlice';
import { useDispatch } from 'react-redux';
import { formatDate } from './dataConverters';

const DateTimePickerComponent = ({ datePicker, onDatePickerClose, timePicker, onTimePickerClose }) => {

    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date())

    const [time, setTime] = useState(new Date());
    function onDateSelected(event, value) {
        setDate(value);
        dispatch(quoteDatePickSuccess(value))
        onDatePickerClose
    };
    function onTimeSelected(event, value) {
        setTime(value);
        dispatch(quoteTimePickSuccess(value));
        onTimePickerClose
    };



    return (
        <View>
            {datePicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                // style={styleSheet.datePicker}
                />
            )}
            {timePicker && (
                <DateTimePicker
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onTimeSelected}
                // style={styleSheet.datePicker}
                />
            )}

        </View>
    )
}

export default DateTimePickerComponent