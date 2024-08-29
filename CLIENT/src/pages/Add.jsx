import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Add.css'; // Import the CSS file

export default function Add() {
    const navigate = useNavigate();
    const [val, setVal] = useState({
        name: '',
        email: '',
        designation: '',
        salary: ''
    });

    const handlechange = (e) => {
        setVal((preval) => ({
            ...preval,
            [e.target.name]: e.target.value
        }));
    }

    const handleclick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/empl", val); // Pass the data to the backend
            navigate('/empl');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <> 
        <h2>Add New Data</h2>
        <form>
            <input
                type="text"
                name="name"
                value={val.name}
                onChange={handlechange}
                placeholder="Enter your name..."
            /><br /> 
            <input
                type="email"
                name="email"
                value={val.email}
                onChange={handlechange}
                placeholder="Enter your email..."
            /><br /> 
            <input
                type="text"
                name="designation"
                value={val.designation}
                onChange={handlechange}
                placeholder="Enter your designation..."
            /><br /> 
            <input
                type="text"
                name="salary"
                value={val.salary}
                onChange={handlechange}
                placeholder="Enter your salary..."
            /><br /> 
            <button onClick={handleclick} className="new-btn">Add</button>
        </form>
        </>
    );
}
