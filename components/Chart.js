import React from "react";
import { View, StyleSheet } from "react-native";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import ListItem from "./ListItem";

function Chart({
  symbol,
  currentPrice,
  name,
  logoUrl,
  sparkline,
  priceChangePercentage7d,
}) {
  const updatedSparkline = sparkline.slice(0, 20);
  console.log("updatedSparkline", updatedSparkline);

  const data = [...updatedSparkline];
  return (
    <View style={styles.container}>
      <ListItem
        symbol={symbol}
        currentPrice={currentPrice}
        name={name}
        logoUrl={logoUrl}
        sparkline={sparkline}
        priceChangePercentage7d={priceChangePercentage7d}
      />
      <AreaChart
        style={{ height: 200 }}
        data={data}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
      ></AreaChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});

export default Chart;
