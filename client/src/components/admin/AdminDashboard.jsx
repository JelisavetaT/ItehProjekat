import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [chartOneData, setChartOneData] = useState({});
  const [chartTwoData, setChartTwoData] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationRes = await axios.get(
        'http://localhost:8000/api/reservations'
      );
      setReservations(reservationRes.data);
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const calculateChartData = () => {
      let incomeDataCreated = Array(12).fill(0);
      let incomeDataReserved = Array(12).fill(0);

      reservations?.forEach((reservation) => {
        let createdAt = new Date(reservation.createdAt);
        incomeDataCreated[createdAt.getMonth()] += reservation.price;
        let reservedFor = new Date(reservation.startDate);
        incomeDataReserved[reservedFor.getMonth()] += reservation.price;
      });

      const createdResByMonth = {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Reservations made by month in $',
            data: incomeDataCreated,
            backgroundColor: ['#50AF95'],
            borderWidth: 1,
          },
        ],
      };
      setChartOneData(createdResByMonth);

      const startedResByMonth = {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Reservations starting by month in $',
            data: incomeDataReserved,
            backgroundColor: ['#50AF95'],
            borderWidth: 1,
          },
        ],
      };
      setChartTwoData(startedResByMonth);
    };

    if (reservations?.length > 0) {
      calculateChartData();
    }
  }, [reservations]);

  return (
    <div className='my-auto mt-6'>
      <div className='m-auto w-[700px]'>
        <h2>Reservations Made by Month</h2>
        {chartOneData && chartOneData.labels ? (
          <Bar data={chartOneData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='m-auto w-[700px]'>
        <h2>Reservations Starting by Month</h2>
        {chartTwoData && chartTwoData.labels ? (
          <Bar data={chartTwoData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
