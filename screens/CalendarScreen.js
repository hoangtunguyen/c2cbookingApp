import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';


export default CalendarScreen = ({ navigation }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [listDate, setListDate] = useState(null);
    const DOLLAR_SIGN = '\u0024';

    // console.log(Moment(startDate).format('YYYY-MM-DD'));

    useEffect(() => {
        console.log(startDate + " | " + endDate);
        const obj = {};
        if (startDate != null) {
            obj["" + startDate] = { startingDay: true, color: 'green', textColor: 'white' };
        }
        if (endDate != null) {
            let temp = Moment(new Date(new Date(startDate).getTime() + 86400000)).format('YYYY-MM-DD');
            while (new Date(endDate) - new Date(temp) > 0) {
                obj["" + temp] = { color: 'green', textColor: 'white' };
                console.log(temp);

                temp = Moment(new Date(new Date(temp).getTime() + 86400000)).format('YYYY-MM-DD');
            }
            obj["" + endDate] = { endingDay: true, color: 'green', textColor: 'white' };
        }

        setListDate(obj);

    }, [startDate, endDate]);

    function press(date) {
        if (startDate == null) {
            setStartDate(date);
            setEndDate(date);
        } else {
            if (new Date(date) - new Date(startDate) > 0) {
                setEndDate(date);

            } else if (new Date(date) - new Date(startDate) == 0 && new Date(startDate) - new Date(endDate) == 0) {
                setStartDate(null);
                setEndDate(null);
            } else {
                setStartDate(date);
                setEndDate(date);
            }
        }
    };
    function longPress(date) {
        setStartDate(date);
        setEndDate(date);
    };
    function clearCalendar() {
        setStartDate(null);
        setEndDate(null);
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 120, backgroundColor: 'white', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack(null)}
                    >
                        <Icon name="long-arrow-left" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}
                        onPress={() => clearCalendar()}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "400", }}>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>Select Dates</Text>
                    <Text>Add your travel dates for exact pricing</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <CalendarList
                    // Initially visible month. Default = Date()
                    current={new Date()}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={new Date()}

                    // // Handler which gets executed on day press. Default = undefined
                    // onDayPress={(day) => { console.log('selected day', day) }}
                    // // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => longPress(day.dateString)}

                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}


                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={0}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={4}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={true}
                    // ...calendarParams
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => press(day.dateString)}
                    markedDates={{
                        ...listDate
                    }}
                    markingType={'period'}
                />
            </View>
            <View style={{ flexDirection: 'row', borderWidth: 0.4, height: 60, backgroundColor: 'white', alignItems: "center", justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>{DOLLAR_SIGN}10</Text>
                        <Text style={{ fontSize: 18 }}> /night</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20 }}> 210 $ in total </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: "#80b3ff", borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}
                >
                    <Text style={{ fontSize: 22, fontWeight: "400", }}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}