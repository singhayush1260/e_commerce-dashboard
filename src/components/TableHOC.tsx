import { useTable, Column, TableOptions, useSortBy, usePagination } from "react-table";
import { AiOutlineSortAscending, AiOutlineSortDescending,} from "react-icons/ai";
function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassName: string,
  heading: string,
  showPagination:boolean=false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState:{
        pageSize:5,
      }
    };

    const {
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      pageCount,
      state:{pageIndex},
      nextPage,
      canNextPage,
      previousPage,
      canPreviousPage
     
    } = useTable(options, useSortBy, usePagination);



    return (
      <div className={containerClassName}>
        <h2 className="heading">{heading}</h2>
        <table className="table" {...getTableBodyProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column:any) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {
                     column.isSorted && <span>{column.isSortedDesc? <AiOutlineSortDescending/>  : <AiOutlineSortAscending/> }</span>
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {
         showPagination && <div className="table_pagination">
          <button disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
          <span>{`${pageIndex+1} Page of ${pageCount}`}</span>
          <button disabled={!canNextPage} onClick={nextPage}>Next</button>
         </div>
        }
      </div>
    );
  };
}
export default TableHOC;
