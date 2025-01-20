import Select from 'react-select'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? "1px solid var(--form-outline-focused)" : "1px solid var(--form-outline)",
        borderRadius: "var(--form-border-radius)",
        boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)" : "none",
        "&:hover": {
            border: "1px solid #007bff",
        },
        backgroundColor: "var(--form-bg)",
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999, // Ensures the dropdown menu appears above other elements
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "yellow"
            : state.isFocused
                ? "#e9ecef"
                : "white",
        color: state.isSelected ? "red" : "black",
        "&:hover": {
            backgroundColor: "#e9ecef",
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "var(--secondary-color)",
        color: "white",
        borderRadius: "2px",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: "white",
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: "white",
        "&:hover": {
            backgroundColor: "#d93f4b",
            color: "white",
        },
    }),
};

export default function DropdownMultiSelect(props) {
    return (
        <Select
            isMulti
            styles={customStyles}
            classNamePrefix={"custom-select"}
            {...props}
            closeMenuOnSelect={false}
        />
    );
};
