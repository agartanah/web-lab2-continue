import { useAppContext } from "../contexts/Context";

export default function Backdrop() {
    const { backdrop } = useAppContext();
    
    return (
        <div class="backdrop" ref={ backdrop }></div>
    );
}