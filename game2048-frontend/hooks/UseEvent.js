import { useEffect } from 'react';

const useEvent = (event, handler, pasive = false) => {
    useEffect(() => {
        window.addEventListener(event, handler, pasive);

        return function cleanup() {
            window.removeEventListener(event, handler);
        };

    });

}

export default useEvent;