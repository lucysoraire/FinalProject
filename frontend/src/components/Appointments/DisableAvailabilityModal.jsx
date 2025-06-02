import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";

// Define la base URL de tu backend (puedes cambiarla fácilmente acá)
const API_BASE_URL = "http://localhost:3001/fisiosport";

const DisableAvailabilityModal = ({ show, onHide }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [disableFullDay, setDisableFullDay] = useState(true);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [blockings, setBlockings] = useState([]);

  useEffect(() => {
    if (show) {
      fetch(`${API_BASE_URL}/disable-availability`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar bloqueos");
          return res.json();
        })
        .then((data) => {
          setBlockings(data);
        })
        .catch((err) => {
          console.error("Error al cargar bloqueos:", err);
        });
    }
  }, [show]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const addBlocking = () => {
    if (!startDate) {
      alert("Debe seleccionar al menos una fecha de inicio");
      return;
    }

    const blocking = {
      startDate,
      endDate: endDate || startDate,
      disableFullDay,
      ...(disableFullDay ? {} : { startHour, endHour }),
    };

    setBlockings([...blockings, blocking]);

    // Limpiar inputs
    setStartDate("");
    setEndDate("");
    setDisableFullDay(true);
    setStartHour("");
    setEndHour("");
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async () => {
    if (blockings.length === 0) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE_URL}/disable-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockings),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los bloqueos");
      }

      setSuccess("Bloqueos guardados correctamente");

      // Recargar bloqueos guardados para actualizar la lista
      const savedBlockingsResponse = await fetch(`${API_BASE_URL}/disable-availability`);
      if (!savedBlockingsResponse.ok) {
        throw new Error("Error al recargar bloqueos guardados");
      }
      const savedBlockings = await savedBlockingsResponse.json();
      setBlockings(savedBlockings);

      // Limpiar inputs
      setStartDate("");
      setEndDate("");
      setDisableFullDay(true);
      setStartHour("");
      setEndHour("");

      // Opcional: cerrar modal después de guardar
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Configurar no disponibilidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Fecha inicio</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Fecha fin (opcional)</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Deshabilitar todo el día"
            checked={disableFullDay}
            onChange={() => setDisableFullDay(!disableFullDay)}
            className="my-3"
          />

          {!disableFullDay && (
            <>
              <Form.Group>
                <Form.Label>Hora de inicio</Form.Label>
                <Form.Control
                  type="time"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hora de fin</Form.Label>
                <Form.Control
                  type="time"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                />
              </Form.Group>
            </>
          )}

          <Button variant="secondary" className="mt-3" onClick={addBlocking} disabled={loading}>
            + Agregar bloqueo
          </Button>

          {blockings.length > 0 && (
            <div className="mt-4">
              <h5>Bloqueos agregados:</h5>
              <ul>
                {blockings.map((b, i) => (
                  <li key={i}>
                    Desde: {b.startDate} hasta: {b.endDate} —{" "}
                    {b.disableFullDay
                      ? "Todo el día"
                      : `Desde ${b.startHour} hasta ${b.endHour}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={blockings.length === 0 || loading}
        >
          {loading ? "Guardando..." : "Guardar todos los bloqueos"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisableAvailabilityModal;
