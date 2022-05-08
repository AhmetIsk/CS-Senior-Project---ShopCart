import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";

export default function MyLineChart({ data, chartConfig }) {
    console.log("this is the data", data);
    if (data !== []) {
        return (
            <ScrollView horizontal>
                <LineChart
                    data={data}
                    width={1800}
                    height={220}
                    chartConfig={chartConfig}
                />
            </ScrollView>
        )
    }

    return (
        <View />
    )

}

const styles = StyleSheet.create({})