function SearchInput({
                         className,
                         value,
                         onChange,
                         placeholder,
                         ariaLabel,
                     }) {
    return (
        <label className={className}>
            <span aria-hidden="true"/>
            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                aria-label={ariaLabel}
            />
        </label>
    );
}

export default SearchInput;
