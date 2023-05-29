import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
    if (typeof document === 'undefined') return null;
    return ReactDOM.createPortal(
        children,
        document.getElementById('__next') as Element | DocumentFragment
    );
};

export default Portal;
