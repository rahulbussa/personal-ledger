import React, {useRef, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native';
import {View} from 'react-native';
import {SegmentedButtons, List} from 'react-native-paper';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {VictoryPie} from 'victory-native';

const categoriesData = [
  {
    id: 1,
    name: 'House',
    icon: 'home',
    color: COLORS.yellow,
    expenses: [
      {
        id: 22,
        title: 'Groceries',
        total: 7000,
        status: 'pendingStatus',
      },
      {
        id: 23,
        title: 'Daily Milk',
        total: 3000,
        status: 'pendingStatus',
      },
      {
        id: 24,
        title: 'Daily Maid',
        total: 2300,
        status: 'paid',
      },
      {
        id: 25,
        title: 'Home Maintenance',
        total: 2750,
        status: 'paid',
      },
    ]
  },
  {
    id: 2,
    name: 'Fuel',
    icon: 'gas-pump',
    color: COLORS.lightBlue,
    expenses: [
      {
        id: 32,
        title: 'Bike Fuel',
        total: 1600,
      },
      {
        id: 33,
        title: 'Car Fuel',
        total: 2300,
      },
    ]
  },
  {
    id: 3,
    name: 'EMI',
    icon: 'piggy-bank',
    color: COLORS.emerald,
    expenses: [
      {
        id: 44,
        title: 'Home Loan',
        total: 54000,
      },
      {
        id: 45,
        title: 'Topup Loan',
        total: 20000,
      },
    ],
  },
  {
    id: 4,
    name: 'Recreation',
    icon: 'yin-yang',
    color: COLORS.secondary,
    expenses: [
      {
        id: 51,
        title: 'Internet',
        total: 1200,
      },
      {
        id: 52,
        title: 'Netflix',
        total: 200,
      },
    ],
  },
];

const Categories = () => {
  const categoryListHeightAnimationValue = React.useRef(
    new Animated.Value(115),
  ).current;

  const [viewmode, setViewmode] = useState('chart');
  const [selectedCategory, setSelectedCategory] = useState(null);

  function renderCategoryList() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            margin: 5,
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}
          onPress={() => setSelectedCategory(item)}>
          <Icon name={item.icon} size={20} color={item.color} />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.primary,
              ...FONTS.h5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );;
    };;

    return (
      <View style={{marginVertical: 20, paddingHorizontal: SIZES.padding - 5}}>
        <Animated.View style={{height: categoryListHeightAnimationValue}}>
          <FlatList
            data={categoriesData}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>
      </View>
    );;
  }

  function renderIncomingExpenses() {
    let allExpenses = selectedCategory ? selectedCategory.expenses : [];

    const renderItem = ({item, index}) => (
      <View
        style={{
          width: 250,
          marginRight: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding  : 0,
          borderRadius: SIZES.radius / 2,
          backgroundColor: COLORS.white,
          marginVertical: SIZES.radius,
          ...styles.shadow,
        }}>
        {/* Title */}
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: COLORS.lightGrey,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SIZES.base,
            }}>
            <Icon
              name={selectedCategory.icon}
              size={20}
              color={selectedCategory.color}
            />
          </View>
          <Text style={{...FONTS.h5, color: selectedCategory.color}}>
            {selectedCategory.name}
          </Text>
        </View>
        {/* expense description */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            marginBottom: SIZES.radius,
            marginLeft: SIZES.radius / 2,
          }}>
          <Text style={{...FONTS.h2}}>{item.title}</Text>
        </View>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomStartRadius: SIZES.radius / 2,
            borderBottomEndRadius: SIZES.radius / 2,
            backgroundColor: selectedCategory.color,
          }}>
          <Text>{item.total.toFixed(2)} INR</Text>
        </View>
      </View>
    );;

    return (
      <View>
        <View
          style={{padding: SIZES.padding, backgroundColor: COLORS.lightGrey1}}>
          <Text style={{...FONTS.h3, color: COLORS.primary}}>
            INCOMING EXPENSE
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.primary}}> Total</Text>
        </View>
        {allExpenses.length > 0 && (
          <FlatList
            data={allExpenses}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        {allExpenses.length === 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}>
            <Text style={{color: COLORS.primary, ...FONTS.h3}}>No Record</Text>
          </View>
        )}
      </View>
    );;
  }

  function processCategoryToDisplay() {
    let chartData = categoriesData.map(item => {
      let total = item.expenses.reduce((a, b) => a + (b.total || 0), 0);;
      return {
        name: item.name,
        y: total,
        expenseCount: item.expenses.length,
        color: item.color,
        id: item.id,
      };;
    });;

    let filterChartData = chartData.filter(a => a.y > 0);;

    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);;

    let finalChartData = filterChartData.map(item => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };;
    });

    return finalChartData;
  }

  function setSelectedCategoryByName(name) {
    console.log('in set selected category ', name);
    let category = categoriesData.filter(a => a.name == name);
    console.log('category:', category);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryToDisplay();
    let colorScales = chartData.map(item => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0), 0);
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: SIZES.padding,
        }}>
        <VictoryPie
          data={chartData}
          colorScale={colorScales}
          labels={datum => `${datum.y}`}
          radius={({datum}) =>
            selectedCategory && selectedCategory.name == datum.name
              ? SIZES.width * 0.4
              : SIZES.width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({innerRadius}) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: {fill: COLORS.white},
            parent: {...styles.shadow},
          }}
          width={SIZES.width * 0.8}
          height={SIZES.width * 0.8}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: props => {
                        console.log('in mutation', props.index);
                        let categoryName = chartData[props.index].name;
                        console.log('categoryName:', categoryName);
                        setSelectedCategoryByName(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
        <View style={{position: 'absolute', top: '42%', left: '40%'}}>
          <Text style={{...FONTS.h2, textAlign: 'center'}}>
            {totalExpenseCount}
          </Text>
          <Text style={{...FONTS.body3, textAlign: 'center'}}>Expenses</Text>
        </View>
      </View>
    );;
  }

  function renderExpenseSummary() {
    let data = processCategoryToDisplay();

    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 40,
            paddingHorizontal: SIZES.radius,
            borderRadius: 10,
            backgroundColor:
              selectedCategory && selectedCategory.name == item.name
                ? item.color
                : COLORS.white,
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: COLORS.white,
                borderRadius: 5,
              }}></View>
            <Text style={{marginLeft: SIZES.base, ...FONTS.h5}}>
              {item.name}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLORS.white, ...FONTS.body2}}>
              {item.y} RS - {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      );;
    };;

    return (
      <View style={{padding: SIZES.padding}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );;
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h3}}>Categories</Text>
          <Text style={{color: COLORS.darkGrey, ...FONTS.body4}}>
            {categoriesData.length} Total
          </Text>
        </View>
        <View style={{alignItems: 'center', width: '40%'}}>
          <SegmentedButtons
            value={viewmode}
            onValueChange={setViewmode}
            density="small"
            buttons={[
              {
                value: 'chart',
                label: '',
                icon: 'chart-bar',
              },
              {
                value: 'list',
                label: '',
                icon: 'format-list-checkbox',
              },
            ]}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        {viewmode == 'list' && (
          <View>
            {renderCategoryList()}
            {renderIncomingExpenses()}
          </View>
        )}
        {viewmode == 'chart' && (
          <View>
            {renderChart()}
            {renderExpenseSummary()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default Categories;
