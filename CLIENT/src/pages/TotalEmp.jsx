import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/TotalEmp.css';

export default function TotalEmp() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/empl");

                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                if (error.response) {
                    console.error('Server responded with:', error.response.status, error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            }
        }
        fetchData();
    }, []);


    const handledelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/empl/${id}`);

            setData(prevData => prevData.filter(employee => employee.id !== id));


        } catch (error) {
            console.error('Error deleting employee:', error.message);

        }
    };

    return (
        <div className="total-emp-container">
            <button>
                <Link to={'/add'}>Add New Data</Link>
            </button>
            <section className="postdata">
                <p>id</p>
                <p>name</p>
                <p>email</p>
                <p>designation</p>
                <p>salary</p>
                <p>action</p>
            </section>
            {data.map((Edata) => (
                <section className="data-row" key={Edata.id}>
                    <p>{Edata.id}</p>
                    <p>{Edata.name}</p>
                    <p>{Edata.email}</p>
                    <p>{Edata.designation}</p>
                    <p>{Edata.salary}</p>
                    <button><Link to={`/update/${Edata.id}`}>Edit</Link></button>
                    <button onClick={() => handledelete(Edata.id)}>Delete</button>
                </section>
            ))}
        </div>
    );
}
