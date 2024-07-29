import { Tabs } from 'expo-router'
import { MyTabBar } from '../src/components/tabbar'
import { Foundation } from '@expo/vector-icons'

const MainLayout = (): JSX.Element => {
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home Page',
          tabBarLabel: 'Home',
          tabBarIcon: (props) => <Foundation name="home" {...props} />,
          tabBarLabelPosition: 'below-icon',
          tabBarBadge: '8',
        }}
      />
      <Tabs.Screen
        name="page1"
        options={{
          title: 'Fisrt',
        }}
      />
      <Tabs.Screen
        name="page2"
        options={{
          title: 'Second Page',
          tabBarIcon: (props) => <Foundation name="heart" {...props} />,
        }}
      />
    </Tabs>
  )
}

export default MainLayout
