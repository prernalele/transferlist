import { useState } from "react";
import "./style.css";

export default function App() {
  const initialLeftList = [
    {
      id: 0,
      value: "HTML",
      status: false,
    },
    {
      id: 1,
      value: "Javascript",
      status: false,
    },
    {
      id: 2,
      value: "CSS",
      status: false,
    },
    {
      id: 3,
      value: "TypeScript",
      status: false,
    },
  ];
  const initialRightList = [
    {
      id: 1,
      value: "React",
      status: false,
    },
    {
      id: 2,
      value: "Angular",
      status: false,
    },
    {
      id: 3,
      value: "Veue",
      status: false,
    },
    {
      id: 4,
      value: "Svelte",
      status: false,
    },
  ];
  const [leftList, setLeftList] = useState(initialLeftList);
  const [rightList, setRightList] = useState(initialRightList);
  const [transferList, setTransferList] = useState([]);

  const toRightColumn = () => {
    setRightList((previous) => {
      return [...previous, leftList];
    });
    setLeftList([]);
  };

  const toLeftColumn = () => {
    setLeftList((previous) => {
      return [...previous, ...rightList];
    });
    setRightList([]);
  };

  const CheckBoxList = ({
    listOfThings,
    columnClass,
    transferList,
    setTransferList,
  }) => {
    const handleCheckbox = (e, value, status) => {
      console.log("sibling", e.target.nextSibling.innerHTML.toLowerCase());
      console.log("checked", e.target.checked);

      setTransferList((previous) => {
        const useSelection = e.target.nextSibling.innerHTML.toLowerCase();
        const filteredListOfThings = previous.filter(
          (item) => item.value === useSelection
        );
        const updateStatusValue = filteredListOfThings.map(
          (checkedItem, index) => (checkedItem[status] = true)
        );
        return [...previous, updateStatusValue];
      });
    };
    return (
      <div className={columnClass}>
        {listOfThings.map(({ id, value, status }, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={id}
                onChange={(e) => handleCheckbox(e, value, status)}
              />
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container">
      <CheckBoxList
        listOfThings={leftList}
        columnClass="leftColumn"
        transferList={transferList}
        setTransferList={setTransferList}
      />
      <div className="buttons">
        <button className="singleButton" onClick={toLeftColumn}>
          {"<<"}
        </button>
        <button className="singleButton">{"<"}</button>
        <button className="singleButton">{">"}</button>
        <button className="singleButton" onClick={toRightColumn}>
          {">>"}
        </button>
      </div>
      <CheckBoxList
        listOfThings={rightList}
        columnClass="rightColumn"
        transferList={transferList}
        setTransferList={setTransferList}
      />
    </div>
  );
}
