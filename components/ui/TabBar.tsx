import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
};

const TAB_CONFIG = [
  { key: "explore", title: "Explore", iconFocused: "globe", iconUnfocused: "globe-outline" },
  { key: "trips", title: "Trips", iconFocused: "calendar", iconUnfocused: "calendar-outline" },
  { key: "profile", title: "Profile", iconFocused: "person", iconUnfocused: "person-outline" },
] as const;

function matchTab(routeName: string) {

  const exact = TAB_CONFIG.find((t) => t.key === routeName);
  if (exact) return exact;

  const fuzzy = TAB_CONFIG.find((t) => routeName.includes(t.key));
  if (fuzzy) return fuzzy;

  return {
    key: routeName,
    title: routeName,
    iconFocused: "ellipse",
    iconUnfocused: "ellipse-outline",
  } as const;
}

export function TabBar({ state, descriptors, navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 4 + Math.max(0, insets.bottom - 8),
        marginHorizontal: 12,
      }}
    >
      <View
        style={{
          height: 64,
          borderRadius: 20,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 10,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const tab = matchTab(route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          const color = isFocused ? "#111" : "#9AA0A6";
          const size = isFocused ? 22 : 20;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              style={{
                flex: 1,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center", gap: 4 }}>
                <Ionicons
                  name={(isFocused ? tab.iconFocused : tab.iconUnfocused) as any}
                  size={size}
                  color={color}
                />

                {isFocused ? (
                  <Text style={{ fontSize: 12, fontWeight: "600", color: "#111" }}>
                    {tab.title}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}