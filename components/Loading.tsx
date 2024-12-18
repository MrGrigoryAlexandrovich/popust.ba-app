import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
