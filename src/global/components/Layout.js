import React, {useState, useEffect} from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {useDispatch, useSelector} from 'react-redux';
import {setSiderDisplay, setBtnDisplay} from '../../slices/headerSlice'

const Layout = ({header, side, btn, footer, mode}) => {

    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 768;

    const dispatch = useDispatch();

    useEffect(()=>{
        if(isMobile){
            dispatch(setSiderDisplay(false))
            dispatch(setBtnDisplay(true));
        }else{
            dispatch(setSiderDisplay(side))
            dispatch(setBtnDisplay(btn));
        }
    }, []);

    return (
        <>
            {header && <Header mode={mode} />}
            <Outlet />
            {footer && <Footer />}
        </>
    )

};

export default Layout;