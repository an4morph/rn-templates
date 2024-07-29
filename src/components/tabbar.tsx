import { View, Text, Pressable, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Dimensions } from 'react-native'

interface Props extends BottomTabBarProps {}

const EXCLUDE_ROUTE_NAMES = ['_sitemap', '+not-found']
const MARGIN_BOTTOM = 30
const MARGIN_X = 15
const FOOTER_HEIGHT = 60

export const MyTabBar = ({ state, descriptors, navigation }: Props) => {
  return (
    <View style={styles.container}>
      {state.routes
        .filter((route) => !EXCLUDE_ROUTE_NAMES.includes(route.name))
        .map((route, index) => {
          const { options } = descriptors[route.key]
          const { tabBarLabel, title, tabBarIcon, tabBarLabelPosition } = options
          const label = tabBarLabel || title || route.name
          const isFocused = state.index === index
          const icon = tabBarIcon && tabBarIcon({ focused: isFocused, size: 20, color: 'white' })

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          const tabStyles = getTabStyles({ isFocused, index, tabBarLabelPosition, hasIcon: !!icon })

          return (
            <Pressable key={route.key} onPress={onPress} style={tabStyles.tab}>
              {icon}
              <Text style={tabStyles.text}>{typeof label === 'string' ? label : route.name}</Text>
            </Pressable>
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: FOOTER_HEIGHT / 2,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    width: Dimensions.get('window').width - FOOTER_HEIGHT / 2,
    height: FOOTER_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: MARGIN_BOTTOM,
    left: MARGIN_X,
  },
})

const getTabStyles = ({
  isFocused,
  index,
  tabBarLabelPosition,
  hasIcon,
}: {
  isFocused: boolean
  index: number
  tabBarLabelPosition?: 'beside-icon' | 'below-icon'
  hasIcon: boolean
}) =>
  StyleSheet.create({
    tab: {
      backgroundColor: isFocused ? '#673ab7' : '#222',
      flex: 1,
      flexDirection: tabBarLabelPosition === 'below-icon' ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftWidth: index === 0 ? 0 : 1,
      borderLeftColor: 'white',
      paddingHorizontal: 10,
    },
    text: {
      color: 'white',
      marginLeft: hasIcon ? (tabBarLabelPosition === 'below-icon' ? 0 : 10) : 0,
    },
  })
