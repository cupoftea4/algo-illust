import { useRef } from "react";

const useFocus = () => {
    const inputFocus = useRef<HTMLInputElement>(null);
    const setFocus = () => { inputFocus.current && inputFocus.current?.focus() }
    return [inputFocus as React.RefObject<HTMLInputElement>, setFocus as () => void]
};

export default useFocus;