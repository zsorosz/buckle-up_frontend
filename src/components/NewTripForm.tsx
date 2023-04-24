import { useRef, useState } from "react";

function NewTripForm(): JSX.Element {
    const [destination, setDestination] = useState("");
    const destinationRef = useRef<HTMLInputElement>(null);

    function createPlan(e: React.FormEvent): void {
        e.preventDefault();
        setDestination(destinationRef.current!.value);
        destinationRef.current!.value = "";
    }
    
  return (
    <form onSubmit={createPlan}>
        <input type="text" placeholder="Destination" ref={destinationRef} />
        <button type="submit">Create a plan</button>
        <div>{destination}</div>
    </form>
  )
}

export default NewTripForm