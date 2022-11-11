import "./customizableTableContent.css";

export const CustomizableTableContent = (props: any) => {
  const { data, title, columns } = props;

  const getRowDisplay = (row: any) => {
    return (columns || []).map((column: any) => (
      <td>{column.render ? column.render(row) : row[column.field]}</td>
    ));
  };

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <div
        style={{
          padding: "16px 22px 1%",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          minHeight: 64,
          verticalAlign: "middle",
          fontSize: "1.25rem",
          fontFamily: "Roboto",
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: "0.0075em",
          boxShadow: "0 20px 27px 0 rgb(0 0 0 / 5%)",
          backgroundColor: "#fff",
        }}
      >
        {title}
      </div>
      <table aria-label="customized table">
        <tr>
          {columns.map((col: any, index: number) => (
            <th key={col.title + index}>{col.title}</th>
          ))}
        </tr>
        {data.map((row: any, index: number) => (
          <tr key={row.id}>{getRowDisplay(row)}</tr>
        ))}
      </table>
    </div>
  );
};
