import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import DangerButton from "./DangerButton";
import PrimaryButton from "./PrimaryButton";

function MetaDataInput({ value,onChange }) {
    let [metaData, setMetaData] = useState(
        value.length ? value : [{ key: "", description: "" }]
    );
    const addRow = () => {
        setMetaData([...metaData, { key: "", description: "" }]); 
    };
 
    const removeRow = (key) => {
        let newmetaData = metaData.filter((service, meta_key) => {
            return key != meta_key;
        });

        setMetaData(newmetaData);
    };

    const handleServiceChange = (key, e) => {
        let newmetaData = metaData.filter((service, meta_key) => {
            return key == meta_key;
        });
        newmetaData[0][e.target.name] = e.target.value;
        setMetaData([...metaData], newmetaData);
    };


    useEffect(()=>{
        onChange(metaData)
    },[metaData])

    return (
        <div>
            {metaData &&
                metaData.map((service, key) => (
                    <div className="grid md:grid-cols-3 w-full md:gap-4 items-center justify-between 	">
                        <FormInput
                            name="key"
                            label="Key"
                            value={service.key}
                            onChange={(e) => handleServiceChange(key, e)}
                            type="text"
                        />
                        <FormInput
                            name="description"
                            label="Description"
                            value={service.description}
                            onChange={(e) => handleServiceChange(key, e)} 
                            className="h-12"
                        />
                        <div>
                            {key != 0 && (
                                <DangerButton
                                    onClick={() => removeRow(key)}
                                    className="text-center "
                                >
                                    x
                                </DangerButton>
                            )}

                            {metaData.length == key + 1 && (
                                <PrimaryButton
                                    onClick={addRow}
                                    className="text-center ml-2"
                                >
                                    +
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default MetaDataInput;
