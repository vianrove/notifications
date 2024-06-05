import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification recieved");
        console.log(notification);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response recieved");
        console.log(response);
      }
    );

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  const scheduleReminderHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New reminder",
        body: "This is your new reminder",
        data: { userName: "Vic" },
      },
      trigger: {
        seconds: 3,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Schedule reminder" onPress={scheduleReminderHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
