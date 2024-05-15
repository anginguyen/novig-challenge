import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Nav from './js/Nav';
import Content from './js/Content';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-5/6 mx-auto my-5 lg:w-full lg:my-0'>
        <Nav />
        <Content />
      </div>
    </QueryClientProvider>
  );
}

export default App;
