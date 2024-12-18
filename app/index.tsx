import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";
import { getUsersState } from "@/store/selectors/Users";
import { fetchUsers, setSelectedUser } from "@/store/reducers/Users";
// import { getBannersState } from "@/store/selectors/Banners";
// import { fetchBanners } from "@/store/reducers/Banners";
import { IUser } from "@/models/Users";
import Loading from "@/components/Loading";

const HomeScreen = () => {
  const dispatch = useDispatch();
  // const [activeIndex, setActiveIndex] = useState(0);

  const { users, isLoading } = useSelector(getUsersState);
  //  const { banners } = useSelector(getBannersState);

  const handleSelectUser = (user: IUser) => {
    dispatch(setSelectedUser(user));
    router.replace("/user");
  };

  /* useEffect(() => {
    if (banners.length) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]); */

  useEffect(() => {
    dispatch(fetchUsers());
    //  dispatch(fetchBanners());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>POPUST.BA</Text>
        <Text style={styles.bannerSubtitle}>Sve na jednom mjestu</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Odaberi omiljenu prodavnicu</Text>
        <Text style={styles.subtitle}>
          Pregledaj kataloge i pronađi popuste
        </Text>
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.buttonsContainer}>
          {users.map((user, index) => (
            <TouchableOpacity
              onPress={() => handleSelectUser(user)}
              key={`user-${user._id}-${index}`}
              style={styles.storeButton}
            >
              <Image source={{ uri: user.logo }} style={styles.storeLogo} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    alignItems: "center",
  },
  banner: {
    backgroundColor: "#ff6b6b",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  bannerSubtitle: {
    color: "white",
    fontSize: 14,
  },
  titleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
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
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navItem: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default HomeScreen;
