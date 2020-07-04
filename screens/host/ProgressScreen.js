import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Moment from 'moment';
import { baseURL, dataFormat } from "../../util/Util";

export default ProgressScreen = () => {
    const screenHeight = Math.round(Dimensions.get('window').height);
    const [pickDate, setPickDate] = useState(Moment(new Date()).format('YYYY-MM-DD'));
    const [listBooking, setListBooking] = useState(null);
    async function getListBooking(ownerId, checkInDate) {
        try {
            const response = await fetch(baseURL + "/host/booking/listings?ownerId=" + ownerId + "&checkInDate=" + checkInDate);
            const data = await response.json();
            setListBooking(data);
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListBooking(1, pickDate);
    }, [])
    useEffect(() => {
        getListBooking(1, pickDate);
    }, [pickDate])
    return (
        <View style={{ height: screenHeight, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => console.log('press')}>
                <Calendar
                    current={pickDate}
                    markingType={'period'}
                    markedDates={{
                        '2020-06-11': { textColor: 'red' },
                        [pickDate]: { color: '#50cebb', textColor: 'white', dotColor: 'red', selected: true, marked: true, },
                    }}
                    onDayPress={(day) => { setPickDate(day.dateString) }}
                />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 20, backgroundColor: 'white', borderTopWidth: 0.5, paddingTop: 20 }}>
                {
                    listBooking != null && listBooking.length > 0 ?
                        listBooking.map((data, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        marginBottom: 20,
                                        backgroundColor: 'white', height: 170, shadowColor: "#000",
                                        paddingTop: 10,
                                        paddingHorizontal: 10,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.32,
                                        shadowRadius: 5.46,
                                        elevation: 9,
                                    }}>
                                    <Text style={{ fontSize: 18, }}>{data.roomResponse.name}</Text>
                                    <View style={{ borderTopWidth: 0.5, marginTop: 5, paddingTop: 5 }}>
                                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                            <Text style={{ fontSize: 18, color: '#50cebb', marginRight: 10 }}>Customer:</Text>
                                            <Text style={{ fontSize: 18 }}>Mr/Mrs {data.nameGuest}</Text>
                                        </View>
                                        <Text style={{ fontSize: 16 }}>{dataFormat(data.checkInDate)} - {dataFormat(data.checkOutDate)}   - {data.roomResponse.guestCount} guests</Text>
                                    </View>
                                </View>
                            )
                        })
                        :
                        <View>
                            <Text style={{fontSize: 24, textAlign: 'center', opacity: 0.6, fontStyle: 'italic'}}>Get no bookings</Text>
                        </View>
                }

            </View>
        </View>
    );
}