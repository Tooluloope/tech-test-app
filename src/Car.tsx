import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	GridItem,
	Heading,
	Image,
	ListItem,
	Stack,
	Text,
	UnorderedList,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface CarProps {
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
}

export const Car = ({
	id,
	make,
	model,
	colors,
	price,
	photo,
	range,
}: CarProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<GridItem py={12} cursor="pointer" onClick={onOpen}>
				<Box
					role={"group"}
					p={6}
					maxW={"330px"}
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					boxShadow={"2xl"}
					rounded={"lg"}
					pos={"relative"}
					zIndex={1}
				>
					<Box
						rounded={"lg"}
						mt={-12}
						pos={"relative"}
						height={"230px"}
						boxShadow={"2xl"}
						_after={{
							transition: "all .3s ease",
							content: '""',
							w: "full",
							h: "full",
							pos: "absolute",
							top: 5,
							left: 0,
							backgroundColor: "",
							filter: "blur(15px)",
							zIndex: -1,
						}}
						_groupHover={{
							_after: {
								filter: "blur(20px)",
							},
						}}
					>
						<Image
							loading="lazy"
							rounded={"lg"}
							height={230}
							width={282}
							objectFit={"cover"}
							src={photo}
						/>
					</Box>
					<Stack pt={10} align={"center"}>
						<Text
							color={"gray.500"}
							fontSize={"sm"}
							textTransform={"uppercase"}
						>
							Brand
						</Text>
						<Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
							{make}, {model}
						</Heading>
						<Stack direction={"row"} align={"center"}>
							<Text fontWeight={800} fontSize={"xl"}>
								{price}
							</Text>
						</Stack>
						<Stack direction={"row"} align={"center"}>
							{colors.map((color, idx) => (
								<Box
									key={idx}
									bg={color}
									w="10px"
									h={"10px"}
									borderRadius="full"
								/>
							))}
						</Stack>
					</Stack>
				</Box>
			</GridItem>

			<Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader></DrawerHeader>

					<DrawerBody>
						<UnorderedList>
							<ListItem>ID: {id}</ListItem>
							<ListItem>
								Range: {range.distance}
								{range.unit}
							</ListItem>
							<ListItem>
								Name: {make}, {model}
							</ListItem>
							<ListItem>Price: {price}</ListItem>
							<ListItem>
								<Flex alignItems={"center"}>
									Colors:
									{colors.map((color, idx) => (
										<Box
											key={idx}
											bg={color}
											w="10px"
											h={"10px"}
											borderRadius="full"
										/>
									))}
								</Flex>
							</ListItem>
						</UnorderedList>
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};
