import { TabBar } from "@/components/ui/TabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="explore/index" />
      <Tabs.Screen name="trips/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}