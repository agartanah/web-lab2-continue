import { useAppContext } from "../contexts/Context";

export default function Backdrop() {
    const { backdrop, currOperation } = useAppContext();
    
    return (
        <div ref={ backdrop } className={ currOperation !== '' ? "backdrop backdrop-open" : "backdrop" }></div>
    );
}