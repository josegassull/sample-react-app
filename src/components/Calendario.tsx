import React, { useEffect, useState } from "react";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../styles/Calendario.css";

interface CalendarioProps {
  onDateChange: (date: string) => void;
}

const Calendario: React.FC<CalendarioProps> = ({ onDateChange }) => {
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    axios
      .get<string[]>("http://localhost:8080/events")
      .then((response) => {
        console.log("Fechas deshabilitadas recibidas:", response.data);
        setDisabledDates(response.data);
      })
      .catch((error) =>
        console.error("Error obteniendo las fechas de eventos:", error)
      );
  }, []);

  return (
    <div className="calendario-container">
      <h4 className="titulo">Seleccione una Fecha</h4>
      <Flatpickr
        className="flatpickr-input"
        options={{
          dateFormat: "Y-m-d",
          disable: disabledDates,
          minDate: "today",
        }}
        placeholder="Selecciona una fecha"
        onChange={(selectedDates: string | any[]) => {
          if (selectedDates.length > 0) {
            const selectedDate = selectedDates[0].toISOString().split("T")[0];
            onDateChange(selectedDate);
          }
        }}
      />
    </div>
  );
};

export default Calendario;
