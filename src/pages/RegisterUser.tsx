import { Container, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import logoAvanzaIA from '../assets/logoAvanzaIA.png';
import '../css/auth.css';
import { useState, type SubmitEvent, useEffect } from 'react';
import { useNavigate } from "react-router";

export function RegisterUser() {
    const [errorMsg, setErrorMsg] = useState({ mensaje: '', isError: true });
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const navigate = useNavigate()
    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMsg({ mensaje: '', isError: true });
        setLoading(true);

        try {
            if (password != repetirPassword) {
                setErrorMsg({ mensaje: `El campo [Contraseña] y [Repetir contraseña] deben ser iguales.`, isError: true })
                return
            } else {
                setErrorMsg({ mensaje: `¡Te has registrado exitosamente!`, isError: false })
            }
            // const data = await loginUser({ email, password });
            // console.log(data)
            // if (data.token) {
            //     localStorage.setItem('token', data.token);
            // }
            // navigate("/homePage", { replace: true });
            // Redirigir al usuario tras iniciar sesión
        } catch (err) {
            // setErrorMsg(
            //     err instanceof Error
            //         ? err.message
            //         : 'No se pudo conectar con el servidor. Inténtalo de nuevo.'
            // );
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // navigate('/homePage', { replace: true });
        }
    }, [navigate]);
    return (
        <>
            <div className="login-bg vh-100 overflow-hidden d-flex align-items-center justify-content-center px-3">
                <Container className="d-flex justify-content-center">
                    <Card className="login-card border-0 shadow-lg p-3 p-md-4 w-100" style={{ maxWidth: '520px' }}>
                        <Card.Body>
                            <div className="text-center mb-3">
                                <div className="d-flex justify-content-center align-items-center mb-2">
                                    <img
                                        src={logoAvanzaIA}
                                        style={{
                                            height: '170px',
                                        }}
                                    />
                                </div>
                                <h3 className="fw-bold mb-1" style={{ color: '#0f172a' }}>
                                    Registrate y avanza
                                </h3>
                                <p className="text-muted small mb-0">
                                    Registrate y empieza a crear tu espacio
                                </p>
                            </div>

                            {errorMsg.mensaje && (
                                <Alert variant={errorMsg.isError ? "danger" : "success"} className="py-2 small">
                                    {errorMsg.mensaje}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="fw-medium small">Nombre completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre completo..."
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="fw-medium small">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username..."
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="fw-medium small">Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="tu@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="fw-medium small mb-1">Contraseña</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="fw-medium small mb-1">Repetir contraseña</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="••••••••"
                                        value={repetirPassword}
                                        onChange={(e) => setRepetirPassword(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={loading}
                                    className="w-100 py-2 fw-semibold login-btn"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            Guardando...
                                        </>
                                    ) : (
                                        'Guardar'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>

                        <Card.Footer className="bg-transparent border-0 text-center pt-2">
                            <span className="text-muted small">
                                ¿Te has registrado satisfactoriamente?{' '}
                                <a href="/" className="fw-semibold text-decoration-none">
                                    Iniciar sesión
                                </a>
                            </span>
                        </Card.Footer>
                    </Card>
                </Container>
            </div>
        </>
    )
}