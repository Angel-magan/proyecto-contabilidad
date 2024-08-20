import "../styles/App_style.css";

const Frecuentes = () => {
  return (
    <div>
      <h1 className="encabezado">Preguntas Frecuentes</h1>
      <ul id="faq-list">
        <li>
          <strong>¿Qué es la Depreciación?</strong>
          <p>
            Se refiere a la pérdida de valor que un bien experimenta a lo largo
            de su vida útil.
          </p>
        </li>
        <li>
          <strong>¿Cual es la importancia de la depreciación?</strong>
          <p>
            La Depreciación es muy importante ya que mediante esta se restituye
            el valor de los bienes depreciados para que puedan ser reemplazados
            al final de su vida útil sin incurrir en gastos que afecten las
            operaciones y la liquidez del negocio.
          </p>
        </li>
        <li>
          <strong>¿Cuál es su importancia a nivel contable?</strong>
          <p>
            Es importante porque las empresas pueden usar este sistema para
            distribuir las inversiones de activos a largo plazo en el transcurso
            de muchos años para obtener beneficios contables y fiscales.
          </p>
        </li>
        <li>
          <strong>¿Qué factores causan la depreciación?</strong>
          <p>El desgaste debido al uso, el paso del tiempo y la vejez.</p>
        </li>
      </ul>
    </div>
  );
};

export default Frecuentes;
