import { Header } from './components/Header';
import { GlobalStyles } from './styles/GlobalStyles';
import { Orders } from './components/Orders';
export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
    </>
  );
}
