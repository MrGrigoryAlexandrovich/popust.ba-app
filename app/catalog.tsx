import React, { useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
  ListRenderItemInfo,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
} from "react-native";
import { useSelector } from "react-redux";
import { getCatalogsState } from "@/store/selectors/Catalogs";

interface ViewableItemsChanged {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const Catalog = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const windowWidth = Dimensions.get("window").width;
  const { selectedCatalog } = useSelector(getCatalogsState);

  const onViewableItemsChanged = ({ viewableItems }: ViewableItemsChanged) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 50,
  });

  const viewabilityConfigCallbackPairs = useRef<
    ViewabilityConfigCallbackPair[]
  >([
    {
      viewabilityConfig: viewabilityConfig.current,
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]);

  const renderImage = ({ item, index }: ListRenderItemInfo<string>) => {
    return (
      <View style={[styles.imageContainer, { width: windowWidth }]}>
        <Image
          source={{ uri: item }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        data={selectedCatalog?.images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
        initialScrollIndex={0}
      />

      <View style={styles.pagination}>
        {selectedCatalog?.images.map((_, index: number) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? "#000" : "#888" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Catalog;
