import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Register from "./components/Register";

const root = createRoot(document.getElementById('root')!);
const queryClient = new QueryClient();
root.render(
    <Provider store={store}>
        <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
            </QueryClientProvider>
        </ChakraProvider>
    </Provider>
);
