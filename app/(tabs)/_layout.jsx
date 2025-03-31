import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components/TabBar"
import { StatusBar } from "expo-status-bar";

const TabLayout = () => {
  return (
    <>
    <StatusBar style="dark" backgroundColor= '#fff' translucent={false} />
    <Tabs 
      tabBar={props => <TabBar {...props}/>}
      screenOptions={{
        headerShown: false, // Hide the header
      }}
    >
      <Tabs.Screen name="index" options={{title: "notes"}} />
      <Tabs.Screen name="calendar" options={{title: "calendar"}} />
      <Tabs.Screen name="settings" options={{title: "settings"}} />
    </Tabs>
    </>
  )
};

export default TabLayout