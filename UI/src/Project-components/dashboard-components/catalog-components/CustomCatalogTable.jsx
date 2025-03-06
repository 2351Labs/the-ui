import "../../../css/CustomCatalogTable.css";
import { useState, useRef, useEffect } from "react";
import ArrowSVG from "../../../assets/arrow.svg?react";
import CatalogPaginator from "./CatalogPaginator";
import axiosBackend from "../../../helpers/axiosBackend";
import { useSearchParams, useLocation } from "react-router-dom";
import Loading from "../../Loading";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CustomCatalogTable({ pageData, setPageData }) {
  const keyToolContainerWidth = 5; //in px
  const initialColumnWidth = 188; //in px

  axiosBackend.defaults.headers.common[
    "Authorization"
  ] = `${localStorage.getItem("token")}`;

  const startingPage = 1;
  const pageSize = 11;
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
  // const { userData } = useContext(CatalogItemViewContext);
  // const [searchParams] = useSearchParams();
  // const searchQuery = searchParams.get("q");
  const [isLoading, setIsLoading] = useState(false);
  const [pageDataDisplay, setPageDataDisplay] = useState([]); //stores items
  const [searchParams] = useSearchParams();
  // const searchQuery = searchParams.get("q") || "";
  // const entityTypes = searchParams.get("entityTypes") || "";

  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const queryParamsString = location.search;

  async function fetchPagination(page, pageSize) {
    setIsLoading(true); //clear pageDataDisplay to trigger loading element;
    try {
      const response = await axiosBackend.get(
        `/items/pagination${
          queryParamsString ? queryParamsString : "?"
        }&page=${page}&pageSize=${pageSize}`
      );
      setIsLoading(false);
      setPageData(response.data);
      setPageDataDisplay(response.data.items);
    } catch (error) {
      console.log("Error fetching pagination", error);
    }
  }

  useEffect(() => {
    //run on initial render and if location changes (EX: search input is used to add query to URL)
    fetchPagination(startingPage, pageSize);
  }, []);

  useEffect(() => {
    fetchPagination(startingPage, pageSize);
  }, [location]); //run also when userData loads (when logged in)

  const navigate = useNavigate();

  const [isSorting, setIsSorting] = useState({ columnKey: null, sortMode: 0 }); //0=no sort; 1=high 2=low

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
                setPageData={setPageData}
                columnKeys={columnKeys}
                isSorting={isSorting}
                setIsSorting={setIsSorting}
                setCurrentPage={setCurrentPage}
              />
            );
          })}
        </div>

        {/* Catalog data */}

        {!isLoading && (
          <>
            {pageDataDisplay?.map((entityObj, index) => {
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
          </>
        )}
      </div>
      <div className="filler"></div>
      <CatalogPaginator
        currentPage={currentPage - 1}
        fetchPagination={fetchPagination}
        pageCount={pageData?.totalPages}
        onPageChange={(e) => {
          setCurrentPage(e.selected + 1);
          fetchPagination(e.selected + 1, pageSize);
        }}
      />

      {isLoading && <Loading />}
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
  setCurrentPage,
}) => {
  const minWidth = 100; //px
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(currentColumnWidth);

  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const handleMouseDown = (e) => {
    if (e.preventDefault) e.preventDefault(); // Prevent unwanted default behavior
    console.log("DOWN");
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = currentColumnWidth;

    // Add event listeners for both mouse and touch
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove, { passive: false });
    document.addEventListener("touchend", handleMouseUp);
  };

  // Handle touch start properly
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      handleMouseDown(e.touches[0]); // Pass the first touch event
    }
  };

  // Handle mouse/touch move (resize & scroll left)
  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newWidth = startWidth.current + (clientX - startX.current);

    // Update column width
    setColumnWidths((prev) => ({
      ...prev,
      [columnKey]: newWidth > minWidth ? newWidth : minWidth,
    }));

    // Scroll viewport left if touch is moving left
    // if (e.touches) {
    //   const container = document.querySelector(".rows-container");
    //   const deltaX = clientX - startX.current;
    //   if (deltaX < 0) {
    //     container.scroll += deltaX; // Scroll left
    //   }
    // }
  };

  // Handle mouse/touch release
  const handleMouseUp = () => {
    isResizing.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchmove", handleMouseMove);
    document.removeEventListener("touchend", handleMouseUp);
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

    setCurrentPage(1); //reset current page

    setIsSorting((prev) => {
      return { columnIndex: columnIndex, sortMode: currentSortMode }; //reset if past 3
    });

    // const pageDataCopy = [...pageData.items];

    switch (currentSortMode) {
      case 1: //sort A-Z
        params.set("sort", 1); // Add or update the query parameter
        params.set("sortBy", `${columnKeys[columnIndex]}`); // Add or update the query parameter
        navigate(`${location.pathname}?${params.toString()}`, {
          replace: true,
        });

        // pageDataCopy.sort((a, b) => {
        //   if (a[columnKeys[columnIndex]] < b[columnKeys[columnIndex]])
        //     return -1;
        //   if (a[columnKeys[columnIndex]] > b[columnKeys[columnIndex]]) return 1;
        //   return 0;
        // });
        // setPageDataDisplay(pageDataCopy);
        return;
      case 2: //sort Z-A
        params.set("sort", -1); // Add or update the query parameter
        params.set("sortBy", `${columnKeys[columnIndex]}`); // Add or update the query parameter
        navigate(`${location.pathname}?${params.toString()}`, {
          replace: true,
        });

        // pag

        // pageDataCopy.sort((a, b) => {
        //   if (a[columnKeys[columnIndex]] > b[columnKeys[columnIndex]])
        //     return -1;
        //   if (a[columnKeys[columnIndex]] < b[columnKeys[columnIndex]]) return 1;
        //   return 0;
        // });
        // setPageDataDisplay(pageDataCopy);
        return;
      case 0: //reset to default
        params.delete("sort"); // Add or update the query parameter
        params.delete("sortBy"); // Add or update the query parameter
        navigate(`${location.pathname}?${params.toString()}`, {
          replace: true,
        });
        setPageDataDisplay(pageData.items);
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
        <div className={`key column-${columnIndex + 1}`}>
          {/* OVERRIDE FOR MATURITY SCORE NAME */}
          {columnKey == "Service Maturity Score(s)"
            ? "Avg. Maturity Score"
            : columnKey}
        </div>
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
        <div
          className="line-draggable"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          |
        </div>
      </div>
    </div>
  );
};
