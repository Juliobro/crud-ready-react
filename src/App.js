
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, titulo: "Crear API de tareas", descripcion: "Desarrollar el backend para gestionar las tareas con Spring Boot." },
  { id: 2, titulo: "Diseño del frontend", descripcion: "Crear el diseño básico de la interfaz con React." },
  { id: 3, titulo: "Autenticación de usuarios", descripcion: "Implementar login y registro usando Spring Security." },
  { id: 4, titulo: "Base de datos de tareas", descripcion: "Configurar la base de datos en MySQL para almacenar las tareas." },
  { id: 5, titulo: "Funcionalidad de recordatorios", descripcion: "Agregar funcionalidad para recordatorios automáticos de tareas pendientes." },
  { id: 6, titulo: "Testeo de la aplicación", descripcion: "Escribir pruebas unitarias y de integración con JUnit y Mockito." }
];


class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      titulo: "",
      descripcion: "",
    },
    idCounter: data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1,
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;

    arreglo.forEach((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].titulo = dato.titulo;
        arreglo[contador].descripcion = dato.descripcion;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "¿Estás seguro de que deseas eliminar el elemento con ID " + dato.id + "?"
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    let valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.idCounter;
    let lista = this.state.data;
    lista.push(valorNuevo);
    
    this.setState({
      modalInsertar: false,
      data: lista,
      idCounter: this.state.idCounter + 1,
    });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Nueva Tarea
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.titulo}</td>
                  <td>{dato.descripcion}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>ID:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Titulo:</label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.titulo}
              />
            </FormGroup>

            <FormGroup>
              <label>Descripcion:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Guardar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar titulo</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>ID:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.idCounter}
              />
            </FormGroup>

            <FormGroup>
              <label>Titulo:</label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Descripcion:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
