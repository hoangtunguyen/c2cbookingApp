import React, { useEffect, useState } from 'react';
const MILISECONDS_PER_DAY = 86400000;
export const countDays = (start, finish) => {
    if (start == null || finish == null) return 0;
    let duration = new Date(finish) - new Date(start);
    return (duration / MILISECONDS_PER_DAY) + 1;
}
export const baseURL = "http://192.168.1.7:8080";

export const calTotalPrice = (data) => {
    let increasingFee = data.guests > data.minGuests ? (data.guests - data.minGuests) * data.increasingPrice : 0 
    let total = (data.price + increasingFee) * data.countDays + data.serviceFee;
    return total;
}