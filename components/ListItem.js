import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const ListItem = ({
  symbol,
  currentPrice,
  name,
  logoUrl,
  sparkline,
  priceChangePercentage7d,
  onPress,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "green" : "red";
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.upperWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: logoUrl,
          }}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.lowerWrapper}>
        <Text style={styles.title}>
          ${currentPrice.toLocaleString("en-US")}
        </Text>
        <Text style={[styles.subtitle, { color: priceChangeColor }]}>
          {priceChangePercentage7d.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    fontsize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  upperWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    marginLeft: 8,
  },
  lowerWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

export default ListItem;
