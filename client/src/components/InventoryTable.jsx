import React, { useState, useEffect } from 'react';

const MedicalRecordTable = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const response = await fetch('/backend/medicalrecord/all');
                const data = await response.json();
                setMedicalRecords(data);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        };

        fetchMedicalRecords();
    }, []);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Record ID</th>
                        <th scope="col">Appointment ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {medicalRecords.map((record) => (
                        <tr key={record._id}>
                            <td>{record._id}</td>
                            <td>{record.appointmentId}</td>
                            <td>{record.createdAt}</td>
                            <td>{`${record.appointmentId.firstName} ${record.appointmentId.lastName}`}</td>
                            <td>
                                <button type="button" className="btn btn-primary-dashboard-action btn-sm">View</button>
                                <span> | </span>
                                <button type="button" className="btn btn-secondary-dashboard-action btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default MedicalRecordTable;
