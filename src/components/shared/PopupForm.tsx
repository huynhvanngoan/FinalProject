/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { Eye, Pencil, Plus } from "lucide-react";
import { Fields } from "@/types/fields";
import { PopupFormProps } from "@/types/popupform";
import useValidationSchema from "@/hooks/useValidationSchema";

const PopupForm: React.FC<PopupFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    fields,
    title,
    initialData,
    mode = "add",
    onEdit = null,
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const validationSchema = useValidationSchema(title?.split(" ").pop() || "");

    useEffect(() => {
        if (!isOpen) {
            setFormData({});
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialData && (mode === "edit" || mode === "view") && isOpen) {
            setFormData(initialData);
        }
    }, [initialData, mode, isOpen]);

    // Handle local state changes
    const handleLocalStateChange = (fieldName: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const renderField = (field: Fields, formik: any) => {
        const {
            name,
            label,
            type = "text",
            options = [],
            required = false,
            placeholder = "",
            icon,
            render = null,
        } = field;

        const isViewMode = mode === "view";
        const hasError = formik.touched[name] && formik.errors[name];

        // View mode with custom render function
        if (isViewMode && render) {
            return (
                <div className="grid gap-2" key={name}>
                    <Label className="text-sm font-medium">{label}</Label>
                    <div className="text-sm">
                        {render(
                            formData[name] || formik.values[name],
                            formData
                        )}
                    </div>
                </div>
            );
        }

        switch (type) {
            case "select":
                if (isViewMode) {
                    const selectedOption = options.find(
                        (opt) =>
                            opt.value ===
                            (formData[name] || formik.values[name])
                    );
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {selectedOption?.label || "-"}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Select
                            onValueChange={(value) => {
                                formik.setFieldValue(name, value);
                                handleLocalStateChange(name, value);
                            }}
                            value={formik.values[name] || ""}
                            onOpenChange={() =>
                                formik.setFieldTouched(name, true)
                            }
                        >
                            <SelectTrigger
                                className={hasError ? "border-red-500" : ""}
                            >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                    </div>
                );

            case "date":
                if (isViewMode) {
                    const value = formData[name] || formik.values[name];
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {value
                                    ? new Date(value).toLocaleDateString()
                                    : "-"}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Input
                            id={name}
                            type="date"
                            {...formik.getFieldProps(name)}
                            onChange={(e) => {
                                formik.handleChange(e);
                                handleLocalStateChange(name, e.target.value);
                            }}
                            className={hasError ? "border-red-500" : ""}
                        />
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                    </div>
                );
            case "file":
                if (isViewMode) {
                    const value = formData[name] || formik.values[name];
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {value ? (
                                    <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Input
                            id={name}
                            type="file"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    // Update formik and local state
                                    formik.setFieldValue(name, file);
                                    handleLocalStateChange(name, file);
                                }
                            }}
                            className={hasError ? "border-red-500" : ""}
                        />
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                    </div>
                );

            default:
                if (isViewMode) {
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {formData[name] || formik.values[name] || "-"}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <div className="relative">
                            {icon && (
                                <Icon
                                    icon={icon}
                                    className="absolute left-3 top-2.5 text-gray-500"
                                />
                            )}
                            <Input
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                {...formik.getFieldProps(name)}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handleLocalStateChange(
                                        name,
                                        e.target.value
                                    );
                                }}
                                className={`${icon ? "pl-10" : ""} ${
                                    hasError ? "border-red-500" : ""
                                }`}
                            />
                        </div>
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                    </div>
                );
        }
    };

    const renderIcon = () => {
        switch (mode) {
            case "edit":
                return <Pencil className="h-4 w-4" />;
            case "view":
                return <Eye className="h-4 w-4" />;
            default:
                return <Plus className="h-4 w-4" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader className="flex flex-row items-center gap-2">
                    {renderIcon()}
                    <DialogTitle>
                        {mode === "edit"
                            ? `Edit ${title}`
                            : mode === "view"
                            ? `View ${title}`
                            : title}
                    </DialogTitle>
                </DialogHeader>
                <Formik
                    initialValues={initialData || {}}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        onSubmit(values, mode as "add" | "edit");
                        resetForm();
                        setFormData({});
                        onClose();
                    }}
                    enableReinitialize
                >
                    {(formik) => (
                        <Form className="space-y-4">
                            {fields.map((field) => renderField(field, formik))}
                            <DialogFooter>
                                {mode === "view" && onEdit && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => onEdit(formData)}
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                )}
                                {mode !== "view" && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                formik.resetForm();
                                                setFormData({});
                                                onClose();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={
                                                !formik.isValid || !formik.dirty
                                            }
                                        >
                                            {mode === "edit"
                                                ? "Update"
                                                : "Save"}
                                        </Button>
                                    </>
                                )}
                                {mode === "view" && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                )}
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default PopupForm;
