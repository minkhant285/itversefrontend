import React from "react";

export const useFormInput = (initial: any) => {
    const [values, setValues] = React.useState(initial);

    const handleFormInputChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    return {
        values,
        handleFormInputChange,
    };
};
