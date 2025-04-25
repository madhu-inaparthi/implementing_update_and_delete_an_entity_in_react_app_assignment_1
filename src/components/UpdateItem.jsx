import axios from "axios";
import { useEffect, useState } from "react";
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;
import DoorCard from "./doorCard";

const UpdateItem = ({ item }) => {
    
    const [doors, setDoors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        status: ""
    });

    async function getData() {
        try {
            const response = await axios.get(API_URI);
            setDoors(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Error fetching data. Please try again later.");
        }
    }      
    

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;;
        setFormData({...formData, [key]: value });
    }

    async function handleForm(e){
        e.preventDefault();
        try {
            const {name, status} = formData;
            if(!name || !status) {
                alert("Please fill in all fields.");
                return;
            }
            await axios.post(API_URI, {formData});
            alert("Item added successfully!");
            getData();
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Error updating item. Please try again later.");
        }
    }

    useEffect(() => {
        getData();
    }
    , []);

    // your code here
    return (
        <div>
            {
                doors.map((ele) => (
                    <DoorCard key={ele.id} door={ele}/>
                ))
            }

            <div>
                <h3>Update Item</h3>
                <form action="" onSubmit={handleForm}>
                    <label htmlFor="name" value={formData.name} placeholder='Enter door name.....'>Name: </label>
                    <input type="text" name="name" id="name" onChange={handleChange}/>
                    <label htmlFor="status" value={formData.status} placeholder='Enter status.....' >Status: </label>
                    <input type="text" name="status" id="status" onChange={handleChange}/>
                    <button type="submit" >Update</button>
                </form>

            </div>
        </div>
    );
};

export default UpdateItem;