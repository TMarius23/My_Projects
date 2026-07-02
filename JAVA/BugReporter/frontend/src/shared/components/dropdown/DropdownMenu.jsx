import {useDismissibleLayer} from '@shared/hooks/useDismissibleLayer.js';
import './DropdownMenu.css';

function DropdownMenu({
                          className = '',
                          label,
                          triggerLabel,
                          isOpen,
                          onOpenChange,
                          onBeforeOpen,
                          disabled = false,
                          menuId,
                          align = 'right',
                          variant = 'pill',
                          children,
                      }) {
    const rootRef = useDismissibleLayer(isOpen, () => onOpenChange(false));

    function toggleMenu() {
        if (disabled) return;
        if (!isOpen) {
            onBeforeOpen?.();
        }
        onOpenChange(!isOpen);
    }

    return (
        <div
            className={[
                'dropdown-menu',
                `dropdown-menu--${variant}`,
                `dropdown-menu--${align}`,
                className,
            ].filter(Boolean).join(' ')}
            ref={rootRef}
        >
            {label && <span className="dropdown-menu__label">{label}</span>}
            <button
                type="button"
                className="dropdown-menu__trigger"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-controls={menuId}
                disabled={disabled}
                onClick={toggleMenu}
            >
                {triggerLabel}
                <span className="dropdown-menu__chevron" aria-hidden="true"/>
            </button>

            {isOpen && !disabled && (
                <div className="dropdown-menu__list" id={menuId} role="menu">
                    {children}
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
