import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePatientInfo,
  filterByDNIOrEmail,
} from "../../Redux/Actions/Actions";
import "./Patients.css";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import EditPatient from "../../modals/EditPatient/EditPatient";
import EditMedicalHistory from "../../modals/EditMedicalHistory/EditMedicalHistory";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import Swal from "sweetalert2";

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);

  const [modalEditPatientShow, setModalEditPatientShow] = useState(false);
  const [modalMedicalHistoryShow, setMedicalHistoryShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Nuevo estado para filtros
  const [filters, setFilters] = useState({ dni: "", email: "" });

  const handleEditClick = (patient, column) => {
    setSelectedPatient(patient);
    if (column === "medicalHistory") setMedicalHistoryShow(true);
    if (column === "editPatient") setModalEditPatientShow(true);
    if (column === "deletePatient") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "¿Estas seguro?",
          text: "Esta acción no se puede deshacer!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, Eliminar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "El paciente fue eliminado.",
              icon: "success",
            });
            dispatch(deletePatientInfo(patient.id_patient));
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "El paciente no se eliminó :)",
              icon: "error",
            });
          }
        });
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id_patient",
      },
      {
        Header: "DNI",
        accessor: "dni",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Apellido",
        accessor: "lastname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Teléfono",
        accessor: "phone",
      },
      {
        Header: "Historial Médico",
        accessor: "historial_medico",
        Cell: ({ row }) => (
          <button
            onClick={() => handleEditClick(row.original, "medicalHistory")}
            className="buttonViewMedicalHistory"
          >
            Ver
          </button>
        ),
      },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="containerButtonsActions">
            <button onClick={() => handleEditClick(row.original, "editPatient")}>
              <IoIosSettings className="iconActionEdit" />
            </button>
            <button onClick={() => handleEditClick(row.original, "deletePatient")}>
              <IoMdCloseCircle className="iconActionDelete" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => patients, [patients]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    usePagination
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    dispatch(
      filterByDNIOrEmail({
        stateName: "patients",
        stateNameToFilter: "patientsToFilter",
        filters: newFilters, // PASAMOS TODO EL OBJETO filters
      })
    );
    gotoPage(0);
  };

  return (
    <div className="containerPatients">
      <div className="titlePatients">
        <p>Pacientes</p>
      </div>
      <div className="containerFilterPatients">
        <p className="buscar">Buscar por:</p>
        <input
          type="text"
          name="dni"
          value={filters.dni}
          onChange={handleFilterChange}
          placeholder="DNI"
        />
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          placeholder="Email"
        />
      </div>
      <div className="containerTablePatients">
        <table {...getTableProps()} className="table">
          <thead className="thead">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      data-label={cell.column.Header}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="containerOptionsNavigation">
          <div className="containerButtonsNavigation">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="buttonsArrowsPage"
            >
              <MdKeyboardDoubleArrowLeft className="arrowIcon" />
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="buttonNavigationPage"
            >
              Anterior
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="buttonNavigationPage"
            >
              Siguiente
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="buttonsArrowsPage"
            >
              <MdKeyboardDoubleArrowRight className="arrowIcon" />
            </button>
          </div>
          <div className="numberOfPage">
            <span>
              Página{" "}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{" "}
            </span>
          </div>
        </div>
      </div>
      <EditPatient
        show={modalEditPatientShow}
        onHide={() => setModalEditPatientShow(false)}
        patient={selectedPatient}
      />
      <EditMedicalHistory
        show={modalMedicalHistoryShow}
        onHide={() => setMedicalHistoryShow(false)}
        patient={selectedPatient}
      />
    </div>
  );
};

export default Patients;
