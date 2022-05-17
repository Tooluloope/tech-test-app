import * as React from "react";
import {
	Box,
	Flex,
	Grid,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
	Select,
	Text,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Car } from "./Car";

type Cars = {
	id: string;
	make: string;
	model: string;
	range: {
		unit: string;
		distance: string;
	};
	colors: string[];
	price: string;
	photo: string;
}[];
const car = [
	{
		"id": "24uobf24jlgb",
		"make": "Tesla",
		"model": "X",
		"range": { "unit": "km", "distance": "450" },
		"colors": ["red", "black"],
		"price": "110000 EUR",
		"photo":
			"https://www.autoo.com.br/fotos/2021/1/1280_960/tesla_model-x_2021_4_29012021_41117_1280_960.jpg",
	},
	{
		"id": "2ejvb2rouvb",
		"make": "Tesla",
		"model": "3",
		"range": { "unit": "km", "distance": "420" },
		"colors": ["blue", "black"],
		"price": "98000 EUR",
		"photo":
			"https://directimports.com.br/wp-content/uploads/2021/09/compare_model3_right.png",
	},
	{
		"id": "8wbvwb0f8b",
		"make": "Mercedes Benz",
		"model": "EQC",
		"range": { "unit": "km", "distance": "450" },
		"colors": ["red", "gray"],
		"price": "79000 EUR",
		"photo":
			"https://www.mercedes-benz.pt/passengercars/mercedes-benz-cars/models/eqc/_jcr_content/image.MQ6.2.2x.20210729180510.png",
	},
	{
		"id": "56vhjbvqkbq",
		"make": "Audi",
		"model": "E-tron",
		"range": { "unit": "km", "distance": "390" },
		"colors": ["black", "gray"],
		"price": "88000 EUR",
		"photo":
			"https://s.aolcdn.com/commerce/autodata/images/USD20AUC401A021001.jpg",
	},
];

const getMinMaxPriceAndRange = (cars: Cars) => {
	const priceArr = cars.map(car => Number(car.price.replace(" EUR", "")));
	const rangeArr = cars.map(car => Number(car.range.distance));
	const colors: string[] = [];

	cars.forEach(car => colors.push(...car.colors));

	const MIN_PRICE = Math.min(...priceArr);
	const MAX_PRICE = Math.max(...priceArr);
	const MIN_RANGE = Math.min(...rangeArr);
	const MAX_RANGE = Math.max(...rangeArr);
	return {
		MIN_PRICE,
		MAX_PRICE,
		MIN_RANGE,
		MAX_RANGE,
		colors: Array.from(new Set(colors)),
	};
};

const fetchData = async (): Promise<Cars> => {
	const response = await fetch(
		"https://6157228e8f7ea600179850e4.mockapi.io/api/vehicles"
	);

	if (response.ok) {
		return await response.json();
	}
	return [];
};
export const App = () => {
	const [sliderValuePrice, setSliderValuePrice] = React.useState<number[]>([]);
	const [sliderValueRange, setSliderValueRange] = React.useState<number[]>([]);
	const [color, setColor] = React.useState("");

	const [cars, setCars] = React.useState<Cars>(car);
	const Ranges = React.useRef<{
		MIN_PRICE: number;
		MAX_PRICE: number;
		MIN_RANGE: number;
		MAX_RANGE: number;
		colors: string[];
	}>({
		MIN_PRICE: 0,
		MAX_PRICE: 100,
		MIN_RANGE: 0,
		MAX_RANGE: 100,
		colors: [],
	});

	React.useEffect(() => {
		fetchData().then(data => setCars(data));
	}, []);
	React.useEffect(() => {
		const { MIN_PRICE, MAX_PRICE, MIN_RANGE, MAX_RANGE, colors } =
			getMinMaxPriceAndRange(cars);

		Ranges.current = { MIN_PRICE, MAX_PRICE, MIN_RANGE, MAX_RANGE, colors };

		setSliderValuePrice([MIN_PRICE, MAX_PRICE]);
		setSliderValueRange([MIN_RANGE, MAX_RANGE]);
	}, [cars]);

	const memoizedCars = React.useMemo(() => {
		const [MIN_PRICE, MAX_PRICE] = sliderValuePrice;
		const [MIN_RANGE, MAX_RANGE] = sliderValueRange;

		return cars.filter(car => {
			const carPrice = Number(car.price.replace(" EUR", ""));
			const carRange = Number(car.range.distance);
			const carColors = car.colors;

			return (
				carPrice >= MIN_PRICE &&
				carPrice <= MAX_PRICE &&
				carRange >= MIN_RANGE &&
				carRange <= MAX_RANGE &&
				(color.length ? carColors.includes(color) : true)
			);
		});
	}, [sliderValuePrice, sliderValueRange, cars, color]);

	return (
		<Flex
			pos={"relative"}
			minH="100vh"
			p={3}
			textAlign="center"
			fontSize="xl"
			justifyContent={"center"}
			alignItems="center"
		>
			<ColorModeSwitcher justifySelf="flex-end" />
			<Box>
				<Flex justifyContent={"space-between"} w="full" flexWrap={"wrap"}>
					<Flex
						w={{
							base: "100%",
							md: "50%",
						}}
						mb="20px"
						px="20px"
					>
						<Text mr="20px" fontWeight={800} fontSize={"xl"}>
							Range
						</Text>
						<RangeSlider
							defaultValue={[
								Ranges.current.MIN_RANGE,
								Ranges.current.MAX_RANGE,
							]}
							min={Ranges.current.MIN_RANGE}
							max={Ranges.current.MAX_RANGE}
							onChangeEnd={setSliderValueRange}
						>
							<RangeSliderMark
								value={sliderValueRange[0]}
								textAlign="center"
								bg="tomato"
								color="white"
								mt="-10"
								ml="-5"
								w="60px"
								fontSize={"14px"}
							>
								{sliderValueRange[0]}KM
							</RangeSliderMark>
							<RangeSliderMark
								value={sliderValueRange[1]}
								textAlign="center"
								bg="tomato"
								color="white"
								mt="-10"
								ml="-5"
								w="60px"
								fontSize={"14px"}
							>
								{sliderValueRange[1]}KM
							</RangeSliderMark>
							<RangeSliderTrack bg="red.100">
								<RangeSliderFilledTrack bg="tomato" />
							</RangeSliderTrack>
							<RangeSliderThumb boxSize={6} index={0} />
							<RangeSliderThumb boxSize={6} index={1} />
						</RangeSlider>
					</Flex>

					<Flex
						w={{
							base: "100%",
							md: "50%",
						}}
						mb="20px"
						px="20px"
					>
						<Text mr="20px" fontWeight={800} fontSize={"xl"}>
							Price
						</Text>
						<RangeSlider
							defaultValue={[
								Ranges.current.MIN_PRICE,
								Ranges.current.MAX_PRICE,
							]}
							min={Ranges.current.MIN_PRICE}
							max={Ranges.current.MAX_PRICE}
							onChangeEnd={setSliderValuePrice}
						>
							<RangeSliderMark
								value={sliderValuePrice[0]}
								textAlign="center"
								bg="tomato"
								color="white"
								mt="-10"
								ml="-5"
								w="60px"
								fontSize={"14px"}
							>
								{sliderValuePrice[0]}
							</RangeSliderMark>
							<RangeSliderMark
								value={sliderValuePrice[1]}
								textAlign="center"
								bg="tomato"
								color="white"
								mt="-10"
								ml="-5"
								w="60px"
								fontSize={"14px"}
							>
								{sliderValuePrice[1]}
							</RangeSliderMark>
							<RangeSliderTrack>
								<RangeSliderFilledTrack />
							</RangeSliderTrack>
							<RangeSliderThumb boxSize={6} index={0} />
							<RangeSliderThumb boxSize={6} index={1} />
						</RangeSlider>
					</Flex>
				</Flex>
				<Select
					placeholder="Select option"
					onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
						setColor(event.target.value)
					}
				>
					{Ranges.current.colors.map((color, idx) => (
						<option key={idx} value={color}>
							{color.toUpperCase()}
						</option>
					))}
				</Select>

				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						sm: "repeat(2, 1fr)",
						md: "repeat(3, 1fr)",
						lg: "repeat(4, 1fr)",
					}}
					gap={6}
				>
					{memoizedCars.length ? (
						memoizedCars.map((car, idx) => <Car key={idx} {...car} />)
					) : (
						<Text mr="20px" fontWeight={800} fontSize={"xl"}>
							No Car matches this filter
						</Text>
					)}
				</Grid>
			</Box>
		</Flex>
	);
};
