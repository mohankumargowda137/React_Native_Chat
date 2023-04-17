import { MainNavigator } from "./src/navigations/mainNavigation/mainNavigator";
import { Wrapper } from "./src/utility/utilities";
import store from "./src/store/store"
import { Provider } from "react-redux";
import "expo-dev-client";

export default function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <MainNavigator />
      </Wrapper>
    </Provider>
  );
}
