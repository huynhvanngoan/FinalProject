
import validationSchemas from "@/utils/validation";
import { useMemo } from "react";
import * as Yup from "yup";
const useValidationSchema = (title: string) => {
    const validationSchema = useMemo(() => {
        return validationSchemas[title] || Yup.object().shape({}); 
    }, [title]);

    return validationSchema;
};

export default useValidationSchema;
