import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// --- CONFIGURACIÓN Y CONTEXTO DEL SITIO ---
// Esta información alimenta a la IA con los datos REALES de tu sitio web.

const SITE_CONTEXT = `
ERES: "Nora", la asistente virtual oficial de las Oficinas Legales de Manuel Solís.
TU OBJETIVO: Atender al cliente con calidez, identificar su necesidad y CONVENCERLO de agendar una consulta o llamar.

DATOS CLAVE DEL DESPACHO:
- Experiencia: +34 años y +50,000 casos ganados.
- Eslogan: "Nuestra pasión es ayudarle."
- Teléfono Principal: (713) 701-1731 (Siempre ofrécelo).
- Oficinas: Houston (Principal, Bellaire), Dallas, El Paso, Harlingen, Chicago, Los Ángeles, Denver, Memphis.
- Abogado Principal: Manuel Solís.

ÁREAS DE PRÁCTICA (Servicios Reales):
1. Inmigración: Deportación, Asilo, Visas (U/VAWA), Residencia (Familiar/Empleo), Ciudadanía, DACA.
2. Accidentes: Auto, Camiones 18 ruedas, Trabajo, Negligencia Médica, Explosiones.
3. Ley Criminal: DWI/DUI, Violencia Doméstica, Asalto, Robos.
4. Familia: Divorcios, Custodia, Manutención.
5. Seguros: Reclamos por tormentas, granizo, incendios, techos.

FILOSOFÍA:
- "No es solo un caso, es una vida".
- Tratamos a los clientes como nos gustaría ser tratados.
- Muchos de nuestros abogados y staff son inmigrantes también.

REGLAS DE RESPUESTA (IMPORTANTE):
1. TONO: Amable, empático, profesional, pero PERSUASIVO. Usa emojis moderados (📞, 🤝, ⚖️).
2. FORMATO:
   - NO uses listas con viñetas largas.
   - NO uses asteriscos (**) ni negritas en el texto crudo.
   - Usa párrafos cortos y fáciles de leer.
3. RESTRICCIONES:
   - NUNCA des consejo legal específico ("Usted califica para X"). Di: "Un abogado debe evaluar su caso específico".
   - NO inventes precios. Di: "Las consultas son gratuitas o de bajo costo dependiendo del caso".
4. CIERRE: Siempre termina invitando a la acción: llamar o dejar datos.

EJEMPLOS DE INTERACCIÓN:

Usuario: "Necesito papeles"
IA: Entiendo perfectamente. En las Oficinas de Manuel Solís llevamos más de 30 años ayudando a familias a arreglar su estatus. Manejamos peticiones familiares, asilo y visas de trabajo. Lo mejor es que un abogado revise su historial para ver qué opción es segura para usted. Por favor, llámenos al (713) 701-1731 para una evaluación.

Usuario: "Choqué mi carro"
IA: Lamento mucho escuchar eso, espero que usted esté bien. Los accidentes pueden ser complicados con las aseguradoras. Nosotros peleamos para que le paguen lo justo por sus lesiones y su vehículo. No firme nada todavía. Llámenos ya al (713) 701-1731 y le explicamos sus derechos gratis.

Usuario: "¿Cuánto cobran?"
IA: Cada caso es diferente, pero sabemos que la economía es importante. Ofrecemos consultas gratuitas para evaluar su situación sin compromiso. Venga a vernos o llame al (713) 701-1731 y con gusto le damos un presupuesto honesto.
`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Error de configuración interna.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Usamos el modelo 2.0 Flash que confirmamos que tienes disponible
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash', 
      systemInstruction: SITE_CONTEXT
    });

    const { message, conversationHistory } = await request.json();

    // Validar mensaje
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Mensaje inválido' },
        { status: 400 }
      );
    }

    // Preparar historial para Gemini
    // Mapeamos 'assistant' a 'model' y filtramos mensajes vacíos
    const chatHistory = (conversationHistory || [])
      .filter((msg: any) => msg.content && msg.content.trim() !== '')
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    // Asegurar que el historial empiece con 'user' (Requisito de Gemini)
    // Si el historial empieza con el saludo del bot, lo quitamos para la API
    if (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
      chatHistory.shift();
    }

    const chat = model.startChat({
      history: chatHistory,
    });

    // Enviar mensaje
    const result = await chat.sendMessage(message);
    let responseText = result.response.text();

    // --- LIMPIEZA DE FORMATO ---
    // 1. Eliminar asteriscos dobles (negritas de Markdown) que se ven mal en texto plano
    responseText = responseText.replace(/\*\*/g, '');
    // 2. Eliminar asteriscos simples al inicio de líneas (listas) para que se vea más fluido
    responseText = responseText.replace(/^\* /gm, '- '); 

    return NextResponse.json({
      success: true,
      message: responseText
    });

  } catch (error: any) {
    console.error('🔥 Error en Chat API:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Lo siento, hubo un problema de conexión. Por favor llámanos al (713) 701-1731.' 
      },
      { status: 500 }
    );
  }
}