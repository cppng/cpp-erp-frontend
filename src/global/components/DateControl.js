import React, {useState, useEffect} from 'react';

const DateControl = ({date, setDate, show}) => {

    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);

    let clonedData = {...date};

    useEffect(()=>{
        getDays();
        getMonths();
        getYears();
    }, []);

    function getDays(){
        let data = [];
        for(let i = 1; i <= 31; i++){
            data.push(i);
        }
        setDays(data);
    }

    function getMonths(){
        const data = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        setMonths(data);
    }

    function getYears(){
        let data = []; const d = new Date(); const year = d.getFullYear();
        for(let i = year; i > (year-60); i--){
            data.push(i);
        }
        setYears(data);
    }

    function updateValue(type, val){
        if(type == "day"){ clonedData.day = val; }
        else if(type == "month"){ clonedData.month = val; }
        else if(type == "year"){ clonedData.year = val; }
        setDate(clonedData);
    }

    function itemStyles(type){
        let display = "block";
        if(type == "dd" && !show.day){ display = "none"; }
        if(type == "mm" && !show.month){ display = "none"; }
        if(type == "yy" && !show.year){ display = "none"; }
        return {
            display: display,
            flex: 1,
            marginRight: 10
        }
    }

    const styles = {
        container:{
            marginBottom: 20
        },
        body:{
            display: 'flex'
        },
        label:{
            color: "#999",
            marginBottom: 10,
            fontSize: 12,
            fontWeight: 500
        },
        info:{
            color: "#999",
            marginLeft: 5,
            fontSize: 12,
        },
        input:{
            outline: 'none',
            boxShadow: 'none',
            transition: 'none',
        }
    }

    return (
        <div style={styles.body}>
          
                <div style={itemStyles("dd")}>
                    <select value={date.day} onChange={e => updateValue('day', e.target.value)} style={styles.input} className="form-control form-control-sm">
                        <option key={-1} value=''>Select</option>
                        {days.map((itm, i) => (
                            <option key={i} value={itm}>{itm}</option>
                        ))}
                    </select>
                    <div style={styles.info}>Day</div>
                </div>
            
            <div style={itemStyles("mm")}>
                <select value={date.month} onChange={e => updateValue('month', e.target.value)} style={styles.input} className="form-control form-control-sm">
                    <option key={-1} value=''>Select</option>
                    {months.map((itm, i) => (
                        <option key={i} value={itm}>{itm}</option>
                    ))}
                </select>
                <div style={styles.info}>Month</div>
            </div>
            <div style={itemStyles("yy")}>
                <select value={date.year} onChange={e => updateValue('year', e.target.value)} style={styles.input} className="form-control form-control-sm">
                    <option key={-1} value=''>Select</option>
                    {years.map((itm, i) => (
                        <option key={i} value={itm}>{itm}</option>
                    ))}
                </select>
                <div style={styles.info}>Year</div>
            </div>
        </div>
    )    
}

export default DateControl;