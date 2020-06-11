import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Moment from 'moment';

export default ProgressScreen = () => {
    const [pickDate, setPickDate] = useState(Moment(new Date()).format('YYYY-MM-DD'));
    useEffect(()=>{
        console.log(pickDate)
    }, [])
    return (
        <View style={{ flex: 1 }}>

            <Calendar
                current={new Date()}
                markingType={'period'}
                markedDates={{
                    [pickDate]: { color: '#50cebb', textColor: 'white' },
                }}
                onDayPress={(day) => { setPickDate(day.dateString) }}
            />

        </View>
    );
}