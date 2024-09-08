import { useState } from "react";
import Button from "./Button";

export default function LoadForm() {
    const [loadedData, setLoadedData] = useState({ imagePath: "" })
    const setFormData = (evt) => {

        setLoadedData(oldData => {
            return {
                ...oldData,
                [evt.target.name]: evt.target.value
            }
        })
    }

    const sendInformation = async (evt) => {
        evt.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/feed/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'Button clicked!', imagePath: loadedData.imagePath }), // Customize the data you want to send
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Assuming the server returns JSON
            console.log('Success:', data);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <>
            <form>
                <label htmlFor="imagePath">Image Path</label>
                <input
                    name="imagePath"
                    type="text"
                    id="imagePath"
                    value={loadedData.imagePath}
                    onChange={setFormData}
                ></input>
                <Button text={"OK"} clickHandler={sendInformation} />
            </form>

        </>
    )
}