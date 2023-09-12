import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


export default function MentorHomePage(props) {
    const history = useHistory()


    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState('')
    const [data, setData] = useState([]);

    const handleClose = () => setShow(false);


    const loadData = async () => {                         
        const response = await axios.get(
        "http://localhost:9002/getinternship");     
        console.log(response)         
        setData(response.data.data);              
    }     

    useEffect(() => {            
        loadData();
    }, []);

    console.log(data);

    function handleShow(mData) {
        setModalData(mData)
        setShow(true);
    }

    const showList = () => {
        history.push('/list');        
        window.location.reload();
    }

    // const data = [
    //     {
    //         id: "p1",
    //         appliedBy: "Satyam",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months',
    //         location: 'Pune, IN'
    //     }, {
    //         id: "p1",
    //         appliedBy: "Shubham",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months',
    //         location: 'Pune, IN'
    //     },
    //     {
    //         id: "p1",
    //         appliedBy: "Pradumn",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/csharp/images/c-sharp.png',
    //         duration: '2 months',
    //         location: 'Bangalore, IN'

    //     }, {
    //         id: "p1",
    //         appliedBy: "Shashank",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months',
    //         location: 'Noida, IN'
    //     }, {
    //         id: "p1",
    //         appliedBy: "Prem",
    //         name: 'Pradumn Kumar',
    //         title: 'MERN4',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2months'
    //     }, {
    //         id: "p1",
    //         appliedBy: "Satyam",
    //         name: 'Pradumn Kumar',
    //         title: 'MERN5',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months'
    //     }, {
    //         id: "p1",
    //         name: 'Pradumn Kumar',
    //         title: 'MERN6',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months'
    //     },
    //     {
    //         id: "p2",
    //         name: 'Pavan Kumar',
    //         title: 'JAVA',
    //         description: 'Interested in this Java internship oppourtunity..',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months'
    //     },
    //     {
    //         id: "p3",
    //         name: 'Shashank',
    //         title: 'C#',
    //         description: 'Interested in this C# internship oppourtunity..',
    //         imageUrl: 'https://static.javatpoint.com/csharp/images/c-sharp.png',
    //         duration: '2 months'
    //     },

    // ]

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>


{console.log()}
            <div className="container text-center">
                <div className="row" style={{ marginTop: "66px" }}>
                    <h4>List of Avaialable Internships</h4>

                    {
                        data?.map(e => {
                            return (
                                <div className="col" style={{ backgroundColor: 'rgb(202 158 229)', paddingTop: '20px' }}>
                                    <div onClick={showList} className="card" style={{ width: '18rem', marginBottom: '34px' }}>
                                        <img src={e.image} className="card-img-top" alt="skill required" style={{ height: "103px" }} />
                                        <div className="card-body">
                                            <p className="card-text"><b>Profile</b> {e.title}</p>
                                            {/* <p className="card-text"><b>Applied By</b> {e.appliedBy}</p> */}
                                            <p className="card-text"><b>Skills Required</b>: {e.skills}</p>
                                            <p className="card-text"><b>Duration</b>: {e.duration}</p>
                                            <p className="card-text"><b>Location</b>: {e.location}</p>
                                            <p className="card-text"><b>Total Applied By</b>: {e.applied.length}</p>

                                            <a href="#" className="btn btn-primary" onClick={() => { handleShow(e); }}>More Details...</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Intenship Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="card-text"><b>Profile</b> {modalData.title}</p>
                    <p className="card-text"><b>Applied By</b> {modalData.appliedBy}</p>
                    <p className="card-text"><b>Skills Required</b>: {modalData.skills}</p>
                    <p className="card-text"><b>Duration</b>: {modalData.duration}</p>
                    <p className="card-text"><b>Location</b>: {modalData.location}</p>
                    <p className="card-text"><b>Descriptions</b>: {modalData.descriptions}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Reject
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

//name email status form(accept,reject,) more...
//pending, accept, reject