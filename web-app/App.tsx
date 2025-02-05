import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Login from "./components/Login";

const queryClient = new QueryClient();

const App = () =>{
    return (
        <QueryClientProvider client={queryClient}>
            <Login></Login>
        </QueryClientProvider>
    )
}

export default App
