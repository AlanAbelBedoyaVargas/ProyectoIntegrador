import streamlit as st
from langchain_community.llms import Ollama
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

#Monitoreo con LangSmith

import os
from dotenv import load_dotenv
load_dotenv()

os.environ["LANGCHAIN_TRACING_V2"]="true"
os.environ["LANGCHAIN_API_KEY"]=os.getenv("LANGCHAIN_API_KEY")

# Creación del modelo. La temperatura indica qué tan preciso debe ser el modelo
llm = Ollama(model="llama3", temperature=0)
chat_history = []

# Definir el prompt template
prompt_template = ChatPromptTemplate.from_messages(
    [
        (
            "system", """Te llamas Kiwi, eres una AI que genera dietas alternativas personalizadas en base a la descripcion de una persona. Además,
            debes contestar a las peticiones acorde al contexto."""
        ),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ]
)

# Creación de la cadena que integra el prompt template con el modelo
chain = prompt_template | llm

# Función para obtener la respuesta del modelo
def get_response(user_input, chat_history):
    response = chain.invoke({"input": user_input, "chat_history": chat_history})
    return response

# Configurar la página
st.set_page_config(page_title="Prueba generación de Dietas", page_icon="🥗", layout="centered")

# Título de la aplicación
st.title("🥗 Chatbot de Dietas Personalizadas")

# Descripción
st.write("¡Bienvenido! Escribe tu mensaje abajo y se te retornará una dieta alternativa personalizada.")

# Crear un área de texto para el historial de conversación
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# Mostrar el historial de conversación
for message in st.session_state.chat_history:
    if isinstance(message, HumanMessage):
        with st.chat_message("user"):
            st.markdown(f"Tú: {message.content}")
    else:
        with st.chat_message("assistant"):
            st.markdown(f"Bot: {message.content}")

# Entrada de usuario
user_input = st.chat_input("Tu mensaje:", key="input")

# Botón de envío
if user_input:
    # Añadir el mensaje del usuario al historial
    st.session_state.chat_history.append(HumanMessage(content=user_input))

    # Obtener la respuesta del modelo
    response = get_response(user_input, st.session_state.chat_history)

    # Añadir la respuesta del modelo al historial
    st.session_state.chat_history.append(AIMessage(content=response))

    # Limpiar la entrada del usuario
    st.experimental_rerun()

# Footer
st.markdown("<hr>", unsafe_allow_html=True)
st.markdown("Desarrollado por Alan Bedoya")
