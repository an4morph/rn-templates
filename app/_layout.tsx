import { Tabs } from "expo-router"
import { MyTabBar } from "../src/components/tabbar"

const MainLayout = (): JSX.Element => {
  return (
    <Tabs tabBar={props => <MyTabBar {...props}/>}>
      <Tabs.Screen name="index" options={{title: 'Home'}}/>
      <Tabs.Screen name="page1" options={{title: 'Fisrt'}}/>
      <Tabs.Screen name="page2" options={{title: 'Second'}}/>
    </Tabs>
  )
}

export default MainLayout