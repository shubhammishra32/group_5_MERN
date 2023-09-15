import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function InternShipDetails(props) {
    const [formData, setFormData] = useState({
        image: '',
        title: '',
        descriptions: '',
        duration: '',
        skills: '',
        location: '',
        mentorName: ''
    })

    const history = useHistory();

    useEffect(() => {
        let u = localStorage.getItem('user');
        let employee = JSON.parse(u)
        if (!employee)
            history.push('login')
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { image, title, descriptions, duration, location, mentorName, skills } = formData
        if (!title || !descriptions || !duration || !location || !mentorName || !skills) {
            alert("Please fill all the fields")
        }
        else {
            try {
                await axios.post('http://localhost:9002/createinternship', formData);
                alert('Application submitted successfully');
                window.location.reload();
            } catch (error) {
                alert('Error in submitting the application.');
            }
        }
    };
    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="register" style={{ marginLeft: '480px' }}>
                <form onSubmit={handleSubmit}>
                    
                    Image Url <input type="text" className="form-control" placeholder='Image Url' value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} /> <br />
                    Title<input type="text" className="form-control" placeholder='Title' value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /> <br />
                    Descriptions<input type="text" className="form-control" placeholder='Descriptions' value={formData.descriptions} onChange={e => setFormData({ ...formData, descriptions: e.target.value })} /> <br />
                    Duration<input type="number" className="form-control" placeholder='Duration' value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} /> <br />
                    Skills<input type="text" className="form-control" placeholder='Skills' value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} /> <br />
                    Location<input type="text" className="form-control" placeholder='Location' value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} /> <br />
                    Mentor Name<input type="text" className="form-control" placeholder='Mentor Name' value={formData.mentorName} onChange={e => setFormData({ ...formData, mentorName: e.target.value })} /> <br />

                    <button className="btn btn-primary">Create Internship</button>
                </form>
            </div>
        </>
    );
}

export default InternShipDetails;
//https://static.javatpoint.com/blog/images/mern-stack.png