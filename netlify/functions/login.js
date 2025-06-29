const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
    // Solo permitir POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { clave } = JSON.parse(event.body || '{}');

        // Verificar la clave secreta (almacenada de forma segura en variables de entorno)
        if (clave === process.env.CLAVE_SECRETA) {
            // Generar JWT token
            const token = jwt.sign(
                { 
                    acceso: true,
                    timestamp: Date.now()
                }, 
                process.env.JWT_SECRET,
                { expiresIn: '10m' } // Token válido por 10 minutos
            );

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({ 
                    success: true,
                    token: token,
                    message: 'Acceso autorizado'
                })
            };
        } else {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false,
                    error: 'Clave incorrecta' 
                })
            };
        }
    } catch (error) {
        console.error('Error en función login:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: false,
                error: 'Error interno del servidor' 
            })
        };
    }
};