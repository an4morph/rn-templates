import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {Dimensions} from 'react-native';

interface Props extends BottomTabBarProps {}

const EXCLUDE_ROUTE_NAMES = ['_sitemap', '+not-found']
const MARGIN_BOTTOM = 30
const MARGIN_X = 15
const FOOTER_HEIGHT = 60
const FOOTER_WIDTH = Dimensions.get('window').width - (MARGIN_X * 2)

export const MyTabBar = ({ state, descriptors, navigation }: Props) => {
  return (
    <View style={styles.container}>
      {state.routes
        .filter((route) => !EXCLUDE_ROUTE_NAMES.includes(route.name))
        .map((route, index, routes) => {
        const isLast = routes.length - 1 === index
        const isFirst = index === 0

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={tabStyles({ isFocused }).tab}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              {typeof label === 'string' ? label : route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: FOOTER_HEIGHT / 2,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    width: Dimensions.get('window').width - (FOOTER_HEIGHT / 2),
    height: FOOTER_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: MARGIN_BOTTOM,
    left: MARGIN_X,
  },
})

const tabStyles = ({ isFocused }: { isFocused: boolean }) => StyleSheet.create({
  tab: {
    backgroundColor: isFocused ? '#673ab7' : '#222',
    flex: 1,
    justifyContent: 'center',
  }
})