import React, { useEffect, useState } from 'react';
import Moment from 'moment';

const MILISECONDS_PER_DAY = 86400000;
export const countDays = (start, finish) => {
    if (start == null || finish == null) return 0;
    let duration = new Date(finish) - new Date(start);
    return (duration / MILISECONDS_PER_DAY) + 1;
}
export const baseURL = "http://192.168.1.5:8080";

export const calTotalPrice = (data) => {
    let increasingFee = data.guests > data.minGuests ? (data.guests - data.minGuests) * data.increasingPrice : 0 
    let total = (data.price + increasingFee) * data.countDays + data.serviceFee;
    return total;
}
export const dataFormat = (date) => {
    let temp = Moment(new Date(new Date(date).getTime())).format('DD MMM');
    return temp;
};
export const DEFAULT_DATA_ROOM = {
    "id": 1,
    "name": "Le Conte Danang Mezzanine room 601",
    "categoryRoom": "Entire Apartment",
    "votedCount": 2,
    "rating": "4.5",
    "price": 26,
    "urlImage": "https://i.imgur.com/mkvxMaT.jpg"
};

export async function addOrDeleteFavorite(data, setResponse) {
    try {
        const response = await fetch(baseURL + '/room/addOrDeleteFavorite', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : data.title,
                roomId: data.roomId,
                userId : data.userId
            })
        });
        if(response.status == 200){
            const data = await response.json();
            setResponse(data.data == "added" ? true : false);
        }
    }
    catch (error) {
        console.error(error);
    }
};