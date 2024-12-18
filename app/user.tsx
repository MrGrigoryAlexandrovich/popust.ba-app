import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { getUsersState } from "@/store/selectors/Users";
import {
  fetchCatalogs,
  resetCatalogs,
  setSelectedCatalog,
} from "@/store/reducers/Catalogs";
import { resetSelectedUser } from "@/store/reducers/Users";
import { getCatalogsState } from "@/store/selectors/Catalogs";
import { ThemedView } from "@/components/ThemedView";
import { ICatalog } from "@/models/Catalogs";

const UserScreen = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(getUsersState);
  const { catalogs, isLoading } = useSelector(getCatalogsState);

  const handleSelectCatalog = (catalog: ICatalog) => {
    router.replace("/catalog");
    dispatch(setSelectedCatalog(catalog));
  };

  useEffect(() => {
    if (selectedUser) {
      console.log(selectedUser);
      dispatch(fetchCatalogs(selectedUser?._id));
    }
    return () => {
      dispatch(resetCatalogs());
    };
  }, [selectedUser]);

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Aktuelni {selectedUser?.title} katalozi</Text>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.buttonsContainer}>
          {catalogs.map((catalog, index) => (
            <TouchableOpacity
              onPress={() => handleSelectCatalog(catalog)}
              key={`catalog-${catalog._id}-${index}`}
              style={styles.storeButton}
            >
              <Image
                source={{ uri: catalog.images[0] }}
                style={styles.storeLogo}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  storeButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  storeLogo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});

export default UserScreen;
