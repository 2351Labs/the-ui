import { OrganizationChart } from "primereact/organizationchart";
import "../../../css/dependencies.css";
import { useEffect, useState } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import WandSVG from "../../../assets/dashboard/wand.svg?react";
import SideBar from "../SideBar";

export default function Dependencies(props) {
  const { isPastWidth } = props;
  // const isPastWidth = 880;
  const [nodeSelection, setNodeSelection] = useState(null);
  const [isVisualizeEnabled, setIsVisualizedEnabled] = useState(false);
  const nodeData = [
    {
      key: "0",
      data: {
        name: "Applications",
        size: "100kb",
        type: "Folder",
      },
      children: [
        {
          key: "0-0",
          data: {
            name: "React",
            size: "25kb",
            type: "Folder",
          },
          children: [
            {
              key: "0-0-0",
              data: {
                name: "react.app",
                size: "10kb",
                type: "Application",
              },
            },
            {
              key: "0-0-1",
              data: {
                name: "native.app",
                size: "10kb",
                type: "Application",
              },
            },
            {
              key: "0-0-2",
              data: {
                name: "mobile.app",
                size: "5kb",
                type: "Application",
              },
            },
          ],
        },
        {
          key: "0-1",
          data: {
            name: "editor.app",
            size: "25kb",
            type: "Application",
          },
        },
        {
          key: "0-2",
          data: {
            name: "settings.app",
            size: "50kb",
            type: "Application",
          },
        },
      ],
    },
    {
      key: "1",
      data: {
        name: "Cloud",
        size: "20kb",
        type: "Folder",
      },
      children: [
        {
          key: "1-0",
          data: {
            name: "backup-1.zip",
            size: "10kb",
            type: "Zip",
          },
        },
        {
          key: "1-1",
          data: {
            name: "backup-2.zip",
            size: "10kb",
            type: "Zip",
          },
        },
      ],
    },
    {
      key: "2",
      data: {
        name: "Desktop",
        size: "150kb",
        type: "Folder",
      },
      children: [
        {
          key: "2-0",
          data: {
            name: "note-meeting.txt",
            size: "50kb",
            type: "Text",
          },
        },
        {
          key: "2-1",
          data: {
            name: "note-todo.txt",
            size: "100kb",
            type: "Text",
          },
        },
      ],
    },
    {
      key: "3",
      data: {
        name: "Documents",
        size: "75kb",
        type: "Folder",
      },
      children: [
        {
          key: "3-0",
          data: {
            name: "Work",
            size: "55kb",
            type: "Folder",
          },
          children: [
            {
              key: "3-0-0",
              data: {
                name: "Expenses.doc",
                size: "30kb",
                type: "Document",
              },
            },
            {
              key: "3-0-1",
              data: {
                name: "Resume.doc",
                size: "25kb",
                type: "Resume",
              },
            },
          ],
        },
        {
          key: "3-1",
          data: {
            name: "Home",
            size: "20kb",
            type: "Folder",
          },
          children: [
            {
              key: "3-1-0",
              data: {
                name: "Invoices",
                size: "20kb",
                type: "Text",
              },
            },
          ],
        },
      ],
    },
    {
      key: "4",
      data: {
        name: "Downloads",
        size: "25kb",
        type: "Folder",
      },
      children: [
        {
          key: "4-0",
          data: {
            name: "Spanish",
            size: "10kb",
            type: "Folder",
          },
          children: [
            {
              key: "4-0-0",
              data: {
                name: "tutorial-a1.txt",
                size: "5kb",
                type: "Text",
              },
            },
            {
              key: "4-0-1",
              data: {
                name: "tutorial-a2.txt",
                size: "5kb",
                type: "Text",
              },
            },
          ],
        },
        {
          key: "4-1",
          data: {
            name: "Travel",
            size: "15kb",
            type: "Text",
          },
          children: [
            {
              key: "4-1-0",
              data: {
                name: "Hotel.pdf",
                size: "10kb",
                type: "PDF",
              },
            },
            {
              key: "4-1-1",
              data: {
                name: "Flight.pdf",
                size: "5kb",
                type: "PDF",
              },
            },
          ],
        },
      ],
    },
    {
      key: "5",
      data: {
        name: "Main",
        size: "50kb",
        type: "Folder",
      },
      children: [
        {
          key: "5-0",
          data: {
            name: "bin",
            size: "50kb",
            type: "Link",
          },
        },
        {
          key: "5-1",
          data: {
            name: "etc",
            size: "100kb",
            type: "Link",
          },
        },
        {
          key: "5-2",
          data: {
            name: "var",
            size: "100kb",
            type: "Link",
          },
        },
      ],
    },
    {
      key: "6",
      data: {
        name: "Other",
        size: "5kb",
        type: "Folder",
      },
      children: [
        {
          key: "6-0",
          data: {
            name: "todo.txt",
            size: "3kb",
            type: "Text",
          },
        },
        {
          key: "6-1",
          data: {
            name: "logo.png",
            size: "2kb",
            type: "Picture",
          },
        },
      ],
    },
    {
      key: "7",
      data: {
        name: "Pictures",
        size: "150kb",
        type: "Folder",
      },
      children: [
        {
          key: "7-0",
          data: {
            name: "barcelona.jpg",
            size: "90kb",
            type: "Picture",
          },
        },
        {
          key: "7-1",
          data: {
            name: "primeng.png",
            size: "30kb",
            type: "Picture",
          },
        },
        {
          key: "7-2",
          data: {
            name: "prime.jpg",
            size: "30kb",
            type: "Picture",
          },
        },
      ],
    },
    {
      key: "8",
      data: {
        name: "Videos",
        size: "1500kb",
        type: "Folder",
      },
      children: [
        {
          key: "8-0",
          data: {
            name: "primefaces.mkv",
            size: "1000kb",
            type: "Video",
          },
        },
        {
          key: "8-1",
          data: {
            name: "intro.avi",
            size: "500kb",
            type: "Video",
          },
        },
      ],
    },
  ];
  const data = [
    {
      label: "Order Service",
      expanded: true,
      value: "test",
      key: "124214",
      name: "test",
      children: [
        {
          label: "Service 1",
          expanded: false,
          key: "124214",
          name: "test",
          children: [
            {
              label: "Sub Service",
              key: "124214",
            },
            {
              label: "Sub Service",
              key: "124214",
            },
          ],
        },
        {
          label: "Service 2",
          expanded: false,
          data: "fr",
          children: [
            {
              label: "Sub Service",
              key: "123213",
            },
            {
              label: "Sub Service",
              key: "124214",
              children: [
                {
                  label: "Sub Service",
                  key: "123213",
                },
                {
                  label: "Sub Service",
                  key: "124214",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setViewPortWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tableStyling = () => {
    const isMobileMode = !(
      document
        .querySelector(".dashboard--container")
        .getAttribute("sidebar-popup-mode") === "true"
    );
    if (isMobileMode) {
      const settings = { width: `${viewPortWidth - 30}px` };
      return settings;
    } else {
      const settings = isPastWidth
        ? { width: `${viewPortWidth - 600}px` }
        : { width: `${viewPortWidth - 150}px` };
      return settings;
    }
  };
  return (
    <div className="dependencies">
      <h4 className="option-header">Dependencies (12)</h4>
      <button
        onClick={() => {
          setIsVisualizedEnabled(!isVisualizeEnabled);
        }}
        className="visualize-btn"
      >
        <WandSVG className="wand-icon" />
        Visualize
      </button>

      {!isVisualizeEnabled ? (
        <div style={tableStyling()} className="tree-table">
          <TreeTable
            paginator
            rows={5}
            // rowsPerPageOptions={[5, 10, 25]}
            value={nodeData}
            //   togglerTemplate={togglerTemplate}
            tableStyle={{ minWidth: "50rem" }}
            sortMode={"multiple"}
            removableSort
            // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          >
            <Column sortable field="name" header="Name" expander></Column>
            <Column sortable field="Type" header="Size"></Column>
            <Column sortable field="type" header="Type"></Column>
            {/* <Column body={actionTemplate} headerClassName="w-10rem" /> */}
          </TreeTable>
        </div>
      ) : (
        <div style={tableStyling()} className="tree-table">
          <OrganizationChart
            onNodeSelect={(e) => {
              setNodeSelection(e.node.key);
            }}
            selectionMode={"single"}
            value={data}
          />
        </div>
      )}

      <h3 className="option-header">Dependents (5)</h3>
      <div style={tableStyling()} className="tree-table">
        <TreeTable
          paginator
          rows={5}
          // rowsPerPageOptions={[5, 10, 25]}
          value={nodeData}
          //   togglerTemplate={togglerTemplate}
          tableStyle={{ minWidth: "50rem" }}
          sortMode={"multiple"}
          removableSort
          // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        >
          <Column sortable field="name" header="Name" expander></Column>
          <Column sortable field="Type" header="Size"></Column>
          <Column sortable field="type" header="Type"></Column>
          {/* <Column body={actionTemplate} headerClassName="w-10rem" /> */}
        </TreeTable>
      </div>
    </div>
  );
}
