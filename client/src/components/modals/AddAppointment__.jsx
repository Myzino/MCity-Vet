import React, { useState, useEffect } from 'react';

export default function AddAppointment() {
    const [technicians, setTechnicians] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        technician: '',
        firstName: '',
        lastName: '',
        address: '',
        landmark: '',
        email: '',
        typeOfAnimal: '',
        numberOfHeads: '',
        services: [],
        age: '',
        phoneNumber: '',
    });


    useEffect(() => {
        // Fetch the list of technicians from your API
        fetch('/backend/technician/all')
            .then((response) => response.json())
            .then((data) => {
                setTechnicians(data);
            })
            .catch((error) => {
                console.error('Error fetching technicians: ', error);
            });
    }, []);

    useEffect(() => {
        // Fetch the list of services from your API
        fetch('/backend/service/all')
            .then((response) => response.json())
            .then((data) => {
                setServices(data);
            })
            .catch((error) => {
                console.error('Error fetching services: ', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const appointmentData = {
            schedule: formData.date,
            technicianName: formData.technician,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phoneNumber,
            patient: {
                typeOfAnimal: formData.typeOfAnimal,
                numberOfHeads: formData.numberOfHeads,
                age: formData.age,
                services: [],
                address: formData.address,
                landmark: formData.landmark,
            },
        };

        try {
            const response = await fetch('/backend/appointment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Appointment created:', data);
                // You can reset the form or perform other actions after successful creation.
            } else {
                console.error('Error creating appointment:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    console.log('formData:', formData);
    const handleServiceChange = (event) => {
        const { id, checked } = event.target;

        setFormData((prevFormData) => {
            if (checked) {
                // If the checkbox is checked, add the service id to the array
                return {
                    ...prevFormData,
                    services: [...prevFormData.services, id],
                };
            } else {
                // If the checkbox is unchecked, remove the service id from the array
                return {
                    ...prevFormData,
                    services: prevFormData.services.filter((serviceId) => serviceId !== id),
                };
            }
        });
    };


    return (
        <div className="modal fade" id="addModal" tabIndex={-1}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Book Appointment</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form className="row g-3" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="technician" className="form-label">
                                    Technician Name and Schedule
                                </label>
                                <select
                                    id="technician"
                                    className="form-select"
                                    required
                                    value={formData.technician}
                                    onChange={handleInputChange}
                                >
                                    <option disabled value={''}>Choose...</option>
                                    {technicians.map((technician) => (
                                        <option key={technician._id} value={technician._id}>
                                            {technician.firstName} {technician.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="date" className="form-label">
                                    Date for your Appointment
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    required
                                    value={formData.date}
                                    onChange={handleInputChange}
                                />
                            </div>





                            <div className="col-md-3">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="1234 Main St"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="landmark" className="form-label">
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="landmark"
                                    placeholder="Juan's Store"
                                    value={formData.landmark}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="inputZip" className="form-label">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phoneNumber"
                                    placeholder='0912 345 6789'
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="typeOfAnimal" className="form-label">
                                    Animal Type
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="typeOfAnimal"
                                    value={formData.typeOfAnimal}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="typeOfAnimal" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="numberOfHeads" className="form-label">
                                    Number of Heads
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numberOfHeads"
                                    value={formData.numberOfHeads}
                                    onChange={handleInputChange}
                                />
                            </div>


                            <div className="col-md-3">
                                <button type="button" className="btn btn-outline-primary">
                                    Add More
                                </button>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="services" className="form-label">
                                    Services
                                </label>
                                {services.map((service) => (
                                    <div key={service._id} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={service._id}
                                            checked={formData.services.includes(service._id)}
                                            onChange={handleServiceChange}
                                        />
                                        <label className="form-check-label" htmlFor={service._id}>
                                            {service.serviceType}
                                        </label>
                                    </div>
                                ))}
                            </div>


                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}