import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const root = createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <ChakraProvider value={defaultSystem}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
);
