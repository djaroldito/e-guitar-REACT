import React from "react"
import styled from "styled-components"
import {
	LeftArrow,
	RightArrow,
	DoubleLeftArrow,
	DoubleRightArrow,
} from "../svgIcons.js"

export default function Pagination({
	handleChange,
	totalCards,
	currentPage,
	guitarsPerPage,
}) {
	const pagesCount = Math.ceil(totalCards / guitarsPerPage)
	if (pagesCount === 1) return null

	// range of numbers
	let firstNumber = 1
	let lastNumber = 1
	// adicional numbers at the left and the right of currentpage
	const adicionalNumbers = 2
	// total of numbers in the pagination bar
	let countOfNumbers = adicionalNumbers * 2 + 1

	if (countOfNumbers >= pagesCount) {
		countOfNumbers = pagesCount
	} else {
		firstNumber = Math.max(currentPage - adicionalNumbers, 1)
		lastNumber = Math.min(currentPage + adicionalNumbers, pagesCount)
		// complete the pagination bar in the end
		if (lastNumber === pagesCount) {
			firstNumber += lastNumber - firstNumber - adicionalNumbers * 2
		}
	}

	// make the page numbers with the range

	const pageNumbers = new Array(countOfNumbers)
		.fill()
		.map((d, i) => i + firstNumber)

	return (
		<Container>
			<Li
				onClick={() => handleChange(1)}
				className={currentPage === 1 ? "disabled" : ""}
				title='First Page'
			>
				<DoubleLeftArrow />
			</Li>
			<Li
				onClick={() => handleChange(currentPage - 1)}
				className={currentPage === 1 ? "disabled" : ""}
				title='Previous'
			>
				<LeftArrow />
			</Li>

			{pageNumbers.map((number) => {
				return (
					<Li
						key={number}
						className={currentPage === number ? "selected" : ""}
						onClick={() => handleChange(number)}
					>
						{number}
					</Li>
				)
			})}

			<Li
				onClick={() => handleChange(currentPage + 1)}
				className={pagesCount === currentPage ? "disabled" : ""}
				title='Next'
			>
				<RightArrow />
			</Li>
			<Li
				onClick={() => handleChange(pagesCount)}
				className={pagesCount === currentPage ? "disabled" : ""}
				title='Last Page'
			>
				<DoubleRightArrow />
			</Li>
		</Container>
	)
}

// Styled components
const Container = styled.ul`
	width: 100%;
	display: flex;
	justify-content: center;
	list-style-type: none;
	padding: 0;
	margin: 15px;
`
const Li = styled.li`
	padding: 0 12px;
	height: 32px;
	text-align: center;
	margin: auto 4px;
	color: rgba(0, 0, 0, 0.87);
	display: flex;
	box-sizing: border-box;
	align-items: center;
	letter-spacing: 0.01071em;
	border-radius: 16px;
	line-height: 1.43;
	font-size: 13px;
	min-width: 32px;
	cursor: pointer;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	&.selected {
		background-color: rgba(0, 0, 0, 0.2);
	}
	&.disabled {
		pointer-events: none;
		color: rgba(0, 0, 0, 0.43);
		&:hover {
			background-color: transparent;
			cursor: default;
		}
	}
`