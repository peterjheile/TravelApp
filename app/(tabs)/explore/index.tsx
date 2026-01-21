import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = React.useRef<MapView>(null);

  const initialRegion: Region = {
    latitude: 39.1653,
    longitude: -86.5264,
    latitudeDelta: 18,
    longitudeDelta: 18,
  };

  const recenter = () => {
    mapRef.current?.animateToRegion(initialRegion, 650);
  };

  React.useEffect(() => {
    // Optional: give it a slightly more “3D” feel on load (still a flat map)
    mapRef.current?.animateCamera(
      { pitch: 45, heading: 0, zoom: 6 },
      { duration: 650 }
    );
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={initialRegion}
        mapType="hybrid"      // same look on iOS + Android
        zoomEnabled
        scrollEnabled
        rotateEnabled
        pitchEnabled
      />

      {/* Floating button */}
      <View style={[styles.fabWrap, { bottom: 24 + Math.max(0, insets.bottom) }]}>
        <Pressable onPress={recenter} style={styles.fab} android_ripple={{ color: "#00000010" }}>
          <Text style={styles.fabText}>Recenter</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  fabWrap: {
    position: "absolute",
    right: 16,
  },
  fab: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    // elevation (Android)
    elevation: 8,
  },
  fabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
});