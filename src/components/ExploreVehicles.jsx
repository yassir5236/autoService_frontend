import { useState } from "react";

const cars = [
	{
		id: 1,
		name: "Ford Transit – 2021",
		desc: "2.0 Ti PowerStroke 4-Door Sedan 4dr 4wd",
		mileage: "5000 Miles",
		fuel: "Diesel",
		trans: "Manual",
		price: "$22,000",
		badge: "Great Price",
		badgeColor: "bg-green-500",
		image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80",
	},
	{
		id: 2,
		name: "New GLG – 2023",
		desc: "1.5 Ti Turbocharged 4-Door Sedan 4dr 4wd",
		mileage: "30 Miles",
		fuel: "Petrol",
		trans: "Automatic",
		price: "$90,000",
		badge: "Low Mileage",
		badgeColor: "bg-orange-500",
		image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80",
	},
	{
		id: 3,
		name: "Audi A6 2.5 – New",
		desc: "2.5 PowerStroke 4-Door Saloon Aventuron 5dr 4wd",
		mileage: "130 Miles",
		fuel: "Petrol",
		trans: "Automatic",
		price: "$58,000",
		badge: null,
		image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=80",
	},
	{
		id: 4,
		name: "Corolla Altis – 2023",
		desc: "1.3 1 PowerStroke 4-Door Sedan 4dr 4wd",
		mileage: "10000 Miles",
		fuel: "Petrol",
		trans: "CVT",
		price: "$45,000",
		badge: null,
		image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&q=80",
	},
];

const tabs = ["In Stock", "New Cars", "Used Cars"];

function CarCard({ car }) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-black/30 transition-shadow group flex-shrink-0 w-60">
			{/* Image */}
			<div className="relative h-40 overflow-hidden">
				<img
					src={car.image}
					alt={car.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				{car.badge && (
					<span
						className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded ${car.badgeColor}`}
					>
						{car.badge}
					</span>
				)}
				{/* Favorite button */}
				<button className="absolute top-3 right-3 bg-white/90 hover:bg-white w-7 h-7 rounded-full flex items-center justify-center shadow transition-colors">
					<svg
						className="w-4 h-4 text-gray-400 hover:text-red-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</button>
			</div>

			{/* Content */}
			<div className="p-4">
				<h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
					{car.name}
				</h3>
				<p className="text-xs text-gray-400 dark:text-gray-500 mb-3 line-clamp-1">
					{car.desc}
				</p>

				{/* Specs */}
				<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
					<span className="flex items-center gap-1">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
							/>
						</svg>
						{car.mileage}
					</span>
					<span className="flex items-center gap-1">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						{car.fuel}
					</span>
					<span className="flex items-center gap-1">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
						</svg>
						{car.trans}
					</span>
				</div>

				{/* Price + Action */}
				<div className="flex items-center justify-between">
					<span className="text-blue-600 dark:text-blue-400 font-bold text-base">
						{car.price}
					</span>
					<a
						href="#"
						className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-0.5"
					>
						View Details
						<svg
							className="w-3 h-3"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}

export default function ExploreVehicles() {
	const [activeTab, setActiveTab] = useState("In Stock");

	return (
		<section className="bg-gray-50 dark:bg-gray-800 py-12 px-8 transition-colors duration-300">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">
						Explore All Vehicles
					</h2>
					<a
						href="#"
						className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1"
					>
						View All
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>

				{/* Tabs */}
				<div className="flex gap-6 mb-6 border-b border-gray-200 dark:border-gray-700">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
								activeTab === tab
									? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
									: "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-200"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Cards + scroll */}
				<div className="relative">
					<div className="flex gap-14 overflow-x-auto pb-4 scrollbar-hide">
						{cars.map((car) => (
							<CarCard key={car.id} car={car} />
						))}
					</div>

					{/* Navigation arrows */}
					<div className="flex gap-2 mt-6">
						<button className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white text-gray-500 dark:text-gray-400 transition-colors">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white text-gray-500 dark:text-gray-400 transition-colors">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}