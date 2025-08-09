import React from "react";


const DashLine = ({size, width, bottom}) => {

    const styles = { 
        line: {
            width: width,
            border: `${size}px solid #00A924`,
            marginBottom: bottom,
            borderRadius:5
        },
    }

    return (
        <div style={styles.line}></div>
    )

};

export default DashLine;