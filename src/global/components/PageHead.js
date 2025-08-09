import React from 'react'


const PageHead = ({title, marginTop=100, marginBottom=30}) => {

    const styles = {
        pageHead: {
            marginTop: marginTop,
            marginBottom: marginBottom
        },
        title: {
            color: '#555',
            fontSize:16, 
        }
    }

    return (
        <div style={styles.pageHead}>
            <h4 style={styles.title}>{title}</h4>
        </div>
    )
}

export default PageHead