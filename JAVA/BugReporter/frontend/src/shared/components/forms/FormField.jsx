import UserIcon from '@assets/icons/user.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import './FormField.css';

const ICONS = {
    user: UserIcon,
    lock: LockIcon,
};

function FormField({
                       id,
                       label,
                       type = 'text',
                       value,
                       onChange,
                       placeholder = '',
                       iconName,
                       monospacePlaceholder = false,
                       autoComplete,
                       rightSlot,
                       disabled = false,
                       required = false,
                   }) {
    const IconComponent = iconName ? ICONS[iconName] : null;

    const inputClassName = [
        'form-field__input',
        iconName ? 'form-field__input--with-icon' : '',
        monospacePlaceholder ? 'form-field__input--mono-placeholder' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="form-field">
            <div className="form-field__label-row">
                <label className="form-field__label" htmlFor={id}>
                    {label}
                </label>
                {rightSlot && <div className="form-field__label-aside">{rightSlot}</div>}
            </div>
            <div className="form-field__control">
                {IconComponent && (
                    <span className="form-field__icon" aria-hidden="true">
            <IconComponent width="16" height="16"/>
          </span>
                )}
                <input
                    id={id}
                    name={id}
                    type={type}
                    className={inputClassName}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    required={required}
                />
            </div>
        </div>
    );
}

export default FormField;
