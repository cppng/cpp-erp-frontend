import React from "react";
import Loader from "react-js-loader";

const PageLoader = () => {

    const styles = {
        loaderWrapper: {
            textAlign:'center'
        },
        loader: {
           
        }
    }

    return (
        <div style={styles.loaderWrapper}>
        <Loader type="spinner-default" bgColor = "#009900" size={50} styles = {styles.loader} />
        </div>
    )

};

export default PageLoader;