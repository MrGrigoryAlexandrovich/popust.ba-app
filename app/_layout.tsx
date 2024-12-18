import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useFonts } from "expo-font";
import { Stack, usePathname, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store/config";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const isHomeScreen = pathname === "/" || pathname === "/about";
  const isCatalogScreen = pathname === "/catalog";

  const headerContainerStyle: StyleProp<ViewStyle> = {
    ...styles.headerContainer,
    paddingTop:
      Platform.OS === "android" && !isHomeScreen
        ? Constants.statusBarHeight
        : 0,
  };

  const backButtonStyle: StyleProp<ViewStyle> = {
    ...styles.backButton,
    left: isCatalogScreen ? "95%" : 10,
    top: isCatalogScreen ? 16 : 0,
  };

  const containerStyle = {
    ...styles.container,
    backgroundColor: isCatalogScreen ? "#000" : "#ff6b6b",
  };

  const handleNavigateBack = () => {
    if (isCatalogScreen) {
      router.replace("/user");
    } else {
      router.replace("/");
    }
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={containerStyle}>
          <View style={headerContainerStyle}>
            {isHomeScreen ? null : (
              <TouchableOpacity
                onPress={() => handleNavigateBack()}
                style={backButtonStyle}
              >
                {isCatalogScreen ? (
                  <MaterialIcons name="close" size={28} color="white" />
                ) : (
                  <MaterialIcons name="arrow-back" size={28} color="white" />
                )}
              </TouchableOpacity>
            )}
          </View>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="not-found" />
          </Stack>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  headerContainer: {
    padding: 24,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    padding: 8,
    position: "absolute",
  },
});

export default RootLayout;
