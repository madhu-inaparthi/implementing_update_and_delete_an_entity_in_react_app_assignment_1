import React from 'react'
import axios from "axios";
import { useState } from "react";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const doorCard = ({door}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: door.name,
        status: door.status
    });
    async function handleEdit() {
        try {
            const response = await axios.put(`${API_URI}/${door.id}`, door);
            setIsEditing(true);
            alert("Item updated successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error editing door:", error);
            alert("Error editing door. Please try again later.");
        }
    }

    async function handleDelete() {
        try {
            await axios.delete(`${API_URI}/${door.id}`);
            alert("Item deleted successfully!");
        } catch (error) {
            console.error("Error deleting door:", error);
            alert("Error deleting door. Please try again later.");
        }
    }

    function handleChange(e){      
        const key = e.target.name;
        const value = e.target.value;
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
            await axios.put(`${API_URI}/${door.id}`, formData);
            setIsEditing(false);
            alert("Item updated successfully!");
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Error updating item. Please try again later.");
        }
    }

  return (
    <>
        {!isEditing ? (
            <div>
                <h3>Name: {door.name}</h3>
                <p>Status: {door.status}</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        ) : (
            <div>
                <form onSubmit={handleForm}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status: </label>
                        <input
                            type="text"
                            name="status"
                            id="status"
                            value={formData.status}
                            onChange={handleChange}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )}
    </>
  )
}

export default doorCard