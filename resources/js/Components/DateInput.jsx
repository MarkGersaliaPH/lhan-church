import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateInput = ({className,onChange,value}) => {
    const [dateValue, setDateValue] = useState({
        // start_date: value ? new Date(value.start_date) : null,
        // end_date:  value ? new Date(value.end_date) : null,
        
        startDate: new Date(value.start_date), 
        endDate: new Date(value.end_date) 
    });
 
    const handleValueChange = (newValue) => {  
        setDateValue(newValue);
        onChange(newValue)
    };

    return <Datepicker 
    showFooter={true} 
     value={dateValue} 
     useRange={false} 
     displayFormat={"DD/MM/YYYY"} 
     onChange={handleValueChange}
    className={className}
    
readOnly={true} 
    eparator={"TO"} 
     />;
};
export default DateInput;
