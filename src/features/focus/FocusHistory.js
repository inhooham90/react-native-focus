import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../util/size';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {

  return (
    <Text style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  )
}
export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }} >
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}> 
              Past Items
            </Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center'}}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View styles={styles.container}>
              <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
    backgroundColor: "#00000050",
    padding: spacing.sm,
  },
  historyItem: (status) => ({
    color: status > 1 ? "red":"green",
    fontSize: fontSizes.md
  }),
})