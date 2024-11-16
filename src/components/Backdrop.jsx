import { useAppContext } from "../contexts/TaskManagerContext";

export default function Backdrop() {
    const { currOperation } = useAppContext();
    
    return (
        <div className={ currOperation !== '' ? "backdrop backdrop-open" : "backdrop" }></div>
    );
}