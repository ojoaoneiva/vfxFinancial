import { View, Text, FlatList, StyleSheet } from 'react-native';

const StockList = ({ stockData }) => {

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getLineBackgroundColor = (changePercent) => {
    return changePercent >= 0 ? '#95C969' : '#DF4043';
  };

  const renderItem = ({ item, index }) => {
    const { date, changePercent, high, low, open, close } = item;

    return (
      <View key={index} testID={`stock-list-item-${index}`} style={styles.item}>
        <View style={[styles.line, { backgroundColor: getLineBackgroundColor(changePercent) }]} />

        <View style={styles.details}>
          <Text style={styles.date} testID="date">{formatDate(date)}</Text>
          <Text style={{ color: changePercent >= 0 ? '#4C8C25' : '#DF4043', fontWeight: 'bold' }}>
            ({changePercent}%)
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>High</Text>
            <Text style={styles.number}>{high}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Low</Text>
            <Text style={styles.number}>{low}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>Open</Text>
            <Text style={styles.number}>{open}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Close</Text>
            <Text style={styles.number}>{close}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={stockData}
      renderItem={renderItem}
      keyExtractor={(item) => item.date}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9EEE8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 60,
    width: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80
  },
});

export default StockList;