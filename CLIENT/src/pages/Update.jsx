import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
 // Import the CSS file

export default function Update() {
    const navigate = useNavigate();
    const location = useLocation();

    const [val, setVal] = useState({
        name: '',
        email: '',
        designation: '',
        salary: ''
    });

    const empId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/empl/${empId}`);
                setVal({
                    name: response.data.name,
                    email: response.data.email,
                    designation: response.data.designation,
                    salary: response.data.salary
                });
            } catch (error) {
                console.log('Error fetching employee data:', error);
            }
        }
        fetchEmployee();
    }, [empId]);

    const handlechange = (e) => {
        setVal((preval) => ({
            ...preval,
            [e.target.name]: e.target.value
        }));
    }

    const handleclick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/empl/${empId}`, val);
            navigate('/empl');
        } catch (error) {
            console.log('Error updating employee data:', error);
        }
    }

    return (
        <>
            <h2>Updating Existing Employee Data</h2>
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
                <button onClick={handleclick} className="new-btn">Update</button>
            </form>
        </>
    )
}
