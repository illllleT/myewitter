import { addDoc, collection } from "firebase/firestore";
import { dbService, firebaseInstance } from "fbase";
import { useState } from "react";

const Home = () => {
    const [jwick, setJwick] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(jwick);
        try {
            await addDoc(collection(dbService, "jwicks"), {text: jwick, createdAt: Date.now()});
            setJwick('');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setJwick('');
    };  
    
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setJwick(value);
    };

    return (
        <form onSubmit={onSubmit}>
            <input value={jwick} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Jwick" />
        </form>
    )
};

export default Home;