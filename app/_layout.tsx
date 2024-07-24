import { Tabs } from "expo-router"

const MainLayout = (): JSX.Element => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="page1" />
      <Tabs.Screen name="page2" />
    </Tabs>
  )
}

export default MainLayout