import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getById } from "../Redux/productActions"
import { clearDetail } from "../Redux/productSlice"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import styled from "styled-components"

import Swal from "sweetalert2"
import { FaTrashAlt, FaEdit } from "react-icons/fa"

const GuitarDetail = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		dispatch(getById(id))
		return () => {
			dispatch(clearDetail())
		}
	}, [dispatch, id])

    const detail = useSelector((state) => state.products.detail)

	const handleDeleteProduct = () => {
		if (localStorage.getItem("isAdmin")) {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "No, cancel!",
				reverseButtons: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.delete(`http://localhost:3001/rguitars/${detail.id}`)
						.then((res) => {
							if (res.status === 200) {
								Swal.fire(
									"Deleted!",
									"Your product has been deleted.",
									"success"
								).then((r) => navigate("/home"))
							}
						})
						.catch((error) => {
							Swal.fire("Error!", error.message, "error")
							return false
						})
				}
			})
		}
	}

	return (
		<section>
			<CountDiv>
				{detail.img?.split(",").length === 1 ? (
					<div className='imgcont'>
						<img src={detail.img} alt='' />
					</div>
				) : (
					<Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
						{detail.img?.split(",").map((item, pos) => (
							<SwiperSlide key={pos}>
								<div className='imgcont'>
									<img src={item} alt='' />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				)}
				<TextCont>
					<h2>{detail.brand}</h2>
					<h3>${detail.price}</h3>
					<h3>model: {detail.model}</h3>
					<p>{detail.description}</p>
					{detail.leftHand ? <LeftHand>Left Hand Available</LeftHand> : null}
					<form></form>

					{localStorage.getItem("isAdmin") && (
						<>
							<button
								type='button'
								title='Edit product'
								onClick={() => navigate(`/editProduct/${detail.id}`)}
							>
								<FaEdit />
							</button>
							<button
								type='button'
								title='Delete product'
								onClick={handleDeleteProduct}
							>
								<FaTrashAlt />
							</button>
						</>
					)}
				</TextCont>
			</CountDiv>
		</section>
	)
}

const CountDiv = styled.div`
	width: 700px;
	max-width: 900px;
	min-height: 300px;
	margin: auto;
	display: flex;
	flex-direction: row;
	margin-top: 75px;
	background-color: white;
	border: 1px solid rgb(40, 40, 40);
	border-radius: 10px;

	.imgcont {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	img {
		max-width: 100%;
		max-height: 400px;
	}

	.mySwiper {
		max-width: 300px;
	}
`

const TextCont = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-left: 50px;
	height: 1px;
	height: 1px;

	h2,
	h3 {
		font-weight: 400;
		margin: 3px;
	}
`
const LeftHand = styled.div`
	padding: 5px;
	border: 1px black solid;
	height: 20px;
	background: green;
	color: white;
	margin-top: 15px;
	border-radius: 5px;
	width: 125px;
`

export default GuitarDetail
