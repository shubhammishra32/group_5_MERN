import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CandidateDetails(props) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        experience: '',
        phoneNumber: 0,
        description: '',
        skills: '',
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
        const { description, email, experience, name, phoneNumber, position, skills } = formData
        if (!description || !email || !experience || !name || !phoneNumber || !position || !skills) {
            alert("Please fill all fields")
        }
        else {
            try {
                await axios.post('http://localhost:9002/applyform',
                    { ...formData, internshipId: props.data._id, status:"Pending" });
                alert('Application submitted successfully');
                //window.location.reload();
            } catch (error) {
                alert('Error in submitting the application.');
            }
        }
    };
    return (
        <div className="register" style={{ marginLeft: '480px' }}>
            <form onSubmit={handleSubmit} >
                Name<input type="text" className="form-control" placeholder='Name' value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /> <br />
                Email<input type="email" className="form-control" placeholder='Email' value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /> <br />
                Position<input required type="text" className="form-control" placeholder='Position' value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} /> <br />
                Experience<input type="text" className="form-control" placeholder='Experience' value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} /> <br />
                Phone Number<input type="number" className="form-control" placeholder='Phone Number' value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} /> <br />
                Description <input type="text" className="form-control" placeholder='Add a brief description about yourself..' value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} /> <br />
                Skills<input type="text" className="form-control" placeholder='Skills' value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} /> <br />
                <button className="btn btn-primary">Apply</button>
            </form>
        </div>
    );
}

export default CandidateDetails;
