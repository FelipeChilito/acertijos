const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
    // Solo permitir GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Obtener el token del header Authorization
        const authorization = event.headers.authorization || '';
        const token = authorization.replace('Bearer ', '');

        if (!token) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    error: 'Token de acceso requerido' 
                })
            };
        }

        // Verificar el token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.acceso) {
            // Contenido de la carta (almacenado de forma segura)
            const contenidoCarta = `
                <p>Mi amor, quiero que sepas lo mucho que significas para mí. Desde que llegaste a mi vida, todo ha cambiado de la manera más hermosa. Eres la luz que ilumina mis días y la razón por la cual mi corazón late con tanta fuerza y alegría.</p>

                <p>Cada momento contigo es un tesoro que guardo en lo más profundo de mi ser. Tu sonrisa es mi refugio, tus palabras son mi inspiración y tu amor es la fuerza que me impulsa a ser mejor cada día. Gracias por amarme tal como soy y por creer en mí.</p>

                <p>No tengo palabras suficientes para expresar la gratitud que siento por tenerte a mi lado. Eres mi compañera perfecta, mi confidente, mi mejor amiga y el amor de mi vida. Contigo puedo afirmar que he descubierto lo que significa amar verdaderamente.</p>

                <p>Quiero pasar el resto de mis días haciéndote feliz, cuidándote y demostrándote cada día lo mucho que te amo. Eres mi presente más preciado y mi futuro más deseado.</p>

                <p>Te amo con todo mi corazón, mi alma y mi ser. Eres y serás siempre mi todo.</p>
            `;

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
                    'Access-Control-Allow-Methods': 'GET'
                },
                body: JSON.stringify({ 
                    success: true,
                    carta: contenidoCarta,
                    message: 'Carta cargada con éxito'
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
                    error: 'Token inválido' 
                })
            };
        }
    } catch (error) {
        console.error('Error en función carta:', error);
        return {
            statusCode: 401,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Token inválido o expirado' 
            })
        };
    }
};