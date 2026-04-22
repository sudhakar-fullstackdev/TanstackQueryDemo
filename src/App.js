import { useCallback, useState } from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query';

function App() {
  console.log("redrawing.....")
  const [count, setCount] = useState(0);

  const { data: products = [], isError, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      console.log("products fetched....")
      return response.json()
    },
    staleTime: 1000 * 60 * 1, // 1min
    refetchInterval: 1000*60*2,
  });

  if (isLoading) return <div>loadin data ...</div>
  if (isError) return <div> there is an error ...</div>
  return (
    <div className="App">
      <button onClick={() => setCount(prev => prev + 1)}> Click Here </button>
      <h1>Counter: {count}</h1>
      <h1> products </h1>
      <ul className='product-list'>
        {products.map(product => <li className='li' key={product.id}>{product.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
