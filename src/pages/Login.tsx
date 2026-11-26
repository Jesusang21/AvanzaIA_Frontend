import { Container, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import logoAvanzaIA from '../assets/logoAvanzaIA.png';
import '../css/auth.css';
import { useState, type SubmitEvent, useEffect } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate } from "react-router";

export function Login() {
    const [showPass, setshowPass] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            const data = await loginUser({ email, password });
            console.log(data)
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            navigate("/homePage", { replace: true });
            // Redirigir al usuario tras iniciar sesión
        } catch (err) {
            setErrorMsg(
                err instanceof Error
                    ? err.message
                    : 'No se pudo conectar con el servidor. Inténtalo de nuevo.'
            );
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/homePage', { replace: true });
        }
    }, [navigate]);
    return (
        <div className="login-bg vh-100 overflow-hidden d-flex align-items-center justify-content-center px-3">
            <Container className="d-flex justify-content-center">
                <Card className="login-card border-0 shadow-lg p-3 p-md-4 w-100" style={{ maxWidth: '420px' }}>
                    <Card.Body>
                        <div className="text-center mb-3">
                            <div className="d-flex justify-content-center align-items-center mb-2">
                                <img
                                    src={logoAvanzaIA}
                                    style={{
                                        height: '150px',
                                    }}
                                />
                            </div>
                            <h3 className="fw-bold mb-1" style={{ color: '#0f172a' }}>
                                Bienvenido de nuevo
                            </h3>
                            <p className="text-muted small mb-0">
                                Inicia sesión para continuar en tu espacio
                            </p>
                        </div>

                        {errorMsg && (
                            <Alert variant="danger" className="py-2 small">
                                {errorMsg}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
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
                                <div className="d-flex justify-content-between align-items-center">
                                    <Form.Label className="fw-medium small mb-1">Contraseña</Form.Label>
                                    <a href="#recuperar" className="small text-decoration-none">
                                        ¿La olvidaste?
                                    </a>
                                </div>
                                <Form.Control
                                    type={showPass ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="py-2"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Mostrar contraseña"
                                    className="small text-muted"
                                    onChange={() => setshowPass((showPass) => !showPass)}
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
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </Button>
                        </Form>
                    </Card.Body>

                    <Card.Footer className="bg-transparent border-0 text-center pt-2">
                        <span className="text-muted small">
                            ¿Aún no tienes cuenta?{' '}
                            <a href="/registerUser" className="fw-semibold text-decoration-none">
                                Regístrate
                            </a>
                        </span>
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}