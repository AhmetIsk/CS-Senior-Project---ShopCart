/* eslint-disable react-hooks/exhaustive-deps */
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { commonStyles } from '../../commonStyles';
import { userToken } from '../../store/slices/token';
import { userService } from '../../services/userService';
import MyLineChart from './MyLineChart';
import MyPieChart from './MyPieChart';
import { colors } from '../../constants/styles';

export default function StatisticsScreen({ navigation }) {

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }

  const chartConfigTwo = {
    backgroundColor: `${colors.headerRed}`,
    backgroundGradientFrom: `${colors.blue}`,
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }
  const [loading, setLoading] = useState(false);
  const token = useSelector(userToken);
  const [categoricalQua, setCategoricalQua] = useState(null);
  const [percentageExp, setPercentageExp] = useState(null);
  const [percentageQua, setPercentageQua] = useState(null);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('15-days');
  const [lineData, setLineData] = useState([]);
  const [constant, setConstant] = useState(false);
  const [dataQuantity, setDataQuantity] = useState([]);
  const [isEmpty, setEmpty] = useState(true);
  const [nodata, setNodata] = useState(true);
  useEffect(() => {
    setLoading(true);
    userService.getStatistics(token).then((res) => {
      if (!constant) {
        const expenseObj = []; const priceObj = [];
        console.log("HERE", res.total_expenses['15-days']);
        if (res.total_expenses['15-days']) {
          Object.keys(res.total_expenses).forEach(key => {
            const randomColor = getRandomColor();
            expenseObj.push({
              name: key,
              price: res.total_expenses[key],
              color: randomColor,
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            });
          })
          setData(<MyPieChart
            data={expenseObj}
            chartConfig={chartConfig}
            accessor="price"
          />)
          setEmpty(false);
        }
        if (res.total_quantities['15-days']) {
          Object.keys(res.total_quantities).forEach(key => {
            const randomColor = getRandomColor();
            priceObj.push({
              name: key,
              quantity: res.total_quantities[key],
              color: randomColor,
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            });
          })
          setDataQuantity(<MyPieChart
            data={priceObj}
            chartConfig={chartConfig}
            accessor="quantity"
          />)
          setEmpty(false);
        }
        setConstant(true);
      }
      const labels = []; const dataset = [];
      Object.keys(res.categorical_expenses).forEach(key => {
        labels.push(key);
        dataset.push(res.categorical_expenses[key][selected]);
      });
      setLineData(
        <MyLineChart data={{
          labels,
          datasets: [{
            data: dataset,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
          ]
        }} chartConfig={chartConfig} />
      );

      const secondlabels = []; const seconddataset = [];
      Object.keys(res.categorical_quantities).forEach(key => {
        secondlabels.push(key);
        seconddataset.push(res.categorical_quantities[key][selected]);
      });
      setCategoricalQua(
        <MyLineChart data={{
          labels: secondlabels,
          datasets: [{
            data: seconddataset,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
          ]
        }} chartConfig={chartConfigTwo} />
      );
      const percentageExpenses = [];
      if (!Object.keys(res.percentage_categorical_expenses[selected].length === 0)) {
        Object.keys(res.percentage_categorical_expenses[selected]).forEach(key => {
          const randomColor = getRandomColor();
          percentageExpenses.push({
            name: key,
            percentage: res.percentage_categorical_expenses[selected][key],
            color: randomColor,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          });
        });
        setPercentageExp(
          <MyPieChart
            data={percentageExpenses}
            chartConfig={chartConfig}
            accessor="percentage"
          />
        );

        const percentageQuantities = [];
        Object.keys(res.percentage_categorical_quantities[selected]).forEach(key => {
          const randomColor = getRandomColor();
          percentageQuantities.push({
            name: key,
            percentage: res.percentage_categorical_quantities[selected][key],
            color: randomColor,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          });
        });
        setPercentageQua(
          <MyPieChart
            data={percentageQuantities}
            chartConfig={chartConfig}
            accessor="percentage"
          />
        );
        setNodata(false);
      }


    });
    setLoading(false);
  }, [selected]);
  console.log(data, dataQuantity);
  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.header, { justifyContent: 'center' }]}>
        <Text style={commonStyles.headerTitle}>My Statistics</Text>
        <Text style={{ width: 33 }} />
      </View>
      <ScrollView style={styles.centerItem}>
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            size="large" color={colors.orange}
          />
        ) : (
          <>
            {!isEmpty && (<><Text style={styles.header}>Total Cost of Your Total Expenses</Text>
              {data}
            </>)
            }
            {!isEmpty && (<><Text style={styles.header}>Total Quantitiy of Your Total Expenses</Text>
              {dataQuantity}
            </>)
            }
            <View style={styles.container}>
              <TouchableOpacity style={[styles.dateButton, selected === 'weekly' ? { backgroundColor: `${colors.buttonOrange}` } : {}]} onPress={() => setSelected('weekly')}><Text>Last Week</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.dateButton, selected === '15-days' ? { backgroundColor: `${colors.buttonOrange}` } : {}]} onPress={() => setSelected('15-days')}><Text>Last 15 Days</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.dateButton, selected === 'monthly' ? { backgroundColor: `${colors.buttonOrange}` } : {}]} onPress={() => setSelected('monthly')}><Text>Last Month</Text></TouchableOpacity>
            </View>
            <Text style={styles.header}>Cost of Your Expenses ({selected}): </Text>
            {lineData}
            <Text style={styles.header}>Quantity of Your Expenses ({selected}): </Text>
            {categoricalQua}
            {!nodata && <>
              <Text style={styles.header}>Category Percentage of Your Expenses' Cost ({selected}):</Text>
              {percentageExp}
              <Text style={styles.header}>Category Percentage of Your Expenses' Quantity ({selected}):</Text>
              {percentageQua}</>}
          </>)}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    flexDirection: 'row',
    padding: 8,
    width: '60%',
    marginBottom: 20
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: `${colors.shadowColor}`,
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 10
  },
  centerItem: {
    marginTop: '30%',
    marginBottom: '10%'
  },
  header: {
    color: `${colors.headerOrange}`,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20
  }
});
