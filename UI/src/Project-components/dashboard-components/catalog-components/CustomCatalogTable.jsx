import "../../../css/CustomCatalogTable.css";
import { useState, useRef, useEffect } from "react";
import ArrowSVG from "../../../assets/arrow.svg?react";
import CatalogPaginator from "./CatalogPaginator";
import axiosBackend from "../../../helpers/axiosBackend";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CustomCatalogTable() {
  const startingPage = 1;
  const pageSize = 7;
  //   Set columns to display
  const columnKeys = [
    "Service Name",
    "Entity Type",
    "Programming Language",
    "Last Updated",
    "Service Maturity Score(s)",
    "Version",
    "Product",
  ];

  const [pageData, setPageData] = useState([]);//stores data containing items and more
  const [pageDataDisplay, setPageDataDisplay] = useState([]);//stores items
  async function fetchPagination(page, pageSize) {
    const response = await axiosBackend.get(
      `/items/pagination?page=${page}&pageSize=${pageSize}`
    );
    console.log("HERE", response.data.items);
    setPageData(response.data);
    setPageDataDisplay(response.data.items);
  }

  useEffect(() => {
    fetchPagination(startingPage, pageSize);
  }, []);

  const navigate = useNavigate();

  const [isSorting, setIsSorting] = useState({ columnKey: null, sortMode: 0 }); //0=no sort; 1=high 2=low
  const keyToolContainerWidth = 5; //in px
  const initialColumnWidth = 150; //in px
  // const entityExample = collectorSchemaTestData.collectorSchemaTestData;
  // const pageData = [
  //   { ...entityExample, ["Service Name"]: "ZTest" },
  //   entityExample,
  //   {
  //     ...entityExample,
  //     ["Service Name"]: "GTest",
  //     ["Version"]: "3.0!",
  //     ["Service Maturity Score(s)"]: [
  //       {
  //         metric: "Code Quality",
  //         score: 22,
  //         description: "Based on static analysis and linting results",
  //       },
  //     ],
  //   },
  //   {
  //     ...entityExample,
  //     ["Service Name"]: "ZTest",
  //     ["Programming Language"]: "ATest",
  //   },
  //   entityExample,
  //   { ...entityExample, ["Service Name"]: "ATest" },
  // ];
  function calculateAverage(metrics) {
    let totalScore = metrics.reduce((sum, metric) => sum + metric.score, 0);
    return (totalScore / metrics.length).toFixed(0);
  }

  const [columnWidths, setColumnWidths] = useState(() => {
    let columnWidthsCollector = {};
    columnKeys.forEach((key) => {
      columnWidthsCollector[key] = initialColumnWidth; //set initial px for columns
    });
    return columnWidthsCollector;
  }); // Initial width

  function getTableValue(key, entityObj) {
    // customize data table display based on key
    switch (key) {
      case "Service Maturity Score(s)":
        return `${calculateAverage(entityObj["Service Maturity Score(s)"])}`;

      case "Last Updated":
        function formattedDate(dateStr) {
          // Convert to a JavaScript Date object
          const date = new Date(dateStr);
          // Format the date to a more readable format
          const options = {
            // weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            // hour: "numeric",
            // minute: "numeric",
            // second: "numeric",
            // timeZoneName: "short",
          };
          return date.toLocaleDateString("en-US", options);
        }
        return formattedDate(entityObj[key]);
      default:
        return entityObj[key];
    }
  }

  return (
    <div className="CustomCatalogTable">
      {/* Catalog Keys */}
      <div className="rows-container">
        <div className="row key-row">
          {columnKeys.map((key, index) => {
            return (
              // <div className="key" key={index}>
              //   <div>{key}</div>
              //   <div className="line-draggable">|</div>
              // </div>
              <ResizableColumn
                key={index}
                columnKey={key}
                columnIndex={index}
                currentColumnWidth={columnWidths[key]}
                setColumnWidths={setColumnWidths}
                pageData={pageData}
                setPageDataDisplay={setPageDataDisplay}
                columnKeys={columnKeys}
                isSorting={isSorting}
                setIsSorting={setIsSorting}
              />
            );
          })}
        </div>

        {/* Catalog data */}
        {pageDataDisplay.map((entityObj, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`${entityObj._id}`, {
                  replace: true,
                });
              }}
              row={index + 1}
              className={`row row-${index + 1}`}
            >
              {columnKeys.map((key, index) => {
                // map over all keys again to create spot to enter value for entityObj
                return (
                  <div key={index} className="table-container">
                    <div
                      style={{
                        width: columnWidths[key] + keyToolContainerWidth,
                      }}
                      className={`table column-${index + 1}`}
                      key={index}
                    >
                      {getTableValue(key, entityObj)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="filler"></div>
      {console.log("PAGE DATA", pageData)}
      <CatalogPaginator
        fetchPagination={fetchPagination}
        pageCount={pageData.totalPages}
        onPageChange={(e) => {
          console.log("PAGE CHANGE", e);
          fetchPagination(e.selected+1, pageSize);
        }}
      />
    </div>
  );
}

const ResizableColumn = ({
  columnKey,
  columnIndex,
  currentColumnWidth,
  setColumnWidths,
  pageData,
  setPageDataDisplay,
  columnKeys,
  isSorting,
  setIsSorting,
}) => {
  const minWidth = 100; //px
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(currentColumnWidth);
  // Handle mouse down on the resizer
  const handleMouseDown = (e) => {
    e.preventDefault(); // Stops the default action
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = currentColumnWidth;

    // Add event listeners to track movement
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle mouse move (resize)
  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = startWidth.current + (e.clientX - startX.current);
    setColumnWidths((prev) => {
      return {
        ...prev,
        [columnKey]: newWidth > minWidth ? newWidth : minWidth,
      };
    }); // Set a minimum width of 100px
  };

  // Handle mouse release
  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  function handleToggleSort(e) {
    const columnIndex = e.currentTarget.getAttribute("column") - 1;
    let currentSortMode;

    if (columnIndex == isSorting.columnIndex) {
      //if same column sort mode changing, iterate through sort modes by 1
      currentSortMode = (isSorting.sortMode + 1) % 3;
    } else {
      //reset at 0 and add 1 to change to next mode
      currentSortMode = 1;
    }
    setIsSorting((prev) => {
      return { columnIndex: columnIndex, sortMode: currentSortMode }; //reset if past 3
    });

    const pageDataCopy = [...pageData];
    switch (currentSortMode) {
      case 1: //sort A-Z
        pageDataCopy.sort((a, b) => {
          if (a[columnKeys[columnIndex]] < b[columnKeys[columnIndex]])
            return -1;
          if (a[columnKeys[columnIndex]] > b[columnKeys[columnIndex]]) return 1;
          return 0;
        });
        setPageDataDisplay(pageDataCopy);
        return;
      case 2: //sort Z-A
        pageDataCopy.sort((a, b) => {
          if (a[columnKeys[columnIndex]] > b[columnKeys[columnIndex]])
            return -1;
          if (a[columnKeys[columnIndex]] < b[columnKeys[columnIndex]]) return 1;
          return 0;
        });
        setPageDataDisplay(pageDataCopy);
        return;
      case 0: //reset to default
        setPageDataDisplay(pageData);
    }
  }

  return (
    <div className="key-container">
      <div
        style={{
          width: `${currentColumnWidth}px`,
        }}
        className="key-wrapper"
      >
        <div className={`key column-${columnIndex + 1}`}>{columnKey}</div>
        <button
          onClick={handleToggleSort}
          className="toggle-sort-btn"
          sortmode={`${
            isSorting.columnIndex === columnIndex ? isSorting.sortMode : 0
          }`}
          column={columnIndex + 1}
        >
          <ArrowSVG />
        </button>
      </div>

      <div className="key-tools-container">
        <div className="line-draggable" onMouseDown={handleMouseDown}>
          |
        </div>
      </div>
    </div>
  );
};
