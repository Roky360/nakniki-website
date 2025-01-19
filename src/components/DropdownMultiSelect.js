import Select from 'react-select'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? "2px solid #007bff" : "1px solid #ced4da",
        borderRadius: "0.25rem",
        boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)" : "none",
        "&:hover": {
            border: "1px solid #007bff",
        },
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999, // Ensures the dropdown menu appears above other elements
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "#007bff"
            : state.isFocused
                ? "#e9ecef"
                : "white",
        color: state.isSelected ? "white" : "black",
        "&:hover": {
            backgroundColor: "#e9ecef",
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#007bff",
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
            backgroundColor: "#0056b3",
            color: "white",
        },
    }),
};

export default function DropdownMultiSelect(props) {
    return (
        <Select
            isMulti
            // styles={customStyles}
            classNamePrefix={"custom-select"}
            {...props}
            closeMenuOnSelect={false}
        />
    );
};
