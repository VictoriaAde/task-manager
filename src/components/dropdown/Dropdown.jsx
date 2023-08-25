"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropDownContainer = styled("div")`
  width: 180px;
  // margin: 1rem 0;
`;

const DropDownHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.3rem;
  border-radius: 0.25rem;
  border: 1px solid #999a9a;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  position: absolute;
  width: 180px;
  overflow-y: scroll;
  height: 250px;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  background-color: #fff;
  color: #000;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  text-align: left;
  margin-bottom: 0.8em;
  padding: 0.7rem 1.3rem;
  cursor: pointer;
`;

const ArrowDownIcon = styled("span")``;

const options = [
  "All Tasks",
  "Completed",
  "Pending",
  "Newer First",
  "Older First",
];

export default function Dropdown({
  onSortingOptionChange,
  selectedSortingOption,
  onFilterChange,
  selectedFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onSortingOptionChange(value);
    onFilterChange(value);
  };

  useEffect(() => {}, [selectedOption]);

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        {selectedOption || "All Tasks"}
        <ArrowDownIcon>
          <MdOutlineKeyboardArrowDown size={20} />
        </ArrowDownIcon>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options?.map((option) => (
              <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                {option}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}
