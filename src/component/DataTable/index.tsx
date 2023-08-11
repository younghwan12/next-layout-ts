import { DataTable as PDataTable,  DataTableProps } from 'primereact/datatable'

// import { SectionHead, SectionBody } from '@/common/layouts'

import { useState, useCallback, useMemo, useEffect } from 'react';
// import { Option, Select } from '../Select'
import Button from '../Button'

interface ICustomDataTableProps {
    extraButtons?: React.ReactNode;
    tooltip?: React.ReactNode;
    extraForm?: React.ReactNode;
    refresh?: React.ReactNode;
    rowNums?: number[] | null;
    onRefresh?: () => void;
    onRowClick?: any;
}

const DataTable: React.FC<ICustomDataTableProps> = (props) => {
    // const { totalRecords } = props;
    // const [first, setFirst] = useState(0);
    // const [rows, setRows] = useState(
    //     props.rowNums ? props.rowNums[0] : props.rows,
    // );


    // const [tableCellSize, setTableCellSize] = useState<DataTableProps['size']>("normal");

    // const handleCellSizeBtn1 = useCallback(() => {
    //     setTableCellSize(tableCellSize === "normal" ? "small" : "normal")
    // }, [tableCellSize])

    // const handleRowNumChange = useCallback((newValue: number) => {
    //     setRows(newValue)
    // }, [])

    // const handlePage = (e: DataTablePFSEvent) => {
    //     setFirst(e.first);
    //     props.onPage(e);
    // };
    // const isPaginatorTable = useMemo(() => {
    //     if (totalRecords && totalRecords > 0) {
    //         return true;
    //     }
    // }, [totalRecords,])

    // const handleOnclick = (e) => {
    //     if (
    //         e.originalEvent.target.classList.contains("p-selection-column") ||
    //         e.originalEvent.target.classList.contains("p-checkbox-icon")
    //     )
    //         return false;


    //     props.onRowClick && props.onRowClick(e);
    // }
    
    return (
        <>
            {props.extraForm !== undefined ? (<div>{props.extraForm}</div>) : null}
            {/* <div className="cb_list"> */}
            <PDataTable
                size="small"
                className="p-datatable-gridlines "
                style={{ width: "100%" }}
                selectionPageOnly
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50, 75, 100, 500, 1000]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="데이터가 없습니다."
                {...props}
            >
            </PDataTable>

            {/* </div> */}
        </>
    )

}

export default DataTable;