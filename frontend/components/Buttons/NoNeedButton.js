/* eslint-disable react/prop-types */
import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import NoNeed from '../../assets/noNeed.svg';

export default function NoNeedButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <NoNeed />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})