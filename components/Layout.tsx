import React from 'react';
import { Header } from './Index';

const Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            { children }
        </>
    )
}

export default Layout
