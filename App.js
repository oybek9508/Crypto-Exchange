import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import ListItem from "./components/ListItem";
import { getMarketData } from "./services/cryptoService";
import RBSheet from "react-native-raw-bottom-sheet";
import Chart from "./components/Chart";
const HeaderComponent = () => (
  <View>
    <Text style={styles.title}>Markets</Text>
    <View style={styles.devider} />
  </View>
);

const YourOwnComponent = () => (
  <View>
    <Text>I am Open</Text>
  </View>
);
export default function App() {
  const refRBSheet = useRef();
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getMarketData();
      setData(fetchedData);
    };
    fetchData();
  }, []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    refRBSheet.current.open();
  };
  return (
    <SafeAreaView style={styles.container}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        styles={{
          bottomSheet: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
        }}
      >
        {selectedCoinData ? (
          <Chart
            symbol={selectedCoinData.symbol}
            currentPrice={selectedCoinData.current_price}
            name={selectedCoinData.name}
            logoUrl={selectedCoinData.image}
            sparkline={selectedCoinData.sparkline_in_7d.price}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
          />
        ) : null}
      </RBSheet>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => {
          return (
            <ListItem
              symbol={item.symbol}
              currentPrice={item.current_price}
              name={item.name}
              logoUrl={item.image}
              sparkline={item.sparkline_in_7d.price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              onPress={() => openModal(item)}
            />
          );
        }}
        ListHeaderComponent={<HeaderComponent />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  devider: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    color: "#A9ABB1",
    marginTop: 15,
  },
});
