import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'

export default function MyPieChart({ data, chartConfig, accessor, width }) {
    const screenWidth = Dimensions.get("window").width;
    if (data !== [])
        return (
            <PieChart
                data={data}
                width={width || screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={accessor}
                backgroundColor={"transparent"}
                paddingLeft={15}
            // absolute
            />
        )
    return (
        <View />
    )
}

const styles = StyleSheet.create({})